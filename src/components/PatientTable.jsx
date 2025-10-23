import React from "react";
import { FileText } from "lucide-react";

/*
  PatientTable
  Displays the filtered patient records in a table.
  Props:
    - filtered: array of patient objects
*/
export default function PatientTable({ filtered }) {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-semibold">
                    Patient Records ({filtered.length})
                </h2>
            </div>

            <div className="overflow-x-auto bg-gray-900/30 border border-gray-800 rounded-2xl backdrop-blur-sm">
                <table className="w-full text-xs sm:text-sm">
                    <thead>
                        <tr className="bg-gray-900/80 text-gray-300">
                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold">Identifier</th>
                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold">Family Name</th>
                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold">Given Name</th>
                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold hidden md:table-cell">Birth Date</th>
                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold hidden lg:table-cell">Gender</th>
                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold hidden xl:table-cell">Status</th>
                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold hidden xl:table-cell">Diagnoses</th>
                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold hidden xl:table-cell">Medication</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-800">
                        {filtered.map((r) => (
                            <tr key={r.id} className="hover:bg-gray-800/40 transition-colors">
                                <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-blue-400">{r.identifier}</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4">{r.familyName}</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4">{r.givenName}</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell text-gray-400">{r.birthDate}</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell capitalize">{r.gender}</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 hidden xl:table-cell">
                                    <span
                                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${r.status === "active"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-gray-500/20 text-gray-400"
                                            }`}
                                    >
                                        {r.status}
                                    </span>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-400 hidden xl:table-cell">
                                    {r.diagnoses.slice(0, 2).join(", ")}
                                    {r.diagnoses.length > 2 && ` +${r.diagnoses.length - 2}`}
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-400 hidden xl:table-cell">
                                    {r.medications.slice(0, 2).join(", ")}
                                    {r.medications.length > 2 && ` +${r.medications.length - 2}`}
                                </td>
                            </tr>
                        ))}

                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>No patient records found</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
