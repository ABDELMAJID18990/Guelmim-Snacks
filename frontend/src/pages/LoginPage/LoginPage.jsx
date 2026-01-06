import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../store/authSlice";

import SimpleHeader from "../../components/layout/SimpleHeader/SimpleHeader";
import Input from "../../components/ui/Input/Input";
import styles from "./LoginPage.module.css";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import illustration from "../../assets/images/login-illustration.jpg";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();

      
      const userRole = result.user.role;

      if (userRole === "manager") {
        navigate("/dashboard/orders");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Échec de la connexion: ", err);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <SimpleHeader />
      <div className={styles.content}>
        <div className={styles.illustrationSide}>
          <img
            src={illustration}
            alt="Illustration de commande de nourriture"
          />
        </div>
        <div className={styles.formSide}>
          <div className={styles.formContainer}>
            <h1>Bon retour parmi nous !</h1>
            {status === "failed" && (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <Input
                  icon={<FiMail />}
                  type="email"
                  placeholder="Adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <Input
                  icon={<FiLock />}
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className={styles.forgotPassword}>
                <Link to="#">Mot de passe oublié ?</Link>
              </div>
            

            <div className={styles.roleActionButtons}>
              <button
                type="submit"
                className={`${styles.actionButton} ${styles.primaryButton}`}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  "Connexion en cours..."
                ) : (
                  <>
                    <FiLogIn style={{ marginRight: '8px' }} /> Se connecter
                  </>
                )}
              </button>
            </div>
            </form>

            <div className={styles.separator}>Ou</div>

            <div className={styles.socialLogin}>
              <button className={styles.socialButton} type="button">
                <FaGoogle /> Continuer avec Google
              </button>
              <button className={styles.socialButton} type="button">
                <FaFacebookF /> Continuer avec Facebook
              </button>
            </div>

            <div className={styles.signUpLink}>
              <p>
                Vous n'avez pas de compte ?{" "}
                <Link to="/register">S'inscrire</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
