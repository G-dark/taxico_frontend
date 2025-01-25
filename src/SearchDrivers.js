import Card from "./Card";
import moment from "moment-timezone";

function SearchDrivers({ endpoint, user, setDesautorizacion, drivers }) {
  const driverLabels = [
    "Primer nombre",
    "Segundo nombre",
    "Apellido",
    "Alias",
    "Identificación",
    "Vehiculo",
    "estatus",
    "Registrado por",
    "Registrado en",
    "Deuda"
  ];
  const types = ["text", "text", "text","text", "text", "text","text"];


  return (
    <>
      {drivers.length > 0 ? (
        drivers.map((driver) => {
          const driverValues = [
            driver.firstname,
            driver.secondname,
            driver.lastname,
            driver.alias,
            driver.ID,
            driver.car,
            driver._status ? "Activo":"Inactivo",
            driver.registered_by,
            moment( driver.registered_at).tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss"),
            driver.deficit,
          ];
          return (
            <Card
              key={driver.ID}
              user={user}
              ID={driver.ID}
              types={types}
              type="/Driver"
              values={driverValues}
              labels={driverLabels}
              endpoint={endpoint}
              setDesautorizacion={setDesautorizacion}
            />
          );
        })
      ) : (
        <h3 style={{marginBottom:"49vh"}}>No hay Conductores con esas caracteristicas</h3>
      )}
    </>
  );
}

export default SearchDrivers;
