/* eslint-disable no-unused-vars */
import "./Navbar.css";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

export const Navbar = () => {
  const links = [
    { name: "Home", to: "home" },
    { name: "Projects", to: "projects" },
    { name: "About", to: "about" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="navbar-logo"
        >
          PORTFOLIO
        </motion.span>
        <div className="navbar-links">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              spy={true} // Enables scrollspy
              activeClass="active-link" // Class applied to the active link
              className="navbar-link"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};