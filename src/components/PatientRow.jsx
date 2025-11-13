import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PatientDetails from "@/components/PatientDetails";
import PatientEditor from "@/components/PatientEditor";

export default function PatientRow({ patient, onUpdate }) {
    const [expanded, setExpanded] = useState(false);
    const [editing, setEditing] = useState(false);

    return (
        <>
            <tr
                onClick={() => setExpanded(!expanded)}
                className={`hover:bg-gray-800/40 cursor-pointer ${expanded ? "bg-gray-800/50" : ""
                    }`}
            >
                <td className="px-6 py-4 font-mono text-blue-400">{patient.identifier}</td>
                <td className="px-6 py-4">{patient.familyName}</td>
                <td className="px-6 py-4">{patient.givenName}</td>
                <td className="px-6 py-4 ">{patient.birthDate}</td>
                <td className="px-6 py-4 hidden md:table-cell">
                    <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${patient.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                    >
                        {patient.status}
                    </span>
                </td>
                
                <td className="px-6 py-4 text-right">
                    {expanded ? (
                        <ChevronUp className="w-4 h-4 inline-block text-gray-400" />
                    ) : (
                        <ChevronDown className="w-4 h-4 inline-block text-gray-400" />
                    )}
                </td>
            </tr>

            {expanded && (
                <tr>
                    <td colSpan={6} className="p-6 bg-gray-950/40">
                        {editing ? (
                            <PatientEditor
                                patient={patient}
                                onUpdate={(data) => {
                                    onUpdate(data);
                                    setEditing(false);
                                }}
                                onCancel={() => setEditing(false)}
                            />
                        ) : (
                            <PatientDetails patient={patient} onEdit={() => setEditing(true)} />
                        )}
                    </td>
                </tr>
            )}
        </>
    );
}
