import Calculator from "./Calculator";
import InfoImc from "./InfoImc";
import logo from "../../assets/logo.png";
import "../Pages.css";
import { useLang } from "../../context/language";

const Home = () => {
  const { t } = useLang();

  return (
    <div>
      <img
        src={logo}
        alt={t("common.logoAlt")}
        style={{
          maxWidth: "200px",
          margin: "2rem auto",
          display: "block",
        }}
      />

      <h1>{t("home.title")}</h1>

      <Calculator />
      <InfoImc />
    </div>
  );
};

export default Home;
