/**
 * AI Medical Triage Game - Main Game Logic
 * Educational game about algorithmic bias in AI-assisted medical triage
 */

// Game State
const gameState = {
    currentDay: 1,
    currentPatientIndex: 0,
    patientsPerDay: 5,
    totalDays: 10,
    resources: {
        icu_beds: 15,
        medicine: 25,
        public_opinion: 10,
        reputation: 10,
        staff_morale: 10
    },
    maxResources: {
        icu_beds: 25,
        medicine: 40,
        public_opinion: 20,
        reputation: 20,
        staff_morale: 20
    },
    todayPatients: [],
    todayDecisions: [],
    allPatients: [],
    allEvents: [],
    currentEvent: null,
    autoSolveMode: false,
    autoSolveStepMode: true   // true = wait for user click; false = run automatically
};

// Load game data
async function loadGameData() {
    try {
        const [patientsResponse, eventsResponse] = await Promise.all([
            fetch('data/patients.json'),
            fetch('data/events.json')
        ]);

        gameState.allPatients = await patientsResponse.json();
        gameState.allEvents = await eventsResponse.json();

        console.log(`Loaded ${gameState.allPatients.length} patients and ${gameState.allEvents.length} event types`);
    } catch (error) {
        console.error('Error loading game data:', error);
        alert('Failed to load game data. Please ensure you are running the game through a web server.');
    }
}

// Initialize game
async function initGame() {
    await loadGameData();
    setupEventListeners();
    showScreen('startScreen');
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('autoSolveButton').addEventListener('click', startAutoSolve);
    document.getElementById('admitButton').addEventListener('click', () => makeDecision('admit'));
    document.getElementById('turnAwayButton').addEventListener('click', () => makeDecision('turn_away'));
    document.getElementById('eventContinue').addEventListener('click', hideEvent);
    document.getElementById('nextDayButton').addEventListener('click', nextDay);
    document.getElementById('restartFromWin').addEventListener('click', restartGame);
    document.getElementById('restartFromLose').addEventListener('click', restartGame);
    document.getElementById('executeStepButton').addEventListener('click', executeAutoStep);
    document.getElementById('stepModeToggle').addEventListener('change', toggleStepMode);
}

// Fisher-Yates shuffle
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Start new game (player-controlled)
function startGame() {
    resetGameState();
    gameState.allPatients = shuffle(gameState.allPatients);
    showScreen('gameScreen');
    startDay();
}

// Start auto-solve demo
function startAutoSolve() {
    resetGameState();
    gameState.autoSolveMode = true;
    gameState.allPatients = shuffle(gameState.allPatients);
    showScreen('gameScreen');
    startDay();
}

// Reset game state
function resetGameState() {
    gameState.currentDay = 1;
    gameState.currentPatientIndex = 0;
    gameState.autoSolveMode = false;
    gameState.autoSolveStepMode = true;
    gameState.resources = {
        icu_beds: 15,
        medicine: 25,
        public_opinion: 10,
        reputation: 10,
        staff_morale: 10
    };
    gameState.todayDecisions = [];
}

// Start a new day
function startDay() {
    const startIdx = (gameState.currentDay - 1) * gameState.patientsPerDay;
    gameState.todayPatients = gameState.allPatients.slice(startIdx, startIdx + gameState.patientsPerDay);
    gameState.currentPatientIndex = 0;
    gameState.todayDecisions = [];

    // Daily resource replenishment:
    //   ICU beds   +5  (patients discharged/transferred each day)
    //   Medicine   +5  (supply restocking, expired drugs replaced)
    //   Reputation +2  (staff working to rebuild public trust)
    //   Morale     +2  (team support and rest between shifts)
    if (gameState.currentDay > 1) {
        const dailyRegen = {
            icu_beds: 5,
            medicine: 5,
            reputation: 2,
            staff_morale: 2
        };
        for (const [res, amount] of Object.entries(dailyRegen)) {
            gameState.resources[res] = Math.min(
                gameState.maxResources[res],
                gameState.resources[res] + amount
            );
        }
    }

    updateDayCounter();
    updateResources();
    updateAutoSolveBadge();

    // Random event at start of day (40% chance, after day 1)
    if (Math.random() < 0.4 && gameState.currentDay > 1) {
        showRandomEvent();
    } else {
        showNextPatient();
    }
}

// Show random event
function showRandomEvent() {
    const eligibleEvents = gameState.allEvents.filter(e => Math.random() < e.probability);

    if (eligibleEvents.length === 0) {
        showNextPatient();
        return;
    }

    const event = eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
    gameState.currentEvent = event;

    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDescription').textContent = event.description;
    document.getElementById('eventDisplay').classList.remove('hidden');

    for (const [resource, change] of Object.entries(event.effects)) {
        if (change !== 0) {
            gameState.resources[resource] = Math.max(0, Math.min(
                gameState.maxResources[resource],
                gameState.resources[resource] + change
            ));
        }
    }

    updateResources();

    // In auto-solve mode: auto-dismiss only when not in step mode
    if (gameState.autoSolveMode && !gameState.autoSolveStepMode) {
        setTimeout(hideEvent, 2000);
    }
    // In step mode the existing "Continue" button handles dismissal
}

// Hide event and continue
function hideEvent() {
    document.getElementById('eventDisplay').classList.add('hidden');
    showNextPatient();
}

// ─── Auto-Solve Logic ─────────────────────────────────────────────────────────

/**
 * Decides whether to admit or turn away a patient.
 *
 * Strategy:
 *  1. Hard-block any choice that causes 2+ resources to hit 0 (game over).
 *  2. Always turn away zero-cost patients (free resource conservation).
 *  3. Always admit high-severity (>=70%) patients when affordable.
 *  4. Always turn away low-severity (<40%) patients when safe to do so.
 *  5. For medium-severity cases: use weighted resource scoring, protecting
 *     medicine most aggressively (it's the primary consumable).
 */
function autoSolveDecision(patient) {
    const admit   = patient.outcome_weights.admit;
    const turnAway = patient.outcome_weights.turn_away;
    const severity = patient.actual_severity;

    function simulate(effects) {
        const result = {};
        for (const res of Object.keys(gameState.resources)) {
            result[res] = Math.max(0, Math.min(
                gameState.maxResources[res],
                gameState.resources[res] + (effects[res] || 0)
            ));
        }
        return result;
    }

    const admitState = simulate(admit);
    const turnState  = simulate(turnAway);

    const admitDepleted = Object.values(admitState).filter(v => v <= 0).length;
    const turnDepleted  = Object.values(turnState).filter(v => v <= 0).length;

    // 1. Hard rule: avoid game-over
    if (admitDepleted >= 2 && turnDepleted < 2) return 'turn_away';
    if (turnDepleted  >= 2 && admitDepleted < 2) return 'admit';

    // 2. Free turn-away → conserve supplies
    const turnNegCost = Object.values(turnAway).filter(v => v < 0).reduce((a, b) => a + b, 0);
    if (turnNegCost === 0) return 'turn_away';

    // 3. Moderate-to-high severity: admit while we have the medicine
    const medCost = Math.abs(admit.medicine || 0);
    if (severity >= 55 && gameState.resources.medicine > medCost && admitDepleted < 2) {
        return 'admit';
    }

    // 4. Low severity, minor turn-away cost: conserve
    if (severity < 35 && turnNegCost > -4) return 'turn_away';

    // 5. Medium severity: weighted resource scoring
    function score(state) {
        let s = 0;
        for (const [res, val] of Object.entries(state)) {
            if (res === 'medicine') {
                // Medicine is the key consumable — protect aggressively
                if (val <= 0)    s -= 80;
                else if (val <= 5)  s += val * 8;
                else if (val <= 12) s += val * 3;
                else                s += val;
            } else if (res === 'icu_beds') {
                // ICU replenishes daily — less critical
                if (val <= 0)   s -= 20;
                else if (val <= 3) s += val * 2;
                else               s += val;
            } else {
                // Social resources (opinion, reputation, morale)
                if (val <= 0)   s -= 40;
                else if (val <= 3) s += val * 5;
                else if (val <= 7) s += val * 2;
                else               s += val;
            }
        }
        return s;
    }

    return score(admitState) >= score(turnState) ? 'admit' : 'turn_away';
}

function getAutoSolveReason(patient, decision) {
    const admit   = patient.outcome_weights.admit;
    const turnAway = patient.outcome_weights.turn_away;
    const severity = patient.actual_severity;
    const turnNeg  = Object.values(turnAway).filter(v => v < 0).reduce((a, b) => a + b, 0);

    if (decision === 'admit') {
        const medAfterAdmit = gameState.resources.medicine + (admit.medicine || 0);
        if (severity >= 55) return `Actual severity ${severity}% — this patient needs care`;
        if (turnNeg < -8)   return 'Refusing would cause critical damage to hospital standing';
        if (medAfterAdmit <= 0) return 'Resources tight — but admission avoids worse outcome';
        return 'Admission is the most balanced decision given current resources';
    } else {
        if (turnNeg === 0) return `Severity ${severity}% — patient can be safely seen elsewhere`;
        const medAfterAdmit = gameState.resources.medicine + (admit.medicine || 0);
        if (medAfterAdmit <= 0) return 'Admitting would deplete medicine — reserving for critical cases';
        if (severity < 35)  return `Severity only ${severity}% — not critical enough to justify resource use`;
        return 'Conserving medicine for higher-severity patients ahead';
    }
}

// Executes the pending auto-solve decision (step mode only)
function executeAutoStep() {
    const patient = gameState.todayPatients[gameState.currentPatientIndex];
    if (!patient) return;
    const decision = autoSolveDecision(patient);
    makeDecision(decision);
}

// Toggle between step mode and auto mode
function toggleStepMode() {
    const checkbox = document.getElementById('stepModeToggle');
    gameState.autoSolveStepMode = checkbox.checked;
    updateStepModeUI();

    // If switching to auto mode while a patient is showing, fire the decision now
    if (!gameState.autoSolveStepMode && gameState.autoSolveMode) {
        const patient = gameState.todayPatients[gameState.currentPatientIndex];
        if (patient) {
            setTimeout(() => {
                const decision = autoSolveDecision(patient);
                makeDecision(decision);
            }, 800);
        }
    }
}

// ─── UI Update Functions ───────────────────────────────────────────────────────

function showAutoSolveInfo(decision, reason) {
    const indicator  = document.getElementById('autoSolveIndicator');
    const decisionEl = document.getElementById('autoSolveDecisionText');
    const reasonEl   = document.getElementById('autoSolveReasonText');
    const executeBtn = document.getElementById('executeStepButton');

    if (indicator) {
        decisionEl.textContent = decision === 'admit' ? 'ADMIT' : 'TURN AWAY';
        decisionEl.className   = 'auto-decision ' + (decision === 'admit' ? 'admit' : 'turn-away');
        reasonEl.textContent   = reason;
        indicator.classList.remove('hidden');

        // Show execute button only in step mode
        executeBtn.classList.toggle('hidden', !gameState.autoSolveStepMode);
    }
}

function hideAutoSolveInfo() {
    const indicator = document.getElementById('autoSolveIndicator');
    if (indicator) indicator.classList.add('hidden');
}

function updateAutoSolveBadge() {
    const badge = document.getElementById('autoSolveBadge');
    if (badge) badge.classList.toggle('hidden', !gameState.autoSolveMode);
    updateStepModeUI();
}

function updateStepModeUI() {
    const checkbox  = document.getElementById('stepModeToggle');
    const label     = document.getElementById('stepToggleText');
    const executeBtn = document.getElementById('executeStepButton');

    checkbox.checked = gameState.autoSolveStepMode;
    label.textContent = gameState.autoSolveStepMode ? 'Step-by-step' : 'Auto';

    // Keep execute button visibility in sync with current mode
    if (!gameState.autoSolveStepMode) {
        executeBtn.classList.add('hidden');
    }
}

// ─── Patient Display ───────────────────────────────────────────────────────────

function showNextPatient() {
    if (gameState.currentPatientIndex >= gameState.todayPatients.length) {
        endDay();
        return;
    }

    const patient = gameState.todayPatients[gameState.currentPatientIndex];

    // Card entrance animation
    const card = document.getElementById('patientCard');
    card.classList.remove('card-entering');
    void card.offsetWidth; // force reflow
    card.classList.add('card-entering');

    document.getElementById('patientName').textContent = patient.name;
    document.getElementById('patientAge').textContent = patient.age;
    document.getElementById('patientGender').textContent = patient.gender;
    document.getElementById('patientOccupation').textContent = patient.occupation;
    document.getElementById('patientHistory').textContent = patient.medical_history;
    document.getElementById('patientSymptoms').textContent = patient.symptoms;
    document.getElementById('aiScore').textContent = patient.ai_score + '%';

    // AI score bar
    const scoreBar = document.getElementById('aiScoreBar');
    if (scoreBar) {
        scoreBar.style.width = patient.ai_score + '%';
        if (patient.ai_score >= 70) {
            scoreBar.style.background = 'var(--red)';
        } else if (patient.ai_score >= 40) {
            scoreBar.style.background = 'var(--amber)';
        } else {
            scoreBar.style.background = 'var(--green)';
        }
    }

    const scoreElement = document.getElementById('aiScore');
    if (patient.ai_score >= 70) {
        scoreElement.style.color = 'var(--red)';
    } else if (patient.ai_score >= 40) {
        scoreElement.style.color = 'var(--amber)';
    } else {
        scoreElement.style.color = 'var(--green)';
    }

    updatePatientCounter();

    if (gameState.autoSolveMode) {
        document.getElementById('admitButton').disabled = true;
        document.getElementById('turnAwayButton').disabled = true;

        const decision = autoSolveDecision(patient);
        const reason   = getAutoSolveReason(patient, decision);
        showAutoSolveInfo(decision, reason);

        if (gameState.autoSolveStepMode) {
            // Step mode: wait for the user to click "Execute This Decision"
            // (the executeStepButton handler calls makeDecision)
        } else {
            // Auto mode: execute after a short delay
            setTimeout(() => makeDecision(decision), 1200);
        }
    } else {
        document.getElementById('admitButton').disabled = false;
        document.getElementById('turnAwayButton').disabled = false;
        hideAutoSolveInfo();
    }
}

// ─── Decision & Feedback ───────────────────────────────────────────────────────

function makeDecision(decision) {
    const patient = gameState.todayPatients[gameState.currentPatientIndex];

    gameState.todayDecisions.push({ patient, decision });

    const effects = patient.outcome_weights[decision];
    for (const [resource, change] of Object.entries(effects)) {
        if (change !== 0) {
            gameState.resources[resource] = Math.max(0, Math.min(
                gameState.maxResources[resource],
                gameState.resources[resource] + change
            ));
        }
    }

    updateResources();
    hideAutoSolveInfo();
    showFeedback(decision === 'admit' ? 'Patient admitted' : 'Patient turned away', decision);

    if (checkLoseCondition()) {
        setTimeout(() => showLoseScreen(), 1000);
        return;
    }

    gameState.currentPatientIndex++;
    setTimeout(() => showNextPatient(), 800);
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedbackDisplay');
    const feedbackMessage = document.getElementById('feedbackMessage');

    feedbackMessage.textContent = message;
    feedbackMessage.className = 'feedback-message';
    if (type === 'admit') {
        feedbackMessage.classList.add('admit-toast');
    } else if (type === 'turn_away') {
        feedbackMessage.classList.add('turn-away-toast');
    } else {
        feedbackMessage.classList.add('neutral-toast');
    }

    feedback.classList.remove('hidden');
    setTimeout(() => feedback.classList.add('hidden'), 700);
}

// ─── Day Summary ───────────────────────────────────────────────────────────────

function endDay() {
    showDaySummary();
}

function showDaySummary() {
    const summaryContent = document.getElementById('summaryContent');
    document.getElementById('summaryDay').textContent = gameState.currentDay;

    let html = '';
    gameState.todayDecisions.forEach(({ patient, decision }) => {
        const className = decision === 'admit' ? 'admitted' : 'turned-away';
        const decisionText = decision === 'admit' ? 'Admitted' : 'Turned Away';
        const outcomeText = decision === 'admit'
            ? 'Patient received treatment.'
            : 'Patient was sent home.';

        html += `
            <div class="summary-item ${className}">
                <h3>${patient.name} - ${decisionText}</h3>
                <p><strong>AI Score:</strong> ${patient.ai_score}% | <strong>Actual Severity:</strong> ${patient.actual_severity}%</p>
                <p>${outcomeText}</p>
            </div>
        `;
    });

    summaryContent.innerHTML = html;
    showScreen('daySummaryScreen');

    // Auto-advance only in auto mode (not step mode)
    if (gameState.autoSolveMode && !gameState.autoSolveStepMode) {
        setTimeout(nextDay, 2500);
    }
}

function nextDay() {
    gameState.currentDay++;

    if (gameState.currentDay > gameState.totalDays) {
        showWinScreen();
    } else {
        showScreen('gameScreen');
        startDay();
    }
}

// ─── Resource Display ──────────────────────────────────────────────────────────

function updateDayCounter() {
    document.getElementById('currentDay').textContent = gameState.currentDay;
}

function updatePatientCounter() {
    document.getElementById('currentPatient').textContent = gameState.currentPatientIndex + 1;
}

function updateResources() {
    const resourceMap = {
        icu_beds: { bar: 'icuBar', value: 'icuValue' },
        medicine: { bar: 'medicineBar', value: 'medicineValue' },
        public_opinion: { bar: 'opinionBar', value: 'opinionValue' },
        reputation: { bar: 'reputationBar', value: 'reputationValue' },
        staff_morale: { bar: 'moraleBar', value: 'moraleValue' }
    };

    for (const [resource, elements] of Object.entries(resourceMap)) {
        const value = gameState.resources[resource];
        const max = gameState.maxResources[resource];
        const percentage = (value / max) * 100;

        const barElement = document.getElementById(elements.bar);
        const valueElement = document.getElementById(elements.value);

        barElement.style.width = percentage + '%';
        valueElement.textContent = value;

        barElement.classList.remove('low', 'critical');
        if (percentage <= 25) barElement.classList.add('critical');
        else if (percentage <= 50) barElement.classList.add('low');
    }
}

// ─── Win / Lose ────────────────────────────────────────────────────────────────

function checkLoseCondition() {
    const depleted = Object.values(gameState.resources).filter(v => v <= 0).length;
    return depleted >= 2;
}

function showWinScreen() {
    const finalStats = document.getElementById('finalStats');

    let html = '';
    for (const [resource, value] of Object.entries(gameState.resources)) {
        const label = resource.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const statusClass = value > 5 ? 'good' : 'bad';
        html += `
            <div class="stat-row">
                <span class="stat-label">${label}:</span>
                <span class="stat-value ${statusClass}">${value} / ${gameState.maxResources[resource]}</span>
            </div>
        `;
    }

    finalStats.innerHTML = html;
    showScreen('winScreen');
}

function showLoseScreen() {
    const loseStats = document.getElementById('loseStats');

    let html = '';
    for (const [resource, value] of Object.entries(gameState.resources)) {
        const label = resource.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const statusClass = value <= 0 ? 'bad' : (value > 5 ? 'good' : 'bad');
        html += `
            <div class="stat-row">
                <span class="stat-label">${label}:</span>
                <span class="stat-value ${statusClass}">${value} / ${gameState.maxResources[resource]}</span>
            </div>
        `;
    }

    loseStats.innerHTML = html;
    showScreen('loseScreen');
}

function restartGame() {
    resetGameState();
    showScreen('startScreen');
}

function showScreen(screenId) {
    const screens = ['startScreen', 'gameScreen', 'daySummaryScreen', 'winScreen', 'loseScreen'];
    screens.forEach(screen => document.getElementById(screen).classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
