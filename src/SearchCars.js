import Card from "./Card";
import moment from "moment-timezone";
function SearchCars({ endpoint, user, setDesautorizacion, cars }) {
  const carLabels = [
    "Placa",
    "Modelo",
    "estatus",
    "Conductor",
    "Actualizado por",
    "Actualizado en",
  ];
  const types = ["text", "text", "text","text", "text", "text"];

  function datetimeToDate(date) {
    let newDate = null;
    if (date !== null) {
      const date2 = (date.replace("T", " ")).replace("Z", "");
      newDate = date2;
    }
    return newDate;
  }
  return (
    <>
      {cars.length > 0 ? (
        cars.map((car) => {
          const carValues = [
            car.registration,
            car.modelo,
            car._status ? "Activo":"Inactivo",
            car.taxidriver,
            car.updated_by,
            moment(car.updated_at).tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss")
          ];
          return (
            <Card
              key={car.registration}
              user={user}
              ID={car.registration}
              types={types}
              type="/Car"
              values={carValues}
              labels={carLabels}
              endpoint={endpoint}
              setDesautorizacion={setDesautorizacion}
            />
          );
        })
      ) : (
        <h3 style={{marginBottom:"49vh"}}>No hay Carros con esas caracteristicas</h3>
      )}
    </>
  );
}

export default SearchCars;
