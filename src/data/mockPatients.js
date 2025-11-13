// src/data/mockPatients.js
// 100 patients.


const FIRST = [
    "John", "Sarah", "Michael", "Emily", "David", "Jessica", "Daniel", "Ashley", "Matthew", "Amanda",
    "Tyler", "Olivia", "Ethan", "Sophia", "Noah", "Ava", "Liam", "Isabella", "Mason", "Mia",
    "James", "Charlotte", "Benjamin", "Amelia", "Elijah", "Harper", "Lucas", "Evelyn", "Logan", "Abigail"
];

const LAST = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"
];

const DIAGNOSES = [
    "Hypertension", "Type 2 Diabetes", "Hyperlipidemia", "Asthma", "Anxiety Disorder", "Depressive Disorder",
    "GERD", "Hypothyroidism", "Osteoarthritis", "Migraine", "Allergic Rhinitis", "Chronic Kidney Disease",
    "Coronary Artery Disease", "Obesity", "Vitamin D Deficiency", "Anemia", "Atrial Fibrillation"
];

const MEDS = [
    "Lisinopril 10mg", "Metformin 500mg", "Atorvastatin 20mg", "Levothyroxine 75mcg", "Amlodipine 5mg",
    "Omeprazole 20mg", "Sertraline 50mg", "Albuterol Inhaler", "Losartan 50mg", "Hydrochlorothiazide 25mg",
    "Gabapentin 300mg", "Vitamin D3 2000 IU", "Aspirin 81mg", "Fluoxetine 20mg"
];

const ALLERGIES = [
    "Penicillin", "Latex", "Peanuts", "Shellfish", "Sulfa drugs", "Pollen", "Dust mites", "Bee venom"
];

const IMMUNIZATIONS = [
    "COVID-19 (mRNA)", "Influenza", "Tdap", "Hepatitis B", "MMR", "Varicella", "Pneumococcal"
];

const DEVICES = [
    "Right total knee arthroplasty", "Left hip replacement", "Pacemaker (dual-chamber)", "Insulin pump",
    "Cochlear implant", "Coronary stent"
];

const OBSERVATIONS = [
    "BP 128/78 mmHg", "BMI 27.4 kg/m2", "A1C 6.8%", "Total Cholesterol 192 mg/dL",
    "LDL 118 mg/dL", "TSH 2.1 μIU/mL", "SpO2 98% (RA)", "Temp 98.7°F"
];

const PROCEDURES = [
    "Appendectomy", "Colonoscopy", "Cataract extraction (left)", "Skin lesion excision",
    "Laparoscopic cholecystectomy", "Knee arthroscopy", "Upper endoscopy"
];

const ENCOUNTERS = [
    "Telehealth – primary care", "Urgent care visit", "ED discharge follow-up", "Annual physical",
    "Cardiology clinic", "Endocrinology follow-up", "Orthopedics clinic"
];

const GOALS = [
    "Lower A1C below 7%", "Walk 30 minutes daily", "Lose 10 lbs in 3 months", "Reduce LDL below 100"
];

const SERVICE_REQUESTS = [
    "PT referral – knee pain", "Dermatology consult", "Cardiology stress test", "Dietician referral"
];

const REPORTS = [
    "Lipid panel (normal)", "CBC (mild anemia)", "Chest X-ray (clear)", "A1C trend report"
];

const LOCATIONS = [
    "Main Campus Clinic", "Southside Ambulatory", "Northwest Hospital", "Telehealth"
];

const ORGANIZATIONS = [
    "Northwind Health", "Acme Care Group", "Unity Medical", "Metro Health Partners"
];

const PRACTITIONERS = [
    "Dr. Emily Carter, MD", "Dr. Daniel Lee, DO", "PA Jessica Nguyen", "NP Michael Brooks"
];

const RELATED = [
    "Spouse: Anna", "Parent: Linda", "Child: Jacob", "Sibling: Mark"
];

const QUESTIONNAIRES = [
    "PHQ-9 score 7 (mild)", "GAD-7 score 6 (mild)", "Tobacco Use: Never", "Alcohol Use: Social"
];

const SPECIMENS = [
    "Serum sample (chemistry)", "Whole blood (CBC)", "Urine (UA)", "Stool (occult blood)"
];

const rand = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[rand(arr.length)];
const pickSome = (arr, max = 3) => {
    const n = 1 + rand(Math.min(max, arr.length));
    const copy = [...arr];
    const out = [];
    for (let i = 0; i < n; i++) {
        const j = rand(copy.length);
        out.push(copy.splice(j, 1)[0]);
    }
    return out;
};

const randomDate = (startYear = 1940, endYear = 2018) => {
    const y = startYear + rand(endYear - startYear + 1);
    const m = 1 + rand(12);
    const d = 1 + rand(28); //february count your days <-- add checking for date because people are born on 29-31 of most months
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${y}-${mm}-${dd}`;
};

const genders = ["male", "female", "other", "unknown"];
const statuses = ["active", "inactive"];

export const mockPatients = Array.from({ length: 100 }, (_, i) => {
    const givenName = pick(FIRST);
    const familyName = pick(LAST);
    const identifier = `P${String(1000 + i).padStart(6, "0")}`; // e.g., P001000
    return {
        id: `mock-${i + 1}`,
        resourceType: "Patient",
        identifier,
        familyName,
        givenName,
        birthDate: randomDate(),
        gender: pick(genders),
        status: pick(statuses),

        // Minimal fields table/search uses:
        diagnoses: pickSome(DIAGNOSES, 3),
        medications: pickSome(MEDS, 3),

        // Extra multi-entry sections:
        allergies: Math.random() < 0.6 ? pickSome(ALLERGIES, 2) : [],
        immunizations: Math.random() < 0.7 ? pickSome(IMMUNIZATIONS, 3) : [],
        devices: Math.random() < 0.3 ? pickSome(DEVICES, 2) : [],
        observations: Math.random() < 0.9 ? pickSome(OBSERVATIONS, 4) : [],
        procedures: Math.random() < 0.5 ? pickSome(PROCEDURES, 2) : [],
        encounters: Math.random() < 0.8 ? pickSome(ENCOUNTERS, 3) : [],
        goals: Math.random() < 0.5 ? pickSome(GOALS, 2) : [],
        serviceRequests: Math.random() < 0.4 ? pickSome(SERVICE_REQUESTS, 2) : [],
        diagnosticReports: Math.random() < 0.6 ? pickSome(REPORTS, 2) : [],
        locations: Math.random() < 0.5 ? pickSome(LOCATIONS, 2) : [],
        organizations: Math.random() < 0.6 ? pickSome(ORGANIZATIONS, 2) : [],
        practitioners: Math.random() < 0.7 ? pickSome(PRACTITIONERS, 2) : [],
        relatedPersons: Math.random() < 0.5 ? pickSome(RELATED, 2) : [],
        questionnaireResponses: Math.random() < 0.5 ? pickSome(QUESTIONNAIRES, 2) : [],
        specimens: Math.random() < 0.5 ? pickSome(SPECIMENS, 2) : [],
    };
});
