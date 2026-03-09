# Setup and Testing Guide

## Quick Start - Test Locally

### Option 1: Using Python's HTTP Server (Recommended)

```bash
cd frontend
python3 -m http.server 8000
```

Then open your browser to: `http://localhost:8000`

### Option 2: Using Any Web Server

The game is entirely client-side, so you can use any web server:

```bash
# Using Node.js http-server
npx http-server frontend -p 8000

# Using PHP
cd frontend
php -S localhost:8000
```

## Deploying to GitHub Pages

### One-Time Setup

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**

### Automatic Deployment

Every time you push to the `master` branch, the GitHub Actions workflow will:

1. Run the Python script to generate fresh game data
2. Deploy the frontend to GitHub Pages

Your game will be available at: `https://[your-username].github.io/[repo-name]/`

## Project Structure

```
EthicalAIProject/
├── backend/
│   ├── generate_game_data.py    # Generates patients & events with AI bias
│   └── requirements.txt          # Python dependencies (none needed)
│
├── frontend/
│   ├── index.html                # Main game UI
│   ├── styles.css                # Reigns-style card design
│   ├── game.js                   # Game logic and state management
│   └── data/
│       ├── patients.json         # 50 patient profiles (10 days × 5 patients)
│       └── events.json           # 8 random event types
│
└── .github/workflows/
    └── deploy.yml                # GitHub Actions deployment workflow
```

## Game Features

### Implemented Features ✓

- **10 days of gameplay** with 5 patients per day (50 total patients)
- **5 resource bars**: ICU Beds, Medicine, Public Opinion, Reputation, Staff Morale
- **Biased AI scoring system**:
  - Young professionals: +15 to +20 points
  - Elderly patients: -20 points
  - Unemployed/homeless: -15 points
  - Manual laborers: -10 points
  - White collar workers: +10 points
- **8 types of random events** that occur at the start of each day
- **Win/lose conditions**:
  - Win: Complete all 10 days with at least 3 resources > 0
  - Lose: 2 or more resources hit zero
- **Day-end summaries** showing decisions and their outcomes
- **Educational reflection screens** explaining the bias in the system

### AI Bias Demonstration

The game includes a Python-generated bias analysis that shows:

```
Young professionals: AI scores avg +20.0 points vs actual severity
Elderly patients: AI scores avg -21.8 points vs actual severity
Unemployed/homeless: AI scores avg -15.0 points vs actual severity
```

This demonstrates how the AI systematically discriminates against certain demographics.

## Testing the Game

### Test the Bias System

Play through and note:

1. **Young professionals** (software engineers, managers) get high AI scores even for minor issues
2. **Elderly patients** get low AI scores even for serious conditions
3. **Unemployed/homeless** patients get systematically underscored
4. **Healthcare workers** (nurses, doctors) have high impact on staff morale when turned away

### Test Resource Management

- Admitting patients depletes ICU beds and medicine
- Turning away vulnerable patients (elderly, healthcare workers) damages reputation and morale
- Random events can provide supplies or create crises

### Test Win/Lose Conditions

- **To Win**: Balance ethics with resources, sometimes override the biased AI
- **To Lose**: Follow the AI blindly or mismanage resources

## Regenerating Game Data

If you want to modify patient profiles or events:

```bash
cd backend
# Edit generate_game_data.py
python3 generate_game_data.py
```

This will regenerate `frontend/data/patients.json` and `frontend/data/events.json`.

## Troubleshooting

### Game won't load

- Make sure you're using a web server (not opening `index.html` directly)
- Check browser console for errors
- Verify `data/patients.json` and `data/events.json` exist

### GitHub Pages not deploying

- Check Actions tab for workflow errors
- Ensure GitHub Pages is enabled in repository settings
- Verify the workflow has permissions to deploy

### Want to modify the game

- **Patient data**: Edit `backend/generate_game_data.py`
- **Game logic**: Edit `frontend/game.js`
- **Styling**: Edit `frontend/styles.css`
- **UI structure**: Edit `frontend/index.html`
