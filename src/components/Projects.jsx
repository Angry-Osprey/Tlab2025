import React from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import projects from "@/data/projects.js";


function ProjectLink({ href, children }) {
    const isExternal = /^https?:\/\//i.test(href);
    if (isExternal) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
                {children}
            </a>
        );
    }
    return (
        <Link to={href} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
            {children}
        </Link>
    );
}


export default function Projects() {
    return (
        <section id="work" className="py-32 px-6">
            <div className="max-w-7xl mx-auto p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                <h2 className="text-sm font-mono text-gray-500 mb-16 tracking-wider">PROJECTS</h2>
                <div className="space-y-12">
                    {projects.map((project, index) => (
                        <div key={index} className="group border rounded-2xl border-gray-800 p-8 hover:border-gray-600 transition-all bg-black/40">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="text-sm text-gray-600 font-mono mb-2">0{index + 1}</div>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-gray-300 transition-colors">
                                        {project.title}
                                    </h3>
                                </div>
                                <ProjectLink href={project.link}>
                                    <ExternalLink size={24} />
                                </ProjectLink>
                            </div>


                            <p className="text-gray-400 text-lg mb-6 max-w-2xl">{project.description}</p>


                            <div className="flex flex-wrap gap-3">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="border rounded-2xl border-gray-800 text-gray-500 px-4 py-2 text-sm font-mono">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}