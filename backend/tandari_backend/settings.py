import os
from pathlib import Path
import dj_database_url
from dotenv import load_dotenv

# 1. Initialize environment
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(os.path.join(BASE_DIR, ".env"))

# 2. Security Settings
# Use an environment variable in production, fallback to your dev key locally
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "dev-only-change-before-production")
DEBUG = os.environ.get("DEBUG", "False") == "True"

# In production, this should be ["your-app.onrender.com", "yourdomain.com"]
ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "127.0.0.1,localhost").split(",")

# 3. Application Definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third party
    "corsheaders", 
    # Your Apps
    "company",
    "core",
    "accounts",
    "employees",
    "projects",
    "inquiries",
    "payments",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware", # High as possible
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware", # For static files in prod
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "tandari_backend.urls"

# 4. Neon Database Configuration
# This logic automatically uses Neon if DATABASE_URL is set, otherwise SQLite.
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL', f"sqlite:///{BASE_DIR / 'db.sqlite3'}"),
        conn_max_age=600,
        conn_health_checks=True,
        ssl_require=True if os.environ.get('DATABASE_URL') else False
    )
}

# 5. Templates & WSGI (unchanged but essential)
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "tandari_backend.wsgi.application"

# 6. Auth & Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Harare"
USE_I18N = True
USE_TZ = True

# 7. Static & Media Files
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles" # Required for production
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# 8. CORS Configuration
# Use django-cors-headers instead of manual middleware for reliability
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5174",
    "http://localhost:5174",
]
# Add your production frontend URL here later
if os.environ.get("FRONTEND_URL"):
    CORS_ALLOWED_ORIGINS.append(os.environ.get("FRONTEND_URL"))