FROM python:3.12-slim

RUN pip install --no-cache-dir 'piper-tts[http]==1.8.0'
COPY download_models.py /app/download_models.py
RUN python /app/download_models.py /voices

HEALTHCHECK --interval=5s --timeout=3s --start-period=15s --retries=12 CMD python -c "from urllib.request import urlopen; urlopen('http://127.0.0.1:5000/info', timeout=2).close()"

CMD ["python", "-m", "piper.http_server", "-m", "en_US-joe-medium", "--data-dir", "/voices", "--host", "0.0.0.0", "--port", "5000"]
