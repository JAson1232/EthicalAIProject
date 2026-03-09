"""
Generate game data for AI Medical Triage Game
Includes patient profiles with biased AI scores and random events
"""

import json
import random
from typing import List, Dict

# Bias factors: AI systematically scores certain demographics differently
BIAS_FACTORS = {
    "young_professional": 15,  # AI favors young professionals
    "elderly": -20,  # AI discriminates against elderly
    "unemployed": -15,  # AI penalizes unemployed
    "manual_labor": -10,  # AI penalizes manual laborers
    "white_collar": 10,  # AI favors white collar workers
}


def calculate_biased_ai_score(
    actual_severity: int,
    age: int,
    occupation: str,
    demographics: str
) -> int:
    """
    Calculate AI score with systematic bias
    The AI score differs from actual medical severity
    """
    biased_score = actual_severity

    # Age bias
    if age < 30:
        biased_score += BIAS_FACTORS["young_professional"]
    elif age > 65:
        biased_score += BIAS_FACTORS["elderly"]

    # Occupation bias
    occupation_lower = occupation.lower()
    if "unemployed" in occupation_lower or "homeless" in occupation_lower:
        biased_score += BIAS_FACTORS["unemployed"]
    elif any(word in occupation_lower for word in ["construction", "cleaner", "driver", "factory"]):
        biased_score += BIAS_FACTORS["manual_labor"]
    elif any(word in occupation_lower for word in ["engineer", "doctor", "lawyer", "manager", "ceo"]):
        biased_score += BIAS_FACTORS["white_collar"]

    # Clamp to 0-100
    return max(0, min(100, biased_score))


def generate_patients() -> List[Dict]:
    """Generate 50 diverse patient profiles (10 days × 5 patients)"""

    patients = [
        # Day 1
        {
            "id": 1,
            "name": "Maria Garcia",
            "age": 67,
            "gender": "Female",
            "occupation": "Retired Teacher",
            "medical_history": "Diabetes, hypertension",
            "symptoms": "Severe chest pain, difficulty breathing",
            "actual_severity": 85,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": 1, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -4, "staff_morale": -2}
            }
        },
        {
            "id": 2,
            "name": "David Chen",
            "age": 28,
            "gender": "Male",
            "occupation": "Software Engineer",
            "medical_history": "No significant history",
            "symptoms": "Moderate fever, cough",
            "actual_severity": 35,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 0, "reputation": 0, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": 0, "reputation": 0, "staff_morale": 0}
            }
        },
        {
            "id": 3,
            "name": "James Wilson",
            "age": 52,
            "gender": "Male",
            "occupation": "Unemployed",
            "medical_history": "Chronic alcoholism, liver disease",
            "symptoms": "Severe abdominal pain, jaundice",
            "actual_severity": 80,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -3, "public_opinion": -1, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": 0, "reputation": -3, "staff_morale": -2}
            }
        },
        {
            "id": 4,
            "name": "Aisha Mohammed",
            "age": 34,
            "gender": "Female",
            "occupation": "Nurse",
            "medical_history": "Asthma",
            "symptoms": "Severe respiratory distress",
            "actual_severity": 75,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": 2, "reputation": 3, "staff_morale": 3},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -4, "reputation": -5, "staff_morale": -5}
            }
        },
        {
            "id": 5,
            "name": "Robert Thompson",
            "age": 45,
            "gender": "Male",
            "occupation": "Construction Worker",
            "medical_history": "Back injury, chronic pain",
            "symptoms": "Workplace accident, fractured ribs",
            "actual_severity": 60,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -2, "public_opinion": 1, "reputation": 1, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -2, "staff_morale": -1}
            }
        },

        # Day 2
        {
            "id": 6,
            "name": "Emily Davidson",
            "age": 29,
            "gender": "Female",
            "occupation": "Marketing Manager",
            "medical_history": "Anxiety disorder",
            "symptoms": "Panic attack, elevated heart rate",
            "actual_severity": 30,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 0, "reputation": 0, "staff_morale": -1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": 0, "reputation": 0, "staff_morale": 0}
            }
        },
        {
            "id": 7,
            "name": "Carlos Rodriguez",
            "age": 71,
            "gender": "Male",
            "occupation": "Retired Factory Worker",
            "medical_history": "Heart disease, stroke survivor",
            "symptoms": "Stroke-like symptoms, paralysis",
            "actual_severity": 90,
            "outcome_weights": {
                "admit": {"icu_beds": -3, "medicine": -3, "public_opinion": 1, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -5, "staff_morale": -3}
            }
        },
        {
            "id": 8,
            "name": "Sophie Laurent",
            "age": 26,
            "gender": "Female",
            "occupation": "Medical Student",
            "medical_history": "Healthy",
            "symptoms": "Minor car accident, whiplash",
            "actual_severity": 25,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 0, "reputation": 0, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": 0, "reputation": 0, "staff_morale": 0}
            }
        },
        {
            "id": 9,
            "name": "Marcus Johnson",
            "age": 38,
            "gender": "Male",
            "occupation": "Homeless",
            "medical_history": "Malnutrition, tuberculosis",
            "symptoms": "Pneumonia, severe coughing",
            "actual_severity": 70,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": -1, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -1, "reputation": -2, "staff_morale": -2}
            }
        },
        {
            "id": 10,
            "name": "Linda Park",
            "age": 55,
            "gender": "Female",
            "occupation": "CEO",
            "medical_history": "High cholesterol",
            "symptoms": "Suspected heart attack",
            "actual_severity": 65,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": 1, "reputation": 2, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -3, "staff_morale": -1}
            }
        },

        # Day 3
        {
            "id": 11,
            "name": "Ahmed Hassan",
            "age": 42,
            "gender": "Male",
            "occupation": "Taxi Driver",
            "medical_history": "Diabetes",
            "symptoms": "Diabetic emergency, confusion",
            "actual_severity": 55,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -2, "public_opinion": 0, "reputation": 1, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -1, "reputation": -2, "staff_morale": -1}
            }
        },
        {
            "id": 12,
            "name": "Grace Williams",
            "age": 19,
            "gender": "Female",
            "occupation": "College Student",
            "medical_history": "Depression",
            "symptoms": "Suicide attempt, overdose",
            "actual_severity": 85,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -3, "public_opinion": 2, "reputation": 3, "staff_morale": 2},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -5, "reputation": -6, "staff_morale": -4}
            }
        },
        {
            "id": 13,
            "name": "Thomas Brown",
            "age": 68,
            "gender": "Male",
            "occupation": "Retired Veteran",
            "medical_history": "PTSD, chronic pain",
            "symptoms": "Fall injury, possible fracture",
            "actual_severity": 50,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -2, "public_opinion": 2, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -3, "staff_morale": -2}
            }
        },
        {
            "id": 14,
            "name": "Priya Patel",
            "age": 31,
            "gender": "Female",
            "occupation": "Data Scientist",
            "medical_history": "None",
            "symptoms": "Allergic reaction, difficulty breathing",
            "actual_severity": 70,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": 1, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -3, "staff_morale": -2}
            }
        },
        {
            "id": 15,
            "name": "Kevin O'Brien",
            "age": 49,
            "gender": "Male",
            "occupation": "Factory Worker",
            "medical_history": "Lung disease",
            "symptoms": "Industrial chemical exposure",
            "actual_severity": 75,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -3, "public_opinion": 1, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -3, "staff_morale": -2}
            }
        },

        # Day 4
        {
            "id": 16,
            "name": "Jessica Martinez",
            "age": 36,
            "gender": "Female",
            "occupation": "Teacher",
            "medical_history": "Asthma",
            "symptoms": "Severe asthma attack",
            "actual_severity": 60,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -2, "public_opinion": 2, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -3, "staff_morale": -2}
            }
        },
        {
            "id": 17,
            "name": "William Turner",
            "age": 72,
            "gender": "Male",
            "occupation": "Retired",
            "medical_history": "Dementia, heart condition",
            "symptoms": "Heart failure symptoms",
            "actual_severity": 80,
            "outcome_weights": {
                "admit": {"icu_beds": -3, "medicine": -3, "public_opinion": 0, "reputation": 1, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -4, "staff_morale": -2}
            }
        },
        {
            "id": 18,
            "name": "Nina Kowalski",
            "age": 27,
            "gender": "Female",
            "occupation": "Software Developer",
            "medical_history": "Migraines",
            "symptoms": "Severe migraine, vision problems",
            "actual_severity": 40,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 0, "reputation": 0, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": 0, "reputation": 0, "staff_morale": 0}
            }
        },
        {
            "id": 19,
            "name": "Jerome Washington",
            "age": 58,
            "gender": "Male",
            "occupation": "Janitor",
            "medical_history": "Hypertension, obesity",
            "symptoms": "Chest pain, sweating",
            "actual_severity": 65,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": 0, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -1, "reputation": -2, "staff_morale": -1}
            }
        },
        {
            "id": 20,
            "name": "Olivia Anderson",
            "age": 33,
            "gender": "Female",
            "occupation": "Lawyer",
            "medical_history": "None",
            "symptoms": "Appendicitis symptoms",
            "actual_severity": 55,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -2, "public_opinion": 1, "reputation": 1, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -1, "reputation": -2, "staff_morale": -1}
            }
        },

        # Day 5
        {
            "id": 21,
            "name": "Frank Sullivan",
            "age": 63,
            "gender": "Male",
            "occupation": "Unemployed",
            "medical_history": "Substance abuse, hepatitis",
            "symptoms": "Liver failure symptoms",
            "actual_severity": 70,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -3, "public_opinion": -1, "reputation": 1, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": 0, "reputation": -2, "staff_morale": -2}
            }
        },
        {
            "id": 22,
            "name": "Zara Ali",
            "age": 24,
            "gender": "Female",
            "occupation": "Graphic Designer",
            "medical_history": "Healthy",
            "symptoms": "Broken leg from sports injury",
            "actual_severity": 35,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 0, "reputation": 0, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": 0, "reputation": 0, "staff_morale": 0}
            }
        },
        {
            "id": 23,
            "name": "Harold Peterson",
            "age": 76,
            "gender": "Male",
            "occupation": "Retired Professor",
            "medical_history": "Cancer survivor, diabetes",
            "symptoms": "Pneumonia, high fever",
            "actual_severity": 75,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -3, "public_opinion": 1, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -4, "staff_morale": -2}
            }
        },
        {
            "id": 24,
            "name": "Michelle Lee",
            "age": 40,
            "gender": "Female",
            "occupation": "Restaurant Server",
            "medical_history": "None",
            "symptoms": "Severe burns from kitchen accident",
            "actual_severity": 80,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -3, "public_opinion": 1, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -3, "staff_morale": -2}
            }
        },
        {
            "id": 25,
            "name": "Daniel Foster",
            "age": 35,
            "gender": "Male",
            "occupation": "Investment Banker",
            "medical_history": "High stress",
            "symptoms": "Chest discomfort, stress-related",
            "actual_severity": 30,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 0, "reputation": 1, "staff_morale": -1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": 0, "reputation": 0, "staff_morale": 0}
            }
        },

        # Day 6
        {
            "id": 26,
            "name": "Rosa Hernandez",
            "age": 51,
            "gender": "Female",
            "occupation": "Housekeeper",
            "medical_history": "Arthritis, back pain",
            "symptoms": "Severe back injury",
            "actual_severity": 45,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 0, "reputation": 1, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -1, "reputation": -1, "staff_morale": -1}
            }
        },
        {
            "id": 27,
            "name": "Christopher Wright",
            "age": 69,
            "gender": "Male",
            "occupation": "Retired Mechanic",
            "medical_history": "Emphysema, heart disease",
            "symptoms": "Respiratory failure",
            "actual_severity": 85,
            "outcome_weights": {
                "admit": {"icu_beds": -3, "medicine": -3, "public_opinion": 0, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -4, "staff_morale": -2}
            }
        },
        {
            "id": 28,
            "name": "Samantha Green",
            "age": 29,
            "gender": "Female",
            "occupation": "PhD Student",
            "medical_history": "Anxiety",
            "symptoms": "Lab accident, chemical burn",
            "actual_severity": 60,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -2, "public_opinion": 1, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -2, "staff_morale": -1}
            }
        },
        {
            "id": 29,
            "name": "Ramon Santos",
            "age": 44,
            "gender": "Male",
            "occupation": "Delivery Driver",
            "medical_history": "None",
            "symptoms": "Traffic accident, internal bleeding",
            "actual_severity": 90,
            "outcome_weights": {
                "admit": {"icu_beds": -3, "medicine": -3, "public_opinion": 1, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -5, "staff_morale": -3}
            }
        },
        {
            "id": 30,
            "name": "Victoria Black",
            "age": 37,
            "gender": "Female",
            "occupation": "Physician",
            "medical_history": "Healthy",
            "symptoms": "Exposure to infectious patient",
            "actual_severity": 50,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -2, "public_opinion": 2, "reputation": 3, "staff_morale": 3},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -4, "staff_morale": -4}
            }
        },

        # Day 7
        {
            "id": 31,
            "name": "Gary Mitchell",
            "age": 59,
            "gender": "Male",
            "occupation": "Unemployed",
            "medical_history": "Drug addiction, HIV",
            "symptoms": "Overdose",
            "actual_severity": 65,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": -1, "reputation": 0, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": 0, "reputation": -2, "staff_morale": -2}
            }
        },
        {
            "id": 32,
            "name": "Emma Thompson",
            "age": 22,
            "gender": "Female",
            "occupation": "Intern",
            "medical_history": "None",
            "symptoms": "Severe dehydration, exhaustion",
            "actual_severity": 40,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 0, "reputation": 0, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": 0, "reputation": 0, "staff_morale": 0}
            }
        },
        {
            "id": 33,
            "name": "Walter Jackson",
            "age": 74,
            "gender": "Male",
            "occupation": "Retired Bus Driver",
            "medical_history": "Parkinson's disease",
            "symptoms": "Fall, head trauma",
            "actual_severity": 70,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": 1, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -3, "staff_morale": -2}
            }
        },
        {
            "id": 34,
            "name": "Lisa Kumar",
            "age": 32,
            "gender": "Female",
            "occupation": "Pharmacist",
            "medical_history": "Diabetes",
            "symptoms": "Diabetic ketoacidosis",
            "actual_severity": 75,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": 2, "reputation": 2, "staff_morale": 2},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -4, "staff_morale": -3}
            }
        },
        {
            "id": 35,
            "name": "Brian Hughes",
            "age": 47,
            "gender": "Male",
            "occupation": "Security Guard",
            "medical_history": "Hypertension",
            "symptoms": "Assault victim, multiple injuries",
            "actual_severity": 55,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -2, "public_opinion": 1, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -1, "reputation": -2, "staff_morale": -1}
            }
        },

        # Day 8
        {
            "id": 36,
            "name": "Angela Davis",
            "age": 54,
            "gender": "Female",
            "occupation": "Social Worker",
            "medical_history": "Breast cancer survivor",
            "symptoms": "Suspected cancer recurrence",
            "actual_severity": 60,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -2, "public_opinion": 2, "reputation": 2, "staff_morale": 2},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -3, "staff_morale": -2}
            }
        },
        {
            "id": 37,
            "name": "Timothy Rogers",
            "age": 70,
            "gender": "Male",
            "occupation": "Retired Postal Worker",
            "medical_history": "Diabetes, kidney disease",
            "symptoms": "Kidney failure",
            "actual_severity": 80,
            "outcome_weights": {
                "admit": {"icu_beds": -3, "medicine": -3, "public_opinion": 0, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -4, "staff_morale": -2}
            }
        },
        {
            "id": 38,
            "name": "Maya Cohen",
            "age": 26,
            "gender": "Female",
            "occupation": "Journalist",
            "medical_history": "Healthy",
            "symptoms": "Assault while covering protest",
            "actual_severity": 50,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 3, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -4, "reputation": -3, "staff_morale": -2}
            }
        },
        {
            "id": 39,
            "name": "Joseph King",
            "age": 61,
            "gender": "Male",
            "occupation": "Truck Driver",
            "medical_history": "Sleep apnea, obesity",
            "symptoms": "Fatigue-related accident",
            "actual_severity": 45,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 0, "reputation": 0, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -1, "reputation": -1, "staff_morale": -1}
            }
        },
        {
            "id": 40,
            "name": "Sarah Nguyen",
            "age": 30,
            "gender": "Female",
            "occupation": "Architect",
            "medical_history": "None",
            "symptoms": "Pregnancy complications",
            "actual_severity": 85,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -3, "public_opinion": 3, "reputation": 3, "staff_morale": 2},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -5, "reputation": -6, "staff_morale": -4}
            }
        },

        # Day 9
        {
            "id": 41,
            "name": "Richard Bell",
            "age": 66,
            "gender": "Male",
            "occupation": "Retired",
            "medical_history": "Alzheimer's disease",
            "symptoms": "Wandered outside, hypothermia",
            "actual_severity": 70,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": 1, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -3, "staff_morale": -2}
            }
        },
        {
            "id": 42,
            "name": "Jasmine Taylor",
            "age": 25,
            "gender": "Female",
            "occupation": "Barista",
            "medical_history": "Asthma",
            "symptoms": "Minor burns, smoke inhalation",
            "actual_severity": 35,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 0, "reputation": 0, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": 0, "reputation": 0, "staff_morale": 0}
            }
        },
        {
            "id": 43,
            "name": "Albert Costa",
            "age": 73,
            "gender": "Male",
            "occupation": "Retired Electrician",
            "medical_history": "Pacemaker, heart failure",
            "symptoms": "Pacemaker malfunction",
            "actual_severity": 95,
            "outcome_weights": {
                "admit": {"icu_beds": -3, "medicine": -3, "public_opinion": 1, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -6, "staff_morale": -3}
            }
        },
        {
            "id": 44,
            "name": "Rachel Kim",
            "age": 34,
            "gender": "Female",
            "occupation": "Paramedic",
            "medical_history": "None",
            "symptoms": "Injured on duty, broken arm",
            "actual_severity": 40,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -1, "public_opinion": 2, "reputation": 2, "staff_morale": 3},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -3, "staff_morale": -4}
            }
        },
        {
            "id": 45,
            "name": "Dennis Moore",
            "age": 56,
            "gender": "Male",
            "occupation": "Warehouse Worker",
            "medical_history": "Back problems",
            "symptoms": "Forklift accident, crushed leg",
            "actual_severity": 75,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": 1, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -3, "staff_morale": -2}
            }
        },

        # Day 10
        {
            "id": 46,
            "name": "Patricia White",
            "age": 48,
            "gender": "Female",
            "occupation": "Accountant",
            "medical_history": "Migraines",
            "symptoms": "Severe headache, vision loss",
            "actual_severity": 65,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -2, "public_opinion": 1, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -2, "staff_morale": -1}
            }
        },
        {
            "id": 47,
            "name": "George Adams",
            "age": 75,
            "gender": "Male",
            "occupation": "Retired Judge",
            "medical_history": "Multiple conditions",
            "symptoms": "Multiple organ failure",
            "actual_severity": 90,
            "outcome_weights": {
                "admit": {"icu_beds": -3, "medicine": -4, "public_opinion": 1, "reputation": 2, "staff_morale": 0},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -2, "reputation": -5, "staff_morale": -2}
            }
        },
        {
            "id": 48,
            "name": "Isabella Romano",
            "age": 28,
            "gender": "Female",
            "occupation": "Veterinarian",
            "medical_history": "Healthy",
            "symptoms": "Animal bite, infection risk",
            "actual_severity": 55,
            "outcome_weights": {
                "admit": {"icu_beds": -1, "medicine": -2, "public_opinion": 1, "reputation": 1, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -1, "reputation": -2, "staff_morale": -1}
            }
        },
        {
            "id": 49,
            "name": "Marcus Freeman",
            "age": 52,
            "gender": "Male",
            "occupation": "Grocery Store Manager",
            "medical_history": "High blood pressure",
            "symptoms": "Stroke symptoms",
            "actual_severity": 80,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -3, "public_opinion": 1, "reputation": 2, "staff_morale": 1},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -3, "reputation": -4, "staff_morale": -2}
            }
        },
        {
            "id": 50,
            "name": "Helen Brooks",
            "age": 41,
            "gender": "Female",
            "occupation": "Firefighter",
            "medical_history": "None",
            "symptoms": "Injured in building collapse",
            "actual_severity": 85,
            "outcome_weights": {
                "admit": {"icu_beds": -2, "medicine": -3, "public_opinion": 4, "reputation": 4, "staff_morale": 3},
                "turn_away": {"icu_beds": 0, "medicine": 0, "public_opinion": -6, "reputation": -7, "staff_morale": -5}
            }
        },
    ]

    # Add biased AI scores to all patients
    for patient in patients:
        patient["ai_score"] = calculate_biased_ai_score(
            patient["actual_severity"],
            patient["age"],
            patient["occupation"],
            patient.get("demographics", "")
        )

    return patients


def generate_events() -> List[Dict]:
    """Generate random events that occur at the start of each day"""

    events = [
        {
            "type": "supply_grant",
            "title": "Government Supply Drop",
            "description": "Emergency medical supplies have arrived from the federal government.",
            "effects": {
                "icu_beds": 0,
                "medicine": 5,
                "public_opinion": 1,
                "reputation": 0,
                "staff_morale": 1
            },
            "probability": 0.3
        },
        {
            "type": "staff_quit",
            "title": "Staff Walkout",
            "description": "Several nurses have quit due to overwhelming workload and stress.",
            "effects": {
                "icu_beds": -1,
                "medicine": 0,
                "public_opinion": -1,
                "reputation": -1,
                "staff_morale": -3
            },
            "probability": 0.25
        },
        {
            "type": "protest",
            "title": "Public Protest",
            "description": "Protesters are gathering outside, claiming the hospital is denying care to certain groups.",
            "effects": {
                "icu_beds": 0,
                "medicine": 0,
                "public_opinion": -3,
                "reputation": -2,
                "staff_morale": -1
            },
            "probability": 0.2
        },
        {
            "type": "donation",
            "title": "Private Donation",
            "description": "A wealthy donor has contributed significant funds to the hospital.",
            "effects": {
                "icu_beds": 1,
                "medicine": 3,
                "public_opinion": 2,
                "reputation": 2,
                "staff_morale": 1
            },
            "probability": 0.2
        },
        {
            "type": "media_attention",
            "title": "Positive Media Coverage",
            "description": "A news story highlights the hospital staff's heroic efforts during the crisis.",
            "effects": {
                "icu_beds": 0,
                "medicine": 0,
                "public_opinion": 3,
                "reputation": 3,
                "staff_morale": 2
            },
            "probability": 0.25
        },
        {
            "type": "equipment_failure",
            "title": "Equipment Malfunction",
            "description": "Critical medical equipment has malfunctioned, reducing hospital capacity.",
            "effects": {
                "icu_beds": -2,
                "medicine": 0,
                "public_opinion": 0,
                "reputation": -1,
                "staff_morale": -2
            },
            "probability": 0.2
        },
        {
            "type": "volunteer_arrival",
            "title": "Volunteer Medical Staff",
            "description": "Retired doctors and nurses have volunteered to help during the crisis.",
            "effects": {
                "icu_beds": 2,
                "medicine": 0,
                "public_opinion": 2,
                "reputation": 1,
                "staff_morale": 2
            },
            "probability": 0.25
        },
        {
            "type": "power_outage",
            "title": "Power Outage",
            "description": "A brief power outage has disrupted hospital operations despite backup generators.",
            "effects": {
                "icu_beds": -1,
                "medicine": -1,
                "public_opinion": -1,
                "reputation": -1,
                "staff_morale": -1
            },
            "probability": 0.15
        }
    ]

    return events


def main():
    """Generate and save game data as JSON files"""

    print("Generating patient data...")
    patients = generate_patients()

    print("Generating event data...")
    events = generate_events()

    # Save to JSON files
    import os
    os.makedirs("../frontend/data", exist_ok=True)

    with open("../frontend/data/patients.json", "w") as f:
        json.dump(patients, f, indent=2)

    with open("../frontend/data/events.json", "w") as f:
        json.dump(events, f, indent=2)

    print(f"✓ Generated {len(patients)} patients")
    print(f"✓ Generated {len(events)} event types")
    print("✓ Data saved to frontend/data/")

    # Print bias analysis
    print("\n=== AI Bias Analysis ===")
    young_prof = [p for p in patients if p["age"] < 40 and "engineer" in p["occupation"].lower() or "manager" in p["occupation"].lower()]
    elderly = [p for p in patients if p["age"] > 65]
    unemployed = [p for p in patients if "unemployed" in p["occupation"].lower() or "homeless" in p["occupation"].lower()]

    if young_prof:
        avg_bias_young = sum(p["ai_score"] - p["actual_severity"] for p in young_prof) / len(young_prof)
        print(f"Young professionals: AI scores avg {avg_bias_young:+.1f} points vs actual severity")

    if elderly:
        avg_bias_elderly = sum(p["ai_score"] - p["actual_severity"] for p in elderly) / len(elderly)
        print(f"Elderly patients: AI scores avg {avg_bias_elderly:+.1f} points vs actual severity")

    if unemployed:
        avg_bias_unemployed = sum(p["ai_score"] - p["actual_severity"] for p in unemployed) / len(unemployed)
        print(f"Unemployed/homeless: AI scores avg {avg_bias_unemployed:+.1f} points vs actual severity")


if __name__ == "__main__":
    main()
