import React, { useState } from "react";
import { Save, X } from "lucide-react";
import MultiEntry from "@/components/MultiEntry";
import { fhirMultiSections } from "@/lib/fhirSectionsArray";

export default function PatientEditor({ patient, onUpdate, onCancel }) {
  const [form, setForm] = useState({ ...patient });
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-300 mb-1 block">Family Name</label>
          <input
            name="familyName"
            value={form.familyName}
            onChange={onChange}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm w-full"
          />
        </div>
        <div>
          <label className="text-sm text-gray-300 mb-1 block">Given Name</label>
          <input
            name="givenName"
            value={form.givenName}
            onChange={onChange}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm w-full"
          />
        </div>
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-300 mb-1 block">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={onChange}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm w-full"
          />
        </div>
        <div>
          <label className="text-sm text-gray-300 mb-1 block">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={onChange}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm w-full"
          >
            <option value="unknown">Unknown</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Auto-generated FHIR sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fhirMultiSections.map(({ key, label, placeholder }) => (
          <MultiEntry
            key={key}
            label={label}
            value={form[key] || []}
            onChange={(val) => setForm((f) => ({ ...f, [key]: val }))}
            placeholder={placeholder}
          />
        ))}
      </div>

      {/* Save / Cancel */}
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 border border-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-800"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
        <button
          onClick={() => onUpdate(form)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm font-semibold"
        >
          <Save className="w-4 h-4" /> Save
        </button>
      </div>
    </div>
  );
}
