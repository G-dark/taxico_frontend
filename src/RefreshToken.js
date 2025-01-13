import { useEffect, useState } from "react";
import Modal from "./Modal";

function RefreshToken({ desautorizacion, setDesautorizacion, endpoint }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (desautorizacion) {
      openModal();
    }
  }, [desautorizacion]);

  const login = async () => {
    const bodyy = { username: username, password: password };
    let log = false;
    try {
      const response = await fetch(endpoint + "/RefreshToken", {
        method: "POST",
        body: JSON.stringify(bodyy),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      log = await response.json();
      if (log && log !== false && log !== true) log = false;
     
    } catch (error) {
      console.error(error);
    }

    if (log) {
      setDesautorizacion(false);
      closeModal();
    }
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>Refrescar sesión</h1>
        <div style={{display:"flex", flexDirection:"column"}}>
        <h5>Usuario:</h5>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          value={username}
          placeholder="ingresa el usuario"
        />
        <h5>Contraseña:</h5>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="ingresa la contraseña"
        />

        <input
          style={{ marginTop: "25px" }}
          type="button"
          onClick={login}
          value="Ingresar"
        />
        </div>
       
      </Modal>
    </>
  );
}

export default RefreshToken;
