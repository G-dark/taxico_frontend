import { useState } from "react";
import Modal from "./Modal";

function Card({
  values = [],
  labels,
  types,
  setDesautorizacion,
  endpoint,
  type,
  user,
  ID,
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const openModal2 = () => setModalOpen2(true);
  const closeModal2 = () => setModalOpen2(false);

  const [value1, setValue1] = useState(values[0]);
  const [value2, setValue2] = useState(values[1]);
  const [value3, setValue3] = useState(values[2]);
  const [value4, setValue4] = useState(values[3]);
  const [value5, setValue5] = useState(values[4]);
  const [value6, setValue6] = useState(values[5]);
  const [value7, setValue7] = useState(values[6]);
  const [value8, setValue8] = useState("2025-01-01");
  const [value9, setValue9] = useState(values[8]);
  let states = [],
    setStates = [],
    values2 = [],
    labels2 = [];

  if (type === "/Fee") {
    states = [value1, value2, value5, value8, value9];
    setStates = [setValue1, setValue2, setValue5, setValue8, setValue9];
    values2 = [values[0], values[1], values[4], values[7], values[8]];
    labels2 = [labels[0], labels[1], labels[4], labels[7], labels[8]];
  }

  if (type === "/Driver") {
    states = [value1, value2, value3, value4, value5, value6, value7];
    setStates = [
      setValue1,
      setValue2,
      setValue3,
      setValue4,
      setValue5,
      setValue6,
      setValue7,
    ];
    values2 = [
      values[0],
      values[1],
      values[2],
      values[3],
      values[4],
      values[5],
      values[6],
    ];
    labels2 = [
      labels[0],
      labels[1],
      labels[2],
      labels[3],
      labels[4],
      labels[5],
      labels[6],
    ];
  }

  if (type === "/Repair") {
    states = [value1, value2, value3];
    setStates = [setValue1, setValue2, setValue3];
    values2 = [values[0], values[1], values[2]];
    labels2 = [labels[0], labels[1], labels[2]];
  }
  if (type === "/Car") {
    states = [value1, value2, value3, value4];
    setStates = [setValue1, setValue2, setValue3, setValue4];
    values2 = [values[0], values[1], values[2], values[3]];
    labels2 = [labels[0], labels[1], labels[2], labels[3]];
  }
  const stateSwitcher = (setState) => {
    return (e) => setState(e.target.value);
  };

  const updateElement = () => {
    let bodyy = {};
    if (type === "/Fee") {
      let status = 0;
      if (value9 === "Si" || value9 === "Sí"|| value9 === "si"|| value9 === "sí") {
        status = 1;
      } else if (value9 === "No" || value9 === "no") {
        status = 0;
      }
      bodyy = {
        taxidriver: value1,
        amount: value2,
        user: user,
        car: value5,
        date: value8,
        rest: status,
      };
    }
    if (type === "/Driver") {
      let status = 0;
      if (value7 === "Activo") {
        status = 1;
      } else if (value7 === "Inactivo") {
        status = 0;
      }
      bodyy = {
        fn: value1,
        sn: value2,
        ln: value3,
        alias: value4,
        ID: value5,
        car: value6,
        status: status,
      };
    }
    if (type === "/Repair") {
      bodyy = { concept: value1, cost: value2, car: value3, user: user };
    }
    if (type === "/Car") {
      let status = 0;
      if (value3 === "Activo") {
        status = 1;
      } else if (value3 === "Inactivo") {
        status = 0;
      }
      bodyy = {
        registration: value1,
        model: value2,
        status: status,
        driver: value4,
        user: user,
      };
    }
    fetch(endpoint + type + "/" + ID, {
      method: "PATCH",
      body: JSON.stringify(bodyy),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            setDesautorizacion(true);
            throw new Error("Acceso no autorizado");
          } else {
            throw new Error("Hubo un error");
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log("Solicitud exitosa", data);
        closeModal2();
      })
      .catch((Error) => console.error("Error en la solicitud", Error));
  };
  const deleteElement = () => {
    fetch(endpoint + type + "/" + ID, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            setDesautorizacion(true);
            throw new Error("Acceso no autorizado");
          } else {
            throw new Error("Hubo un error");
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log("Solicitud exitosa", data);
        closeModal();
      })
      .catch((Error) => console.error("Error en la solicitud", Error));
  };
  return (
    <>
      <div className="box-card">
        <div style={{ marginRight: "20px" }} className="btn-frame">
          <span onClick={openModal} className="trashbin-icon"></span>
          <span onClick={openModal2} className="pencil-icon"></span>
        </div>
        {values.map((value, key) => {
          return (
            <div className="part" key={key}>
              <h4>{labels[key]}:</h4>
              <h5 style={{ marginLeft: "20px" }}>
                {value ? value : "Nadie/Nunca"}
              </h5>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h4 style={{ textAlign: "center" }}>
          ¿Estás seguro que deseas eliminar este elemento?
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <span onClick={deleteElement} className="trashbin-icon"></span>
          <span onClick={closeModal} className="return-icon"></span>
        </div>
      </Modal>
      <Modal isOpen={isModalOpen2} onClose={closeModal2}>
        <h1 style={{ textAlign: "center" }}>Actualizar</h1>
        {values2.map((value, key) => {
          return (
            <div style={{ display: "flex", flexDirection: "column" }} key={key}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4>{labels2[key]}:</h4>
                <input
                  type={types[key]}
                  onChange={stateSwitcher(setStates[key])}
                  style={{ height: "20px" }}
                  value={states[key]}
                />
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginRight: "100vw",
            border: "1px black solid",
          }}
        >
          <input
            type="button"
            style={{ marginRight: "100px" }}
            onClick={updateElement}
            value="Actualizar"
          />
        </div>
      </Modal>
    </>
  );
}
export default Card;
