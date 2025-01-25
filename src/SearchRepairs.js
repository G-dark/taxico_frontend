import Card from "./Card";
import moment from "moment-timezone";
function SearchRepairs({ endpoint, user, setDesautorizacion, repairs }) {
  const repairLabels = [
    "Concepto",
    "Costo",
    "Vehiculo",
    "Fecha",
    "Registrado por",
    "Actualizado en",
    "Actualizado por"
  ];
  const types = ["text", "text", "text","text", "text", "text","text"];

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
      {repairs.length > 0 ? (
        repairs.map((repair) => {
          const repairValues = [
            repair.concept,
            repair.cost,
            repair.car,
            moment(repair.repair_date).tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss"),
            repair.registered_by,
            moment(repair.updated_at).tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss"),
            repair.updated_by,
          ];
          return (
            <Card
              key={repair.ID}
              user={user}
              ID={repair.ID}
              types={types}
              type="/Repair"
              values={repairValues}
              labels={repairLabels}
              endpoint={endpoint}
              setDesautorizacion={setDesautorizacion}
            />
          );
        })
      ) : (
        <h3 style={{marginBottom:"49vh"}}>No hay Reparaciones con esas caracteristicas</h3>
      )}
    </>
  );
}

export default SearchRepairs;
