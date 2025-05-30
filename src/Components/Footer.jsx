import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 p-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Side: Brand info and copyright */}
        <div className="text-center md:text-left">
          <h3 className="text-white text-lg font-semibold">Trackly</h3>
          <p className="text-sm">Simple & Intuitive Task Management App</p>
          <p className="text-xs mt-1">
            © {new Date().getFullYear()} Dharmjit Chauhan. All rights reserved.
          </p>
        </div>

        {/* Right Side: Social and contact links */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <a
            href="https://www.linkedin.com/in/chauhan-dharmjit-155809285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="transition-colors duration-300 text-sm flex gap-2 items-center hover:text-blue-400"
          >
            <FaLinkedinIn size={22} /> LinkedIn
          </a>

          <a
            href="https://github.com/007Dharmjit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="transition-colors duration-300 text-sm flex gap-2 items-center hover:text-white"
          >
            <FaGithub size={22} /> GitHub
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=chauhandharmjitsinh@gmail.com&su=Hello%20Dharmjit&body=I%20would%20like%20to%20contact%20you."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send email to Dharmjit"
            className="transition-colors duration-300 text-sm flex gap-2 items-center hover:text-sky-400"
          >
            <IoMail size={22} /> E-Mail
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
