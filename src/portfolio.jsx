import React, { useState } from "react";
import FlockCanvas from "@/components/FlockCanvas";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";


export default function Portfolio() {
  // Contact form state and handlers 
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(
      "Form not submitted: Backend Migration in progress! please contact me via linkedin or gmail. sorry for the inconvenience."
    );
    setFormData({ name: "", email: "", message: "" });
  };


  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <FlockCanvas birdCount={100} predatorCount={3} />
      <div className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Contact formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
        <Footer />
      </div>
    </div>
  );
}