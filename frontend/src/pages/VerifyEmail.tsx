import { t } from "../i18n";
import { useEffect, useState } from "react";
import { api, type User } from "../api";
import { Icon } from "../components/Icon";

/** Shown after sign-up until the user opens the link we emailed them. */
export function CheckInbox({
  user,
  onVerified,
  onSignedOut,
}: {
  user: User;
  onVerified: (user: User) => void;
  onSignedOut: () => void;
}) {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  // Notice when the link was opened in another tab.
  useEffect(() => {
    const check = () =>
      api
        .me()
        .then((me) => me.verified && onVerified(me))
        .catch(() => {});
    window.addEventListener("focus", check);
    return () => window.removeEventListener("focus", check);
  }, [onVerified]);

  const resend = async () => {
    setError("");
    setNote("");
    try {
      await api.resend();
      setNote("Sent. Check your inbox and your spam folder.");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const local = ["localhost", "127.0.0.1"].includes(location.hostname);

  return (
    <div className="signin">
      <div className="glass block stack signin-card">
        <span className="burst small-burst">
          <Icon name="mail" size={26} />
        </span>
        <h1>{t("Check your inbox.")}</h1>
        <p>
          {t("Hello")} {user.full_name}
          {t(". We sent a link to")} <strong>{user.email}</strong>
          {t(". Open it to confirm your email address and start.")}
        </p>
        {local && (
          <p className="muted small">
            {t(
              "Running on your own computer? The email is in the local inbox at",
            )}{" "}
            <a
              className="link"
              href={`${location.protocol}//${location.hostname}:8025`}
              target="_blank"
              rel="noreferrer"
            >
              {t("port 8025 ↗")}
            </a>
            .
          </p>
        )}
        <div className="row-gap">
          <button className="btn" onClick={resend}>
            {t("Send the link again")}
          </button>
          <button
            className="btn"
            onClick={() =>
              api
                .me()
                .then((me) =>
                  me.verified ? onVerified(me) : setNote("Not confirmed yet."),
                )
            }
          >
            {t("I have confirmed")}
          </button>
        </div>
        {note && <p className="toast">{note}</p>}
        {error && <p className="error">{error}</p>}
        <button
          className="ghost link"
          onClick={async () => {
            await api.logout();
            onSignedOut();
          }}
        >
          {t("Use another account")}
        </button>
      </div>
    </div>
  );
}

/** The page the emailed link opens. */
export function VerifyLink({
  token,
  onDone,
}: {
  token: string;
  onDone: (user: User | null) => void;
}) {
  const [error, setError] = useState("");
  useEffect(() => {
    api
      .verify(token)
      .then(() =>
        api.me().then(
          (me) => onDone(me),
          () => onDone(null),
        ),
      )
      .catch((e) => setError((e as Error).message));
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="signin">
      <div className="glass block stack signin-card">
        <h1>
          {error ? t("This link did not work.") : t("Confirming your email…")}
        </h1>
        {error && (
          <>
            <p className="error">{error}</p>
            <a className="btn" href="#/">
              {t("Go to sign in")}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
