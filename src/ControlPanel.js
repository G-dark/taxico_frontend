import { useEffect, useState } from "react";
import moment from "moment";
import Carrusel from "./Carrusel";
import taxi2 from "../src/assets/images/taxi2.jpeg";
import taxi3 from "../src/assets/images/taxi3.png";
import taxi4 from "../src/assets/images/taxi4.jpg";
import ControlDriver from "./ControlDriver";

function ControlPanel({ endpoint, setDesautorizacion, user }) {
  const [drivers, setDrivers] = useState([]);
  const [diff, setDiff] = useState([]);
  const [fees, setFees] = useState([]);
  const [carFees, setCarFees] = useState([]);
  let diferencias = [];
  const [option, setOption] = useState(0);
  const [driverSelected,setDriverSelected] = useState(0) ;
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
          if (element._status) {
            setDrivers((t) => [...t, element]);
          }
          setDrivers((t) => [...t]);
        });
      })
      .catch((Error) => console.error("Error en la solicitud", Error));

    // Tarifas
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
        data.forEach((element) => {
          setFees((t) => [...t, element]);
        });
      })
      .catch((Error) => console.error("Error en la solicitud", Error));

    fetch(endpoint + "/CarFee", {
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
          setCarFees((t) => [...t, element]);
        });
      })
      .catch((Error) => console.error("Error en la solicitud", Error));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setUniqueObject(drivers).forEach((driver) => {
      isDriverOK(driver);
    });
    // eslint-disable-next-line
    diferencias = setUniqueObject(diferencias);

    diferencias.forEach((element) => {
      setDiff((t) => [...t, element.diferencia]);
    });

    // eslint-disable-next-line
  }, [fees]);



  const setUniqueObject = (array) => {
    let result = [];
    let idlist = [];
    for (let index = 0; index < array.length; index++) {
      if (!idlist.includes(array[index].ID)) {
        idlist.push(array[index].ID);
        result.push(array[index]);
      }
    }
    return result;
  };
  const isDriverOK = (driver) => {
    if (driver !== null && driver !== undefined) {
      const partes = driver.registered_at.split("T");
      const today = moment(new Date());
      const registeredat = moment(partes[0]);

      const paydays = today.diff(registeredat, "days");

      let payeddays = 0;
      let Fees = setUniqueObject(fees);
      for (let index = 0; index < Fees.length; index++) {
        if (
          Fees[index].car === driver.car &&
          Fees[index].delivered_by === driver.ID
        ) {
          payeddays += 1;
        }
      }
      const diferencia = payeddays - paydays;
      diferencias.push({ ID: driver.ID, diferencia: diferencia });
    }
  };
  const styles = (key) => {
    let result;
    if (diff[key] === 0) {
      result = { backgroundColor: "green" };
    } else {
      result = { backgroundColor: "red" };
    }
    return result;
  };

  const styles2 = (key,balance) => {
    let result;
    if (balance >= 0) {
      result = { backgroundColor: "green" };
    } else {
      result = { backgroundColor: "red" };
    }
    return result;
  };

  switch (option) {
    case 0:
      return (
        <>
          <Carrusel image={taxi2} image2={taxi3} image3={taxi4} />

          <h3
            style={{
              textAlign: "start",
              marginBottom: "4vh",
              backgroundColor: "beige",
            }}
          >
            Control de tarifas de conductores
          </h3>
          <div className="Control-Panel-1">
            {setUniqueObject(drivers).map((driver, key) => {
              return (
                <div
                  onClick={() => {
                    setOption(1);
                    setDriverSelected(driver.ID);
                  }}
                  className="cuadro"
                  style={styles(key)}
                  key={driver.ID}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <h5 style={{ marginRight: "10px" }}>{driver.firstname}</h5>
                    <h5 style={{ marginRight: "10px" }}>{driver.lastname}</h5>
                  </div>

                  <h6 style={{ marginRight: "10px" }}>Debe: {diff[key]}</h6>
                  <h6>Deuda: {driver.deficit}</h6>
                </div>
              );
            })}
          </div>
          <h3
            style={{
              textAlign: "start",
              marginBottom: "4vh",
              backgroundColor: "beige",
            }}
          >
            Control de Ganancias
          </h3>
          <div className="Control-Panel-2">
            {carFees.length > 0 ? setUniqueObject(carFees).map((carfee, key) => {
              return (
                <div className="cuadro" style={styles2(key,carfee.residuo)} key={carfee.car}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <h5 style={{ marginRight: "10px" }}>{carfee.car}</h5>
                    <h6 style={{ marginRight: "10px" }}>
                      
                      Ganancia: {carfee.gain}
                    </h6>
                  </div>

                  <h6 style={{ marginRight: "10px" }}>
                    Reparaciones: {carfee.maintenance}
                  </h6>
                  <h6>Balance: {carfee.residuo}</h6>
                </div>
              );
            }):<h3>No hay elementos a mostrar</h3>}
          </div>
        </>
      );
    case 1:
      return (
        <ControlDriver
          driver={driverSelected}
          endpoint={endpoint}
          setDesautorizacion={setDesautorizacion}
          user={user}
          setOption={setOption}
        />
      );
    default:
  }
}
export default ControlPanel;
