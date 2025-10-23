/* src/lib/fhirSections.js
-----------------------------------------------------------------------------
Central config for all FHIR multi-entry fields in TYDB app.
Each entry represents a section that should render a <MultiEntry> input.
-----------------------------------------------------------------------------*/

export const fhirMultiSections = [
  { key: "allergies", label: "Allergies / Intolerances", placeholder: "Allergy" },
  { key: "carePlans", label: "Care Plans", placeholder: "Care Plan" },
  { key: "careTeams", label: "Care Teams", placeholder: "Care Team Member" },
  { key: "conditions", label: "Conditions / Diagnoses", placeholder: "Condition" },
  { key: "devices", label: "Devices", placeholder: "Device" },
  { key: "diagnosticReports", label: "Diagnostic Reports", placeholder: "Diagnostic Report" },
  { key: "encounters", label: "Encounters", placeholder: "Encounter" },
  { key: "goals", label: "Goals", placeholder: "Goal" },
  { key: "immunizations", label: "Immunizations", placeholder: "Immunization" },
  { key: "locations", label: "Locations", placeholder: "Location" },
  { key: "medications", label: "Medications", placeholder: "Medication" },
  { key: "medicationDispenses", label: "Medication Dispenses", placeholder: "Medication Dispense" },
  { key: "medicationRequests", label: "Medication Requests", placeholder: "Medication Request" },
  { key: "observations", label: "Observations", placeholder: "Observation" },
  { key: "organizations", label: "Organizations", placeholder: "Organization" },
  { key: "practitioners", label: "Practitioners", placeholder: "Practitioner" },
  { key: "procedures", label: "Procedures", placeholder: "Procedure" },
  { key: "provenances", label: "Provenances", placeholder: "Provenance" },
  { key: "questionnaireResponses", label: "Questionnaire Responses", placeholder: "Response" },
  { key: "relatedPersons", label: "Related Persons", placeholder: "Related Person" },
  { key: "serviceRequests", label: "Service Requests", placeholder: "Service Request" },
  { key: "specimens", label: "Specimens", placeholder: "Specimen" },
];
