import { useEffect, useState } from "react";
import SearchFees from "./SearchFees";
import Popup from "./Popup";

function FeePanel({ endpoint, user, setDesautorizacion }) {
  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState("");
  const [car, setCar] = useState("");
  const [amount, setAmount] = useState("");
  const [styleSelected, setStyleSelected] = useState({
    backgroundColor: "red",
    fontSize: "30px",
  });
  const [styleSelected2, setStyleSelected2] = useState({
    backgroundColor: "beige",
  });

  const [option, setOption] = useState(1);
  const [fees, setFees] = useState([]);
  const [searchedDate, setSearchedDate] = useState("");
  const [daycor, setDaycor] = useState("");
  const [beforeAfter,setBeforeAfter] = useState(true);
  const [isPopupOpen,setPopupOpen]= useState(false);
  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);
  const [filling, setFilling] = useState({});

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

  const handleRegisterFee = () => {
    const partes = driver.split("-");
    const bodyy = {
      taxidriver: partes[1],
      amount: amount,
      car: car,
      user: user,
      date:daycor,
    };

    fetch(endpoint + "/Fee", {
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
  const changeTime = () =>{
    if(beforeAfter){
      setBeforeAfter(false);
    }else{
      setBeforeAfter(true)
    }
  }
  const searchFee = () => {
    setFees([]);
    if(searchedDate===""){
      fetch(endpoint + "/Fee", {
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
          data.map((fee) => {
            return setFees((t) => [...t, fee]);
          });
        })
        .catch((Error) => console.error("Error en la solicitud", Error));
    } else{
      fetch(endpoint + "/Fee", {
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
          data.map((fee) => {
            const partes = fee.delivery_date.split('T')
            const date1 = new Date(partes[0])
            const sdate = new Date(searchedDate)
            if(beforeAfter){
              if(date1<=sdate){
                return setFees((t) => [...t, fee]);
              }
            } else{
              if(date1>=sdate){
                return setFees((t) => [...t, fee]);
              }
            }
            return setFees((t) => [...t]) 
          });
        })
        .catch((Error) => console.error("Error en la solicitud", Error));
    }
   fillingPage();
  };
  const fillingPage = () => {
    if (fees.length < 5) setFilling({ marginBottom: "45vh" });
  };
  switch (option) {
    case 1:
      return (
        <>
          <div className="frame">
            <div style={{ textAlign: "center" }} className="Fee">
              <h1>Tarifa</h1>
              <h3>Monto:</h3>
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                placeholder="Ingresa el monto"
                value={amount}
              />
              <h3>Vehiculo:</h3>
              <select onChange={(e) => setCar(e.target.value)}>
                <option value="">Selecciona uno</option>
                {setUnique(cars).map((car) => {
                  return (
                    <option key={car} value={car}>
                      {car}
                    </option>
                  );
                })}
              </select>
              <h3>Entregado por:</h3>
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

              <h3>Corresponde a:</h3>
              <input
                onChange={(e) => setDaycor(e.target.value)}
                type="date"
                value={daycor}
              />

              <button
                onClick={handleRegisterFee}
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
            Nueva tarifa registrada
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
            <span onClick={searchFee} className="search-icon"></span>
            <input onChange={(e)=>setSearchedDate(e.target.value)} placeholder="YYYY-MM-DD"
              style={{
                fontSize: "30px",
                padding: "10px 10px 10px 35px",
                backgroundColor: "white",
              }}
            />
            <button onClick={changeTime}>{beforeAfter ? "Antes" : "Despues"}</button>
          </div>
          <div style={filling} className="searched-Fees">
          <SearchFees
            endpoint={endpoint}
            user={user}
            setDesautorizacion={setDesautorizacion}
            fees={fees}
          />
          </div>
        </>
      );
    default:
  }
}
export default FeePanel;
