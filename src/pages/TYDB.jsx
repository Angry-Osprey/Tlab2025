/* HL7 FHIR-ish Patient DB mock UI
   - Lookup/search bar
   - Results table
   - Input form with multi-entry sections
   - Local state for now
*/

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";

/* Components */
import PatientTable from "@/components/PatientTable";
import PTH from "@/components/PatientTableHeader"
import PatientForm from "@/components/PatientForm";
import { mockPatients } from "@/data/mockPatients";

export default function TYDB() {
    /* Seed data */
    const [rows, setRows] = useState(mockPatients);

    /* Search query */
    const [query, setQuery] = useState("");

    /* Form state */
    const [form, setForm] = useState({
        resourceType: "Patient",
        identifier: "",
        familyName: "",
        givenName: "",
        birthDate: "",
        gender: "unknown",
        status: "active",
        diagnoses: [],
        medications: [],
    });

    /* Filtering logic */
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return rows;
        return rows.filter(
            (r) =>
                r.identifier.toLowerCase().includes(q) ||
                r.familyName.toLowerCase().includes(q) ||
                r.givenName.toLowerCase().includes(q) ||
                r.diagnoses.some((d) => d.toLowerCase().includes(q)) ||
                r.medications.some((m) => m.toLowerCase().includes(q))
        );
    }, [rows, query]);

    /* Form change handler */
    const onChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    /* Submit handler */
    const handleSubmit = () => {
        if (!form.identifier || !form.familyName || !form.givenName) return;
        const id = crypto.randomUUID();
        const newRow = { ...form, id };
        setRows((prev) => [newRow, ...prev]);
        setForm({
            resourceType: "Patient",
            identifier: "",
            familyName: "",
            givenName: "",
            birthDate: "",
            gender: "unknown",
            status: "active",
            diagnoses: [],
            medications: [],
        });
    };

    /* Render */
    return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8 lg:space-y-12">
                {/* Title */}
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                        HL7 FHIR Patient Database
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400">
                        Fast Healthcare Interoperability Resources (FHIR) compliant interface [ WORK IN PROGRESS. Local state only ]
                    </p>
                </div>

                {/* Lookup/search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by identifier, name, diagnosis, or medication..."
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    />
                </div>

                {/* Results section */}
                <div className="rounded-2xl border border-gray-800 overflow-hidden">
                    {/* fixed bar with record count */}
                    <div className="bg-gray-900/60 px-4 py-2 text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-semibold">
                        Patient Records ({filtered.length})
                    </div>
                    <div >
                        <PTH />
                    </div>

                    {/* scrollable area */}
                    <div className="max-h-[600px] overflow-y-auto">
                        <div className="overflow-x-auto bg-gray-900/30 backdrop-blur-sm">
                            <PatientTable
                                patients={filtered}
                                onUpdate={(updated) =>
                                    setRows((prev) => prev.map((x) => (x.identifier === updated.identifier ? updated : x)))
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Input panel */}
                <PatientForm
                    form={form}
                    setForm={setForm}
                    onChange={onChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}
