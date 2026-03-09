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
        icu_beds: 10,
        medicine: 10,
        public_opinion: 10,
        reputation: 10,
        staff_morale: 10
    },
    maxResources: {
        icu_beds: 20,
        medicine: 20,
        public_opinion: 20,
        reputation: 20,
        staff_morale: 20
    },
    todayPatients: [],
    todayDecisions: [],
    allPatients: [],
    allEvents: [],
    currentEvent: null
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
    document.getElementById('admitButton').addEventListener('click', () => makeDecision('admit'));
    document.getElementById('turnAwayButton').addEventListener('click', () => makeDecision('turn_away'));
    document.getElementById('eventContinue').addEventListener('click', hideEvent);
    document.getElementById('nextDayButton').addEventListener('click', nextDay);
    document.getElementById('restartFromWin').addEventListener('click', restartGame);
    document.getElementById('restartFromLose').addEventListener('click', restartGame);
}

// Start new game
function startGame() {
    resetGameState();
    showScreen('gameScreen');
    startDay();
}

// Reset game state
function resetGameState() {
    gameState.currentDay = 1;
    gameState.currentPatientIndex = 0;
    gameState.resources = {
        icu_beds: 10,
        medicine: 10,
        public_opinion: 10,
        reputation: 10,
        staff_morale: 10
    };
    gameState.todayDecisions = [];
}

// Start a new day
function startDay() {
    // Select patients for today (5 patients per day)
    const startIdx = (gameState.currentDay - 1) * gameState.patientsPerDay;
    gameState.todayPatients = gameState.allPatients.slice(startIdx, startIdx + gameState.patientsPerDay);
    gameState.currentPatientIndex = 0;
    gameState.todayDecisions = [];

    // Update UI
    updateDayCounter();
    updateResources();

    // Random event at start of day (30% chance)
    if (Math.random() < 0.3 && gameState.currentDay > 1) {
        showRandomEvent();
    } else {
        showNextPatient();
    }
}

// Show random event
function showRandomEvent() {
    // Filter events by probability and pick one
    const eligibleEvents = gameState.allEvents.filter(e => Math.random() < e.probability);

    if (eligibleEvents.length === 0) {
        showNextPatient();
        return;
    }

    const event = eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
    gameState.currentEvent = event;

    // Update UI
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDescription').textContent = event.description;
    document.getElementById('eventDisplay').classList.remove('hidden');

    // Apply effects
    for (const [resource, change] of Object.entries(event.effects)) {
        if (change !== 0) {
            gameState.resources[resource] = Math.max(0, Math.min(
                gameState.maxResources[resource],
                gameState.resources[resource] + change
            ));
        }
    }

    updateResources();
}

// Hide event and continue
function hideEvent() {
    document.getElementById('eventDisplay').classList.add('hidden');
    showNextPatient();
}

// Show next patient
function showNextPatient() {
    if (gameState.currentPatientIndex >= gameState.todayPatients.length) {
        endDay();
        return;
    }

    const patient = gameState.todayPatients[gameState.currentPatientIndex];

    // Update patient card
    document.getElementById('patientName').textContent = patient.name;
    document.getElementById('patientAge').textContent = patient.age;
    document.getElementById('patientGender').textContent = patient.gender;
    document.getElementById('patientOccupation').textContent = patient.occupation;
    document.getElementById('patientHistory').textContent = patient.medical_history;
    document.getElementById('patientSymptoms').textContent = patient.symptoms;
    document.getElementById('aiScore').textContent = patient.ai_score + '%';

    // Color code AI score
    const scoreElement = document.getElementById('aiScore');
    if (patient.ai_score >= 70) {
        scoreElement.style.color = '#f44336';
    } else if (patient.ai_score >= 40) {
        scoreElement.style.color = '#ff9800';
    } else {
        scoreElement.style.color = '#4caf50';
    }

    updatePatientCounter();
}

// Make decision (admit or turn away)
function makeDecision(decision) {
    const patient = gameState.todayPatients[gameState.currentPatientIndex];

    // Record decision
    gameState.todayDecisions.push({
        patient: patient,
        decision: decision
    });

    // Apply resource effects
    const effects = patient.outcome_weights[decision];
    for (const [resource, change] of Object.entries(effects)) {
        if (change !== 0) {
            gameState.resources[resource] = Math.max(0, Math.min(
                gameState.maxResources[resource],
                gameState.resources[resource] + change
            ));
        }
    }

    // Update resources
    updateResources();

    // Show brief feedback
    showFeedback(decision === 'admit' ? 'Patient admitted' : 'Patient turned away');

    // Check lose condition
    if (checkLoseCondition()) {
        setTimeout(() => showLoseScreen(), 1000);
        return;
    }

    // Move to next patient
    gameState.currentPatientIndex++;
    setTimeout(() => showNextPatient(), 800);
}

// Show feedback message
function showFeedback(message) {
    const feedback = document.getElementById('feedbackDisplay');
    const feedbackMessage = document.getElementById('feedbackMessage');

    feedbackMessage.textContent = message;
    feedback.classList.remove('hidden');

    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 700);
}

// End current day
function endDay() {
    showDaySummary();
}

// Show day summary
function showDaySummary() {
    const summaryContent = document.getElementById('summaryContent');
    document.getElementById('summaryDay').textContent = gameState.currentDay;

    let html = '';

    // Show decisions made
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
}

// Move to next day
function nextDay() {
    gameState.currentDay++;

    if (gameState.currentDay > gameState.totalDays) {
        showWinScreen();
    } else {
        showScreen('gameScreen');
        startDay();
    }
}

// Update day counter
function updateDayCounter() {
    document.getElementById('currentDay').textContent = gameState.currentDay;
}

// Update patient counter
function updatePatientCounter() {
    document.getElementById('currentPatient').textContent = gameState.currentPatientIndex + 1;
}

// Update resource displays
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

        // Color coding
        barElement.classList.remove('low', 'critical');
        if (percentage <= 25) {
            barElement.classList.add('critical');
        } else if (percentage <= 50) {
            barElement.classList.add('low');
        }
    }
}

// Check lose condition (2 or more resources at zero)
function checkLoseCondition() {
    const depleted = Object.values(gameState.resources).filter(v => v <= 0).length;
    return depleted >= 2;
}

// Show win screen
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

// Show lose screen
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

// Restart game
function restartGame() {
    resetGameState();
    showScreen('startScreen');
}

// Show specific screen
function showScreen(screenId) {
    const screens = ['startScreen', 'gameScreen', 'daySummaryScreen', 'winScreen', 'loseScreen'];

    screens.forEach(screen => {
        document.getElementById(screen).classList.add('hidden');
    });

    document.getElementById(screenId).classList.remove('hidden');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
