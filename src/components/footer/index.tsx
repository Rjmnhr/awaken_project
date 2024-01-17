import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-light p-3 border">
      <span className="mb-3">© 2024 by Ansua Dutta Coaching</span>
      <br />

      <div
        style={{ gap: "10px" }}
        className="d-flex justify-content-center align-items-center mt-3"
      >
        {" "}
        <a href="https://www.ansuadutta.com/privacy-policy" target="blank">
          <button className="btn rounded-0 btn-dark">Data Protection</button>
        </a>
        <a href="https://www.ansuadutta.com/privacy-policy-1" target="blank">
          <button className="btn rounded-0 btn-dark">Imprint</button>
        </a>
        <a href="/privacy-policy" target="blank">
          <button className="btn rounded-0 btn-dark">Privacy Policy</button>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
