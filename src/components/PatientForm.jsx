import React from "react";
import { Plus, ChevronDown } from "lucide-react";
import MultiEntry from "@/components/MultiEntry";

/*
  PatientForm
  Handles all form inputs for adding a new patient.
  Props:
    - form
    - setForm
    - onChange (field handler)
    - handleSubmit
*/
export default function PatientForm({ form, setForm, onChange, handleSubmit }) {
    return (
        <section className="space-y-4">
            <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-semibold">
                Add New Patient Record
            </h2>

            <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6 backdrop-blur-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Resource Type</label>
                        <div className="relative">
                            <select
                                name="resourceType"
                                value={form.resourceType}
                                onChange={onChange}
                                className="w-full appearance-none bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            >
                                <option value="Patient">Patient</option>
                                <option value="Observation">Observation</option>
                                <option value="Condition">Condition</option>
                                <option value="Procedure">Procedure</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Status</label>
                        <div className="relative">
                            <select
                                name="status"
                                value={form.status}
                                onChange={onChange}
                                className="w-full appearance-none bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="entered-in-error">Entered in Error</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Patient Identifier</label>
                    <input
                        name="identifier"
                        value={form.identifier}
                        onChange={onChange}
                        placeholder="e.g., P003456"
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Family Name</label>
                        <input
                            name="familyName"
                            value={form.familyName}
                            onChange={onChange}
                            placeholder="Last name"
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Given Name</label>
                        <input
                            name="givenName"
                            value={form.givenName}
                            onChange={onChange}
                            placeholder="First name"
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Birth Date</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={form.birthDate}
                            onChange={onChange}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Administrative Gender</label>
                        <div className="relative">
                            <select
                                name="gender"
                                value={form.gender}
                                onChange={onChange}
                                className="w-full appearance-none bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            >
                                <option value="unknown">Unknown</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MultiEntry
                        label="Diagnoses / Conditions"
                        value={form.diagnoses}
                        onChange={(diagnoses) => setForm((f) => ({ ...f, diagnoses }))}
                        placeholder="Diagnosis"
                    />
                    <MultiEntry
                        label="Medications"
                        value={form.medications}
                        onChange={(medications) => setForm((f) => ({ ...f, medications }))}
                        placeholder="Medication"
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                    >
                        <Plus className="w-5 h-5" />
                        Add Patient Record
                    </button>
                </div>
            </div>
        </section>
    );
}
