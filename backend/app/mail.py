"""Outgoing email. Uses SMTP when a host is configured; otherwise logs the message and keeps it
in OUTBOX, so development and tests work without a mail server."""

import logging
import smtplib
from email.message import EmailMessage

from app.config import settings

log = logging.getLogger("uvicorn.error")
OUTBOX: list[EmailMessage] = []


class MailError(Exception):
    """The email could not be sent; the message is safe to show the user."""


def send(to: str, subject: str, body: str) -> None:
    message = EmailMessage()
    message["From"] = settings.mail_from
    message["To"] = to
    message["Subject"] = subject
    message.set_content(body)
    if not settings.smtp_host:
        OUTBOX.append(message)
        log.info("Email to %s (no SMTP host set, not sent):\n%s", to, body)
        return
    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as smtp:
            if settings.smtp_starttls:
                smtp.starttls()
            if settings.smtp_user:
                smtp.login(settings.smtp_user, settings.smtp_password)
            smtp.send_message(message)
    except (OSError, smtplib.SMTPException) as e:
        log.warning("Could not send email to %s: %s", to, e)
        raise MailError("We could not send the email; try again in a minute.") from e
