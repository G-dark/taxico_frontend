import { useEffect, useState } from "react";

import SearchDrivers from "./SearchDrivers.js";
import Popup from "./Popup.js";

function DriverPanel({ endpoint, user, setDesautorizacion }) {
  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState("");
  const [car, setCar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [styleSelected, setStyleSelected] = useState({
    backgroundColor: "red",
    fontSize: "30px",
  });
  const [styleSelected2, setStyleSelected2] = useState({
    backgroundColor: "beige",
  });

  const [option, setOption] = useState(1);
  const [searchedID, setSearchedID] = useState("");
  const [filling, setFilling] = useState({});

  const [isPopupOpen,setPopupOpen]= useState(false);
  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const switchMode = () => {
    setStyleSelected({
      backgroundColor: "red",
      fontSize: "30px",
    });
    setStyleSelected2({
      backgroundColor: "beige",
    });
    setOption(1);
  };
  const switchMode2 = () => {
    setStyleSelected2({
      backgroundColor: "red",
      fontSize: "30px",
    });
    setStyleSelected({
      backgroundColor: "beige",
    });
    setOption(2);
  };
  useEffect(() => {
    // cars
    fetch(endpoint + "/Car", {
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
        data.forEach((element) => {
          setCars((t) => [...t, element.registration]);
        });
      })
      .catch((Error) => console.error("Error en la solicitud", Error));
    // eslint-disable-next-line
  }, []);

  const setUnique = (array) => {
    let result = [];
    for (let index = 0; index < array.length; index++) {
      if (!result.includes(array[index])) result.push(array[index]);
    }
    return result;
  };

  const handleRegisterDriver = () => {
    const bodyy = {
      fn: firstName,
      sn: secondName,
      ln: lastName,
      alias: alias,
      ID: driver,
      car: car,
      user: user,
    };

    fetch(endpoint + "/Driver", {
      method: "POST",
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
        openPopup();
      })
      .catch((Error) => {
        console.error("Error en la solicitud", Error);
      });
  };

  const searchDrivers = () => {
    setDrivers([]);
    if (searchedID === "") {
      fetch(endpoint + "/Driver", {
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
          data.map((driver) => {
            return setDrivers((t) => [...t, driver]);
          });
        })
        .catch((Error) => console.error("Error en la solicitud", Error));
    } else {
      fetch(endpoint + "/Driver", {
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
          data.map((driver) => {
            if (driver.ID === Number(searchedID)) {
              return setDrivers((t) => [...t, driver]);
            }
            return setDrivers((t) => [...t]);
          });
        })
        .catch((Error) => console.error("Error en la solicitud", Error));
    }
    fillingPage();
  };

  const fillingPage = () => {
    if (drivers.length < 5) setFilling({ marginBottom: "45vh" });
  };
  switch (option) {
    case 1:
      return (
        <>
          <div className="frame2">
            <div style={{ textAlign: "center" }} className="Driver">
              <h1>Conductor</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <h3>Primer nombre:</h3>
                <input
                  style={{
                    height: "fit-content",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="Ingresa el primer nombre"
                  value={firstName}
                />
                <h3>Segundo nombre:</h3>
                <input
                  style={{
                    height: "fit-content",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  onChange={(e) => setSecondName(e.target.value)}
                  type="text"
                  placeholder="Ingresa el segundo nombre"
                  value={secondName}
                />
                <h3>Apellido:</h3>
                <input
                  style={{ height: "fit-content", marginLeft: "10px" }}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Ingresa el apellido"
                  value={lastName}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "fit-content",
                  marginLeft: "17vw",
                }}
              >
                <h3>Alias:</h3>
                <input
                  onChange={(e) => setAlias(e.target.value)}
                  type="text"
                  placeholder="Ingresa el apodo"
                  value={alias}
                />
                <h3>Cedula:</h3>
                <input
                  onChange={(e) => setDriver(e.target.value)}
                  type="text"
                  placeholder="Ingresa la identificación"
                  value={driver}
                />
                <h3>Vehiculo:</h3>
                <select onChange={(e) => setCar(e.target.value)}>
                  <option value="">Selecciona un Vehiculo </option>
                  {setUnique(cars).map((car) => {
                    return (
                      <option key={car} value={car}>
                        {car}
                      </option>
                    );
                  })}
                </select>
                <button
                  onClick={handleRegisterDriver}
                  style={{
                    marginTop: "50px",
                    backgroundColor: "beige",
                    borderRadius: "20px",
                  }}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>

          <div className="switcher">
            <div
              onClick={switchMode2}
              style={styleSelected2}
              className="square"
            >
              Buscar
            </div>
            <div onClick={switchMode} style={styleSelected} className="square">
              Registrar
            </div>
          </div>
          <Popup isOpen={isPopupOpen} onClose={closePopup}>
            Conductor registrado
          </Popup>
        </>
      );
    case 2:
      return (
        <>
          <div className="switcher">
            <div
              onClick={switchMode2}
              style={styleSelected2}
              className="square"
            >
              Buscar
            </div>
            <div onClick={switchMode} style={styleSelected} className="square">
              Registrar
            </div>
          </div>

          <div className="search">
            <span onClick={searchDrivers} className="search-icon"></span>
            <input
              onChange={(e) => setSearchedID(e.target.value)}
              placeholder="Ingresa la cedula"
              style={{
                fontSize: "30px",
                padding: "10px 10px 10px 35px",
                backgroundColor: "white",
              }}
            />
           
          </div>
          <div style={filling} className="searched-Drivers">
            <SearchDrivers
              endpoint={endpoint}
              user={user}
              setDesautorizacion={setDesautorizacion}
              drivers={drivers}
            />
          </div>
        </>
      );
    default:
  }
}
export default DriverPanel;
