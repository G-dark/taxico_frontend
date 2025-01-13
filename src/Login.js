import { useState } from "react";
import Modal from "./Modal";
function Login({ endpoint, setOption, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen,setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const login = async () => {
    const bodyy = { username: username, password: password };
    let log = false;
    try {
      const response = await fetch(endpoint + "/log", {
        method: "POST",
        body: JSON.stringify(bodyy),
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
      });
      log = await response.json()
      if(log && log !== false && log !== true) log = false
    } catch (error) {
      console.error(error);
    }

    if (log) {
      setOption("");
      setUser(username);
    }else{
        openModal()
    }
  };

  return (
    <>
      <div className="boxouter-login">
        <div style={{ border: "2px yellow solid" }}>
          <div className="box-login">
            <span className="user-icon"></span>
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
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>Usuario o contraseña incorrecta</h1>
      </Modal>
    </>
  );
}

export default Login;
