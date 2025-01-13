import { useEffect,useState } from "react";
function ControlDriver({ driver, setDesautorizacion, user }) {
    const [fees, setFees] = useState([]);
    useEffect(() => {
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
    
      const setUnique = (array) => {
        let result = [];
        for (let index = 0; index < array.length; index++) {
          if (!result.includes(array[index])) result.push(array[index]);
        }
        return result;
      };

  return <></>;
}
export default ControlDriver;