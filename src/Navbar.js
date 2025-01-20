import { useState } from "react";

import taxi from "./assets/images/taxi.jpg";

export const Navbar = ({ setOption }) => {
  const [styles, setStyles] = useState({});
  const [styles2, setStyles2] = useState({});
  const [styles3, setStyles3] = useState({});
  const [styles4, setStyles4] = useState({});
  const style1 = { color: "red" };

  return (
    <>
      <nav>
        <div className="front">
          <h2
            style={{ position: "absolute", top: "1px", left: "20px" }}
            onClick={() => {
              setOption("");
              setStyles({});
              setStyles2({});
              setStyles3({});
              setStyles4({});
            }}
          >
            <span className="taxico-red">Taxi</span>co
          </h2>
          <ul>
            <li
              style={styles}
              onClick={() => {
                setOption("1");
                setStyles(style1);
                setStyles2({});
                setStyles3({});
                setStyles4({});
              }}
            >
              Tarifas
            </li>
            <li
              style={styles2}
              onClick={() => {
                setOption("2");
                setStyles({});
                setStyles2(style1);
                setStyles3({});
                setStyles4({});
              }}
            >
              Taxistas
            </li>
            <li
              style={styles3}
              onClick={() => {
                setOption("3");
                setStyles({});
                setStyles2({});
                setStyles3(style1);
                setStyles4({});
              }}
            >
              Reparaciones
            </li>
            <li
              style={styles4}
              onClick={() => {
                setOption("4");
                setStyles({});
                setStyles2({});
                setStyles3({});
                setStyles4(style1);
              }}
            >
              Vehiculos
            </li>
          </ul>
          <img
            src={taxi}
            style={{
              width: "50px",
              position: "absolute",
              right: "40px",
              top: "10px",
            }}
            alt="taxi"
            onClick={() => {
              setOption("");
              setStyles({});
              setStyles2({});
              setStyles3({});
              setStyles4({});
            }}
          />
        </div>
      </nav>
    </>
  );
};
