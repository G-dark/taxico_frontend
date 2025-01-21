import { useEffect, useState } from "react";

import SearchRepairs from "./SearchRepairs.js";
import Popup from "./Popup.js";

function RepairPanel({ endpoint, user, setDesautorizacion }) {
  const [cars, setCars] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [concept, setConcept] = useState("");
  const [car, setCar] = useState("");
  const [cost, setCost] = useState("");
 
  const [styleSelected, setStyleSelected] = useState({
    backgroundColor: "red",
    fontSize: "30px",
  });
  const [styleSelected2, setStyleSelected2] = useState({
    backgroundColor: "beige",
  });

  const [option, setOption] = useState(1);

  const [searchedDate, setSearchedDate] = useState("");
  const [beforeAfter,setBeforeAfter] = useState(true)
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
      mode: 'cors',
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

  const handleRegisterRepair = () => {
    const bodyy = {
      concept: concept,
      cost: cost,
      car: car,
      user: user,
    };

    fetch(endpoint + "/Repair", {
      method: "POST",
      body: JSON.stringify(bodyy),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      mode: 'cors',
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
  const changeTime = () =>{
    if(beforeAfter){
      setBeforeAfter(false);
    }else{
      setBeforeAfter(true)
    }
  }
  const searchRepairs = () => {
    setRepairs([]);
    if (searchedDate === "") {
      fetch(endpoint + "/Repair", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
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
          data.map((repair) => {
            return setRepairs((t) => [...t, repair]);
          });
        })
        .catch((Error) => console.error("Error en la solicitud", Error));
    } else {
      fetch(endpoint + "/Repair", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
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
            data.map((repair) => {
                const partes = repair.repair_date.split('T')
                const date1 = new Date(partes[0])
                const sdate = new Date(searchedDate)
                if(beforeAfter){
                  if(date1<=sdate){
                    return setRepairs((t) => [...t, repair]);
                  }
                } else{
                  if(date1>=sdate){
                    return setRepairs((t) => [...t, repair]);
                  }
                }
                return setRepairs((t) => [...t]) 
              });
        })
        .catch((Error) => console.error("Error en la solicitud", Error));
    }
    fillingPage();
  };

  const fillingPage = () => {
    if (repairs.length < 5) setFilling({ marginBottom: "45vh" });
  };
  switch (option) {
    case 1:
      return (
        <>
          <div className="frame3">
            <div style={{ textAlign: "center" }} className="Repair">
              <h1>Reparación</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h3>Concepto:</h3>
                <textarea
                rows="5"
                cols="33"
                  style={{
                    height: "fit-content",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  onChange={(e) => setConcept(e.target.value)}
                  type="text"
                  placeholder="Concepto de la reparación"
                  value={concept}
                > </textarea>
                <h3>Costo:</h3>
                <input
                  style={{
                    height: "fit-content",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  onChange={(e) => setCost(e.target.value)}
                  type="text"
                  placeholder="Ingresa el costo"
                  value={cost}
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
                  onClick={handleRegisterRepair}
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
            Reparación guardada
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
            <span onClick={searchRepairs} className="search-icon"></span>
            <input
            type="search"
              onChange={(e) => setSearchedDate(e.target.value)}
              placeholder="YYYY-MM-DD"
              style={{
                fontSize: "30px",
                padding: "10px 10px 10px 35px",
                backgroundColor: "white",
              }}
            />
           <button onClick={changeTime}>{beforeAfter ? "Antes" : "Despues"}</button>
          </div>
          <div style={filling} className="searched-Repairs">
            <SearchRepairs
              endpoint={endpoint}
              user={user}
              setDesautorizacion={setDesautorizacion}
              repairs={repairs}
            />
          </div>
        </>
      );
    default:
  }
}
export default RepairPanel;
