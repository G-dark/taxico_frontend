import Card from "./Card";

function SearchFees({ endpoint, user, setDesautorizacion, fees }) {
  const feeLabels = [
    "Entregado por",
    "Monto",
    "Fecha de entrega",
    "Recibido por",
    "Vehiculo",
    "Actualizado en",
    "Actualizado por",
    "Corresponde a"
  ];
  const types = ["text", "text", "text","date"];

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
      {fees.length > 0 ? (
        fees.map((fee) => {
          const feeValues = [
            fee.delivered_by,
            fee.amount,
            datetimeToDate(fee.delivery_date),
            fee.received_by,
            fee.car,
            datetimeToDate(fee.updated_at),
            fee.updated_by,
            datetimeToDate(fee.fee_date),
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
