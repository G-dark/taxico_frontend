import { useEffect, useState } from "react";
import moment from "moment";
function ControlDriver({ endpoint, driver, setDesautorizacion, user, setOption }) {
  const [fees, setFees] = useState([]);
  const [today, setToday] = useState("");
  const [days, setDays] = useState([]);
  const [month, setMonth] = useState(0);
  const [driverS, setDriver] = useState([]);
  const [date, setNdate] = useState([]);
  const [id, setId] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  let numberOfDays = [
    31,
    moment(new Date()).isLeapYear() ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  useEffect(() => {
    const partes = new Date(Date.now()).toLocaleString().split(",");
    const partes2 = partes[0].split("/");
    const newdate = new Date(year, id, Number(partes2[0]));
    setNdate([]);
    setNdate((t) => [...t, newdate]);
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    const partes = new Date(Date.now()).toLocaleString().split(",");
    const partes2 = partes[0].split("/");
    setToday(partes2[2] + "/" + partes2[1] + "/" + partes2[0]);

    if (date[0] !== undefined) {
      setDays([]);
      setMonth(date[0].getMonth());
      for (let index = 1; index <= numberOfDays[date[0].getMonth()]; index++) {
        
        setDays((t) => [...t, year + "/" + Number(id + 1) + "/" + index]);
      }
    }
    // eslint-disable-next-line
  }, [date]);
  useEffect(() => {
    fetch(endpoint + "/Driver/" + driver, {
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
          if (element._status) {
            setDriver((t) => [...t, element]);
          }
          setDriver((t) => [...t]);
        });
      })
      .catch((Error) => console.error("Error en la solicitud", Error));
    // Tarifas
    fetch(endpoint + "/Fee", {
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
          if (element.delivered_by === driver) {
            setFees((t) => [...t, element]);
          }
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

  const dayOfTheWeek = (day) => {
    if (day === 0) return "Lunes";
    if (day === 1) return "Martes";
    if (day === 2) return "Miercoles";
    if (day === 3) return "Jueves";
    if (day === 4) return "Viernes";
    if (day === 5) return "Sabado";
    if (day === -1) return "Domingo";
  };

  const MonthOfTheYear = (month) => {
    if (month === 0) return "Enero";
    if (month === 1) return "Febrero";
    if (month === 2) return "Marzo";
    if (month === 3) return "Abril";
    if (month === 4) return "Mayo";
    if (month === 5) return "Junio";
    if (month === 6) return "Julio";
    if (month === 7) return "Agosto";
    if (month === 8) return "Septiembre";
    if (month === 9) return "Octubre";
    if (month === 10) return "Noviembre";
    if (month === 11) return "Diciembre";
  };
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
  const dayStyles = (day) => {
    let style = {};
    let stylnull = true;
    const uniqueFees = setUniqueObject(fees);
    for (let index = 0; index < uniqueFees.length; index++) {
      const fee_date = uniqueFees[index].fee_date.split("T")[0].split("-");
      const fecha = fee_date[0] + "/" + fee_date[1] + "/" + fee_date[2];

      if (
        new Date(fecha).getDate() === new Date(day).getDate() &&
        new Date(fecha).getMonth() === new Date(day).getMonth() &&
        new Date(day).getFullYear() ===  new Date(fecha).getFullYear()
      ) {
        if (!uniqueFees[index].rest) {
          style = { backgroundColor: "Green" };
        } else {
          style = { backgroundColor: "Gray" };
        }

        stylnull = false;
      }
    }
    const dia = moment(day);

    if (
      new Date(day).getDate() === new Date(today).getDate() &&
      new Date(day).getMonth() === new Date(today).getMonth() &&
      new Date(day).getFullYear() ===  new Date(today).getFullYear()
    ) {
      style = { backgroundColor: "blueviolet" };
      stylnull = false;
    }

    if (driverS[0] !== undefined) {
      const part = driverS[0].registered_at.split("T");
      const registrado = moment(part[0]);

      if (dia.diff(registrado, "days") === 0) {
        style = { backgroundColor: "yellowgreen" };
        stylnull = false;
      }

      if (
        stylnull &&
        dia.isSameOrAfter(registrado) &&
        dia.isSameOrBefore(moment(today))
      ) {
        style = { backgroundColor: "red" };
      }
    }

    return style;
  };
  return (
    <>
      <div className="driverControl-Panel">
        <span onClick={()=>setOption(0)} className="Left-Arrow"></span>
        <h1 style={{ position: "absolute", left: "35vw", top: "13vh" }}>
          {MonthOfTheYear(month)}
        </h1>
        <h4 style={{ position: "absolute", left: "36.5vw", top: "18vh" }}>
          {year}
        </h4>
        <div className="box-days">
          {setUnique(days)
            .slice(0, 7)
            .map((day) => {
              return (
                <div
                  style={{ position: "relative", top: "0vh", left: "23.4vw" }}
                  key={day}
                >
                  <div style={dayStyles(day)} className="Day">
                    <div className="dayweek">
                      {dayOfTheWeek(new Date(day).getDay() - 1)}
                    </div>
                    {new Date(day).getDate()}
                  </div>
                  <br />
                </div>
              );
            })}

          {setUnique(days)
            .slice(7, 14)
            .map((day, index) => {
              return (
                <div
                  style={{
                    position: "relative",
                    marginTop: "90px",
                    left: "-2.9vw",
                  }}
                  key={index}
                >
                  <div style={dayStyles(day)} className="Day">
                    <div className="dayweek">
                      {dayOfTheWeek(new Date(day).getDay() - 1)}
                    </div>
                    {new Date(day).getDate()}
                  </div>
                </div>
              );
            })}

          {setUnique(days)
            .slice(14, 21)
            .map((day, key) => {
              return (
                <div
                  style={{
                    position: "relative",
                    marginTop: "180px",
                    left: "-29.2vw",
                  }}
                  key={key}
                >
                  <div style={dayStyles(day)} className="Day">
                    <div className="dayweek">
                      {dayOfTheWeek(new Date(day).getDay() - 1)}
                    </div>
                    {new Date(day).getDate()}
                  </div>
                </div>
              );
            })}

          {setUnique(days)
            .slice(21, 28)
            .map((day, key) => {
              return (
                <div
                  style={{
                    position: "relative",
                    marginTop: "270px",
                    left: "-55.5vw",
                  }}
                  key={key}
                >
                  <div style={dayStyles(day)} className="Day">
                    <div className="dayweek">
                      {dayOfTheWeek(new Date(day).getDay() - 1)}
                    </div>
                    {new Date(day).getDate()}
                  </div>
                </div>
              );
            })}

          {setUnique(days)
            .slice(28, 35)
            .map((day, key) => {
              return (
                <div
                  style={{
                    position: "relative",
                    marginTop: "360px",
                    left: "-81.8vw",
                  }}
                  key={key}
                >
                  <div style={dayStyles(day)} className="Day">
                    <div className="dayweek">
                      {dayOfTheWeek(new Date(day).getDay() - 1)}
                    </div>
                    {new Date(day).getDate()}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="Conventions">
          <div
            style={{
              position: "relative",
              marginTop: "0px",
              backgroundColor: "blueviolet",
              width: "fit-content",
              padding: "20px",
            }}
          >
            Hoy
          </div>
          <div
            style={{
              position: "relative",
              marginTop: "0px",
              backgroundColor: "yellowgreen",
              width: "fit-content",
              padding: "20px",
            }}
          >
            Registrado
          </div>

          <div
            style={{
              position: "relative",
              marginTop: "0px",
              backgroundColor: "green",
              width: "fit-content",
              padding: "20px",
            }}
          >
            Pagado
          </div>

          <div
            style={{
              position: "relative",
              marginTop: "0px",
              backgroundColor: "red",
              width: "fit-content",
              padding: "20px",
            }}
          >
            Debe
          </div>
        </div>

        <span
          onClick={() => {
            if (id === 0) {
              setId(11);
              setYear((t) => t - 1);
            } else {
              setId((t) => t - 1);
            }
          }}
          className="Up-Arrow"
        ></span>
        <span
          onClick={() => {
            if (id === 11) {
              setId(0);
              setYear((t) => t + 1);
            } else {
              setId((t) => t + 1);
            }
          }}
          className="Down-Arrow"
        ></span>

        <div className="license">
          <h1 style={{ position: "absolute", top: "3.8vh", left: "1vw" }}>.</h1>
          {setUniqueObject(driverS).map((driver) => {
            return (
              <div style={{ fontSize: "100px" }} key={driver.ID}>
                {driver.car}
              </div>
            );
          })}
          <h1 style={{ position: "absolute", top: "3.8vh", left: "20vw" }}>
            .
          </h1>
        </div>

        <div className="driver">
          <span style={{ marginRight: "40px" }} className="user-icon"></span>
          {setUniqueObject(driverS).map((driver) => {
            return (
              <div
                style={{
                  fontSize: "10px",
                  display: "flex",
                  flexDirection: "row",
                }}
                key={driver.ID}
              >
                <div
                  style={{
                    fontSize: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h4>
                    Nombre:{driver.firstname} {driver.secondname}
                  </h4>
                  <h4>Apellido:{driver.lastname}</h4>
                  <h4>Identificación:{driver.ID}</h4>
                  <h4>Alias: {driver.alias}</h4>
                  <h4>Deuda:{driver.deficit}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default ControlDriver;
