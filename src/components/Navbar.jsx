import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl font-light tracking-wider text-gray-300"
          >
            Tylers-Lab.dev
          </Link>
          <div className="flex space-x-8">
            <a href="/#work" className="text-gray-400 hover:text-white transition-colors">
              Work
            </a>
            <a href="/#about" className="text-gray-400 hover:text-white transition-colors">
              About
            </a>
            <a href="/#contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
