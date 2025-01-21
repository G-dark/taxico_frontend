import "./App.css";
import { useState } from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import FeePanel from "./FeePanel";
import Login from "./Login";
import RefreshToken from "./RefreshToken";
import DriverPanel from "./DriverPanel";
import RepairPanel from "./RepairPanel";
import CarPanel from "./CarPanel";
import ControlPanel from "./ControlPanel";

function App() {
  //http://localhost:3010/API  http://taxico.up.railway.app/API
  const [option, setOption] = useState("login");
  const [endpoint] = useState("https://taxico.up.railway.app/API");
  const [user, setUser] = useState("");
  const [desautorizacion, setDesautorizacion] = useState(false);
  switch (option) {
    case "login":
      return (
        <>
          <div className="App">
            <Login
              endpoint={endpoint}
              setOption={setOption}
              setUser={setUser}
            />
          </div>
        </>
      );

    case "":
      return (
        <>
          <div className="App">
            <Navbar setOption={setOption} />
            <ControlPanel
              endpoint={endpoint}
              user={user}
              setDesautorizacion={setDesautorizacion}
            />
            <RefreshToken
              desautorizacion={desautorizacion}
              setDesautorizacion={setDesautorizacion}
              endpoint={endpoint}
            />
            <Footer />
          </div>
        </>
      );
    // Tarifas
    case "1":
      return (
        <>
          <div className="App">
            <Navbar setOption={setOption} />
            <FeePanel
              endpoint={endpoint}
              user={user}
              setDesautorizacion={setDesautorizacion}
            />
            <RefreshToken
              desautorizacion={desautorizacion}
              setDesautorizacion={setDesautorizacion}
              endpoint={endpoint}
            />
            <Footer />
          </div>
        </>
      );
    //Taxistas
    case "2":
      return (
        <>
          <div className="App">
            <Navbar setOption={setOption} />
            <DriverPanel
              endpoint={endpoint}
              user={user}
              setDesautorizacion={setDesautorizacion}
            />
            <RefreshToken
              desautorizacion={desautorizacion}
              setDesautorizacion={setDesautorizacion}
              endpoint={endpoint}
            />
            <Footer />
          </div>
        </>
      );
    //Reparaciones
    case "3":
      return (
        <>
          <div className="App">
            <Navbar setOption={setOption} />
            <RepairPanel
              endpoint={endpoint}
              user={user}
              setDesautorizacion={setDesautorizacion}
            />
            <RefreshToken
              desautorizacion={desautorizacion}
              setDesautorizacion={setDesautorizacion}
              endpoint={endpoint}
            />
            <Footer />
          </div>
        </>
      );
    //Vehiculos
    case "4":
      return (
        <>
          <div className="App">
            <Navbar setOption={setOption} />
            <CarPanel
              endpoint={endpoint}
              user={user}
              setDesautorizacion={setDesautorizacion}
            />
            <RefreshToken
              desautorizacion={desautorizacion}
              setDesautorizacion={setDesautorizacion}
              endpoint={endpoint}
            />
            <Footer />
          </div>
        </>
      );
    default:
  }
}

export default App;
