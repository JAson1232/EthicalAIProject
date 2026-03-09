# AI Medical Triage Game - Ethical AI Workshop

An educational game about algorithmic bias in AI-assisted medical triage, styled after Reigns.

## Overview

Players take on the role of a hospital administrator during a crisis, making life-or-death decisions about patient admissions based on an AI recommendation system. The AI's criticality scores are biased, and players must learn to recognize and question these biases while managing limited resources.

## Learning Goal

After playing, players should understand that AI recommendations are not neutral or objective—they reflect biases in their training data, and blindly trusting automated systems in high-stakes situations can lead to systematically unjust outcomes.

## Game Mechanics

- **10 Days** of gameplay, 5 patients per day
- **5 Resources** to manage: ICU Beds, Medicine, Public Opinion, Hospital Reputation, Staff Morale
- **Random Events** that affect resources
- **Win Condition**: Survive all 10 days with at least 3 resources above zero
- **Lose Condition**: 2 or more resources hit zero

## Quick Start

### Running Locally

1. Generate game data:
```bash
cd backend
python generate_game_data.py
```

2. Open the game:
```bash
cd frontend
# Open index.html in your browser
# OR use a simple HTTP server:
python -m http.server 8000
# Then navigate to http://localhost:8000
```

### Deploying to GitHub Pages

The project includes a GitHub Actions workflow that automatically:
1. Runs Python scripts to generate game data
2. Deploys the frontend to GitHub Pages

Simply push to the `master` branch and GitHub Actions will handle the rest.

## Project Structure

```
├── backend/               # Python scripts for game data generation
│   ├── generate_game_data.py
│   └── requirements.txt
├── frontend/              # Game UI
│   ├── index.html
│   ├── styles.css
│   ├── game.js
│   └── data/
│       ├── patients.json
│       └── events.json
└── .github/workflows/     # GitHub Actions for deployment
    └── deploy.yml
```

## Technology Stack

- **Backend**: Python (game data generation, bias modeling)
- **Frontend**: HTML, CSS, JavaScript (card-based UI, resource management)
- **Deployment**: GitHub Actions + GitHub Pages

## Game Duration

15-25 minutes per playthrough 
