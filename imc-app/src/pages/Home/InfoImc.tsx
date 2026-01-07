import { useLang } from "../../context/language";

const InfoImc = () => {
  const { t } = useLang();

  return (
    <div>
      <div>
        <h2>{t("infoImc.title")}</h2>
        <p>{t("infoImc.description")}</p>
      </div>

      <div>
        <a
          href="https://fr.wikipedia.org/wiki/Indice_de_masse_corporelle"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("infoImc.link")}
        </a>
      </div>
    </div>
  );
};

export default InfoImc;
