import { useEffect, useState } from "react";
import moment from "moment";
function ControlPanel({ endpoint, setDesautorizacion, user }) {
  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [fees, setFees] = useState([]);
  const [diferencias, setDiferencias] = useState([]);

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

    // eslint-disable-next-line
  }, []);

  useEffect(()=>{

    setUniqueObject(drivers).forEach((driver)=>{
        isDriverOK(driver)
      });

  },[drivers])

  const setUnique = (array) => {
    let result = [];
    for (let index = 0; index < array.length; index++) {
      
      if (!result.includes(array[index])) {
        console.log(array[index]);
        result.push(array[index]);
      }
    }
    return result;
  };
  const setUniqueObject = (array) => {
    let result = [];
    let idlist = [];
    for (let index = 0; index < array.length; index++) {
      
      if (!idlist.includes(array[index].ID)) {
        idlist.push(array[index].ID)
        result.push(array[index]);
      }
    }
    return result;
  };
  const isDriverOK = (driver) => {
    const partes = driver.registered_at.split("T");
    const today = moment(new Date());
    const registeredat = moment(partes[0]);
    
    const paydays = registeredat.diff(today, "days");
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

    const diferencia =  payeddays - paydays;

    setDiferencias((t) => [...t, diferencia]);
  };
  const styles = (key) => {
    let result;
    if (diferencias[key] === 0) {
      result = { backgroundColor: "green" };
    } else {
      result = { backgroundColor: "red" };
    }
    return result;
  };
  return (
    <>
      <div className="Control-Panel">
        {setUniqueObject(drivers).map((driver, key) => {
          return (
            <div className="cuadro" style={styles(key)} key={driver.ID}>
              <h6>{driver.firstname}</h6>
              <h6>{driver.lastname}</h6>
              <h5>{driver.alias}</h5>
              <h6>{diferencias[key]}</h6>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default ControlPanel;
