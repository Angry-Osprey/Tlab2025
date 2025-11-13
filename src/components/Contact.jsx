// components/Contact.jsx

import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";


export default function Contact({ formData, onChange, onSubmit }) {
    return (
        <section id="contact" className="py-32 px-6 border-t border-gray-900">
            <div className="max-w-4xl backdrop-blur-xs p-5 border border-gray-900 rounded-2xl mx-auto">
                <h2 className="text-sm font-mono text-shadow-amber-300 mb-16 tracking-wider">GET IN TOUCH</h2>


                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-white text-sm mb-2 font-mono">NAME</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            className="w-full bg-transparent border backdrop-blur-sm border-gray-800 px-6 py-4 text-white focus:outline-none focus:border-gray-600 transition-colors"
                        />
                    </div>


                    <div>
                        <label className="block text-white text-sm mb-2 font-mono">EMAIL</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            className="w-full bg-transparent backdrop-blur-sm border border-gray-800 px-6 py-4 text-white focus:outline-none focus:border-gray-600 transition-colors"
                        />
                    </div>


                    <div>
                        <label className="block text-white text-sm mb-2 font-mono">MESSAGE</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={onChange}
                            rows={6}
                            className="w-full bg-transparent backdrop-blur-sm border border-gray-800 px-6 py-4 text-white focus:outline-none focus:border-gray-600 transition-colors resize-none"
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full backdrop-blur-sm border border-gray-700 px-8 py-4 text-white hover:bg-white hover:text-black transition-all font-mono"
                    >
                        SEND MESSAGE
                    </button>
                </form>


                <div className="flex justify-center space-x-8 mt-16">
                    <a href="https://github.com/Angry-Osprey" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors"><Github size={24} /></a>
                    <a href="https://www.linkedin.com/in/tyler-thompson-429305146/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors"><Linkedin size={24} /></a>
                    <a href="mailto:tylerthompson508@gmail.com" className="text-gray-600 hover:text-white transition-colors"><Mail size={24} /></a>
                </div>
            </div>
        </section>
    );
}