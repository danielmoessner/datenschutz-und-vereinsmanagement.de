from .base import *

# Debug
# https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-DEBUG
DEBUG = False

# Allowed Hosts
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = get_secret("ALLOWED_HOSTS")

# SVG
SVG_DIRS = [
    os.path.join(BASE_DIR, 'tmp/static/')
]

# E-Mail
# https://docs.djangoproject.com/en/dev/topics/email/#smtp-backend
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.strato.de'
EMAIL_HOST_USER = 'projekte@tortuga-webdesign.de'
EMAIL_HOST_PASSWORD = get_secret('EMAIL_PWD')
EMAIL_PORT = 587

# Logging
# https://docs.djangoproject.com/en/dev/topics/logging/
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'class': 'logging.FileHandler',
            'level': 'ERROR',
            'filename': os.path.join(BASE_DIR, 'tmp/django.log'),
        },
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'ERROR',
        },
        'mail_admins': {
            'class': 'django.utils.log.AdminEmailHandler',
            'level': 'ERROR',
        },
        'null': {
            'class': 'logging.NullHandler',
        },
    },
    'loggers': {
        'django.security.DisallowedHost': {
            'handlers': ['null'],
            'propagate': False,
        },
        'django': {
            'handlers': ['console', 'file', 'mail_admins'],
            'propagate': False,
            'level': 'INFO',
        },
    }
}
