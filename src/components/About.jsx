import React from "react";
import skills from "@/data/skills.js";


export default function About() {
    return (
        <section id="about" className="py-32 px-6 border-t backdrop-blur-sm border-gray-900">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-sm font-mono text-gray-500 mb-8 tracking-wider">ABOUT</h2>
                    <p className="text-xl text-gray-300 leading-relaxed mb-6">
                        My role as a software engineer involves developing sophisticated solutions to handle complex technical problems.
                        My professional experience spans work with web development and machine learning and systems architecture.
                        I worked as an Undergraduate Research Assistant at Lamar University to help develop mixed reality solutions through the HoloLens 2 project which combined innovative technology with real-world functionality.
                        My time in the United States Air Force 524th Special Operations Squadron under Air Force Special Operations Command (USSOCOM) has shown me how to stay precise and disciplined while being flexible.
                        The problem-solving abilities and team collaboration experience I developed in the Air Force help me design efficient systems and overcome technical challenges with focused dedication.
                    </p>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Currently exploring the boundaries of what's possible with modern web technologies and pushing the
                        limits of browser-based applications.
                    </p>
                </div>


                <div>
                    <h3 className="text-sm font-mono text-gray-500 mb-8 tracking-wider">CAPABILITIES</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {skills.map((skill, i) => (
                            <div key={i} className="border rounded-2xl border-gray-800 p-4 text-gray-400 hover:border-gray-600 hover:text-white transition-all">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}