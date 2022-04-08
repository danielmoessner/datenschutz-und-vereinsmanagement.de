from .base import *

# Debug
# https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-DEBUG
DEBUG = True

# Allowed Hosts
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ["*"]

# Application definition
# https://docs.djangoproject.com/en/dev/ref/applications/
INSTALLED_APPS += ["debug_toolbar"]

# Middleware
# https://docs.djangoproject.com/en/dev/topics/http/middleware/
MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]

# Django Debug Toolbar
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#configuring-internal-ips
INTERNAL_IPS = ["127.0.0.1"]

# E-Mail
# https://docs.djangoproject.com/en/dev/topics/email/#smtp-backend
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# SVG
SVG_DIRS = [
    os.path.join(BASE_DIR, 'static/dist/')
]
