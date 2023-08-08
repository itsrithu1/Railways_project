import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>
        © {new Date().getFullYear()} First Class Railways. All rights reserved.
      </p>

      <p>Contact: 1231231230</p>

      <p>Email: firstclassrailways@abc.com</p>
    </footer>
  );
};

const footerStyle = {
  background: "#f4f4f4",

  padding: "10px",

  textAlign: "center",
};

export default Footer;
