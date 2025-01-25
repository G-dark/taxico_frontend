import Card from "./Card";
import moment from "moment-timezone";
function SearchFees({ endpoint, user, setDesautorizacion, fees }) {
  const feeLabels = [
    "Entregado por",
    "Monto",
    "Fecha de entrega",
    "Recibido por",
    "Vehiculo",
    "Actualizado en",
    "Actualizado por",
    "Corresponde a",
    "Descanso"
  ];
  const types = ["text", "text", "text","date","text"];

  return (
    <>
      {fees.length > 0 ? (
        fees.map((fee) => {
          const feeValues = [
            fee.delivered_by,
            fee.amount,
            moment(fee.delivery_date).tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss"),
            fee.received_by,
            fee.car,
            moment(fee.update_at).tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss"),
            fee.updated_by,
            moment(fee.fee_date).tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss"),
            fee.rest? "Sí":"No",
          ];
          return (
            <Card
              key={fee.ID}
              user={user}
              ID={fee.ID}
              types={types}
              type="/Fee"
              values={feeValues}
              labels={feeLabels}
              endpoint={endpoint}
              setDesautorizacion={setDesautorizacion}
            />
          );
        })
      ) : (
        <h3 style={{marginBottom:"49vh"}}>No hay tarifas con esas caracteristicas</h3>
      )}
    </>
  );
}

export default SearchFees;
