import { useLang } from "../../context/language";

export default function RgpdInfo() {
  const { t } = useLang();

  return (
    <div>
      <h2>{t("rgpdInfo.title")}</h2>

      <p>{t("rgpdInfo.intro")}</p>

      <div>
        <h3>{t("rgpdInfo.data.title")}</h3>
        <ul>
          <li>{t("rgpdInfo.data.heightWeight")}</li>
          <li>{t("rgpdInfo.data.results")}</li>
        </ul>
      </div>

      <div>
        <h3>{t("rgpdInfo.processing.title")}</h3>
        <ul>
          <li>{t("rgpdInfo.processing.client")}</li>
          <li>{t("rgpdInfo.processing.noServer")}</li>
          <li>{t("rgpdInfo.processing.delete")}</li>
        </ul>
      </div>

      <div>
        <h3>{t("rgpdInfo.consent.title")}</h3>
        <p>{t("rgpdInfo.consent.text")}</p>
      </div>
    </div>
  );
}
