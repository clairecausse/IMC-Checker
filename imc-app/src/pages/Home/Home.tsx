import Calculator from "./Calculator";
import InfoImc from "./InfoImc";
import Partners from "./Partners";
import logo from "../../assets/logo.png";
import "../Pages.css";

const Home = () => {
  return (
    <div>
      <img src={logo} alt="Logo" style={{ maxWidth: "200px", margin: "2rem auto", display: "block" }} />
      <h1>Accueil</h1>
      <Calculator />
      <InfoImc />
      <Partners />
    </div>
  );
};

export default Home;
