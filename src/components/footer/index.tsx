import React from "react";


const Footer: React.FC = () => {
 
  return (
    <footer className="footer bg-light p-3 border">
      <span className="mb-3">© 2023 by Ansua Dutta Coaching</span>
      <br />

      <div
        style={{ gap: "10px" }}
        className="d-flex justify-content-center align-items-center mt-3"
      >
        {" "}
        <a href="https://www.ansuadutta.com/privacy-policy">
          <button className="btn rounded-0 btn-dark">Data Protection</button>
        </a>
        <a href="https://www.ansuadutta.com/privacy-policy-1">
          <button className="btn rounded-0 btn-dark">Imprint</button>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
