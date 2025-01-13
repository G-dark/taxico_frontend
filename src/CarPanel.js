import { useEffect, useState } from "react";

import Popup from "./Popup.js";
import SearchCars from "./SearchCars.js";

function CarPanel({ endpoint, user, setDesautorizacion }) {

  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);
 
  const [model, setModel] = useState("");
  const [driver, setDriver] = useState("");
  const [registration, setRegistration] = useState("");

 
  const [styleSelected, setStyleSelected] = useState({
    backgroundColor: "red",
    fontSize: "30px",
  });
  const [styleSelected2, setStyleSelected2] = useState({
    backgroundColor: "beige",
  });

  const [option, setOption] = useState(1);

  const [searchedRegist, setSearchedRegist] = useState("");

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
    // drivers
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
          data.forEach((element) => {
            setDrivers((t) => [...t, element.alias + "-" + element.ID]);
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

  const handleRegisterCar = () => {
    const partes = driver.split('-');
    const bodyy = {
      registration: registration,
      model: model,
      driver:partes[1],
    };

    fetch(endpoint + "/Car", {
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
  
  const searchCars = () => {
    setCars([]);
    if (searchedRegist === "") {
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
          data.map((car) => {
            return setCars((t) => [...t, car]);
          });
        })
        .catch((Error) => console.error("Error en la solicitud", Error));
    } else {
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
            data.map((car) => {
                if (car.registration === searchedRegist) {
                    return setCars((t) => [...t, car]);
                  }
                  return setCars((t) => [...t]);
              });
        })
        .catch((Error) => console.error("Error en la solicitud", Error));
    }
    fillingPage();
  };

  const fillingPage = () => {
    if (cars.length < 5) setFilling({ marginBottom: "45vh" });
  };
  switch (option) {
    case 1:
      return (
        <>
          <div className="frame4">
            <div style={{ textAlign: "center" }} className="Car">
              <h1>Vehiculo</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h3>Placa:</h3>
                <input
                  style={{
                    height: "fit-content",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  onChange={(e) => setRegistration(e.target.value)}
                  type="text"
                  placeholder="Ingresa la placa"
                  value={registration}
                />
              
                <h3>Modelo:</h3>
                <input
                  style={{
                    height: "fit-content",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  onChange={(e) => setModel(e.target.value)}
                  type="text"
                  placeholder="Ingresa el modelo"
                  value={model}
                /> 
              
              <h3>Conductor:</h3>
              <select onChange={(e) => setDriver(e.target.value)}>
                <option value="">Selecciona uno</option>
                {setUnique(drivers).map((driver, key) => {
                  return (
                    <option key={key} value={driver}>
                      {driver}
                    </option>
                  );
                })}
              </select>
                <button
                  onClick={handleRegisterCar}
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
            Vehiculo guardado
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
            <span onClick={searchCars} className="search-icon"></span>
            <input
            type="search"
              onChange={(e) => setSearchedRegist(e.target.value)}
              placeholder="SEL-394"
              style={{
                fontSize: "30px",
                padding: "10px 10px 10px 35px",
                backgroundColor: "white",
              }}
            />

          </div>
          <div style={filling} className="searched-Cars">
            <SearchCars
              endpoint={endpoint}
              user={user}
              setDesautorizacion={setDesautorizacion}
              cars={cars}
            />
          </div>
        </>
      );
    default:
  }
}
export default CarPanel;
