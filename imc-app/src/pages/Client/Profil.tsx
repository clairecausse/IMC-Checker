import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { useLang } from "../../context/language";
import History from "./History";
import ConfirmDelete from "../../components/ConfirmDelete";
import "./Profil.css";

export default function Profil() {
  const { t } = useLang();
  const { token, logout, openAuthModal } = useAuthContext();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState("");

  async function deleteAccount() {
    setError("");

    try {
      const res = await fetch("http://localhost:3001/auth/me", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setError(t("profile.errors.delete"));
        return;
      }

      logout();
      navigate("/");
    } catch {
      setError(t("errors.server"));
    }
  }

  return (
    <div className="profil-container">
      <h1>{t("profile.title")}</h1>

      <section className="profil-auth-box">
        {token ? (
          <p className="profil-hello">{t("profile.hello")}</p>
        ) : (
          <>
            <p>{t("profile.notConnected")}</p>
            <button className="login-btn" onClick={openAuthModal}>
              {t("profile.loginAction")}
            </button>
          </>
        )}
      </section>

      <hr className="profil-separator" />

      <section className="profil-history">
        <h2>{t("profile.historyTitle")}</h2>
        <History hideTitle />
      </section>

      {token && (
        <>
          <hr className="profil-separator" />

          <div className="profil-actions">
            <button className="logout-btn" onClick={logout}>
              {t("auth.logout")}
            </button>

            <button
              className="logout-btn danger"
              onClick={() => setShowDeleteModal(true)}
            >
              {t("profile.deleteAccount")}
            </button>
          </div>
        </>
      )}

      {showDeleteModal && (
        <ConfirmDelete
          title={t("profile.deleteModal.title")}
          message={t("profile.deleteModal.message")}
          confirmLabel={t("profile.deleteModal.confirm")}
          cancelLabel={t("modal.close")}
          onConfirm={deleteAccount}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
