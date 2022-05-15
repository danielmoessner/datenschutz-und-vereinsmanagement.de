"""
Django settings for francopioli project.
"""

import os
import json
from django.core.exceptions import ImproperlyConfigured

# Paths

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Secret settings

with open(os.path.join(BASE_DIR, "tmp/secrets.json")) as f:
    secrets_json = json.loads(f.read())


def get_secret(setting, secrets=secrets_json):
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {} environment variable.".format(setting)
        raise ImproperlyConfigured(error_msg)


SECRET_KEY = get_secret("SECRET_KEY")

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'svg',
    'ckeditor',
    'ckeditor_uploader',
    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'tmp/db.sqlite3'),
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# User
# https://docs.djangoproject.com/en/2.2/topics/auth/customizing/#substituting-a-custom-user-model

AUTHENTICATION_BACKENDS = ['core.backends.EmailLoginBackend']
AUTH_USER_MODEL = 'core.CustomUser'
LOGIN_URL = '/benutzer/login'

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'de'

TIME_ZONE = 'Europe/Berlin'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static/dist'),
]

STATIC_ROOT = os.path.join(BASE_DIR, 'tmp/static')

STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'

MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'tmp/media')

# CKEditor
# https://django-ckeditor.readthedocs.io/en/latest/#installation
CKEDITOR_IMAGE_BACKEND = 'pillow'
CKEDITOR_UPLOAD_PATH = 'ckeditor/'
CKEDITOR_CONFIGS = {
    'default': {
        "skin": "moono-lisa",
        "toolbar_Basic": [["Source", "-", "Bold", "Italic"]],
        "toolbar_Full": [
            [
                "Styles",
                "Format",
                'NumberedList',
                'BulletedList',
            ],
            [
                "Bold",
                "Italic",
                "Underline",
                "Strike",
            ],
            [
                "Undo",
                "Redo",
            ],
            ["Link", "Unlink"],
            ["Image", "Flash", "Table", "HorizontalRule"],
            ["TextColor", "BGColor"],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight'],
            ['RemoveFormat']
        ],
        "toolbar": "Full",
        "height": 600,
        "width": 1000,
        "filebrowserWindowWidth": 940,
        "filebrowserWindowHeight": 725,
#
#         # 'skin': 'office2013',
#         # 'toolbar_Basic': [
#         #     ['Source', '-', 'Bold', 'Italic']
#         # ],
#         # 'toolbar_YourCustomToolbarConfig': [
#         #     {'name': 'document', 'items': ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates']},
#         #     {'name': 'clipboard', 'items': ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
#         #     {'name': 'editing', 'items': ['Find', 'Replace', '-', 'SelectAll']},
#         #     {'name': 'forms',
#         #      'items': ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
#         #                'HiddenField']},
#         #     '/',
#         #     {'name': 'basicstyles',
#         #      'items': ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
#         #     {'name': 'paragraph',
#         #      'items': ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-',
#         #                'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl',
#         #                'Language']},
#         #     {'name': 'links', 'items': ['Link', 'Unlink', 'Anchor']},
#         #     {'name': 'insert',
#         #      'items': ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']},
#         #     '/',
#         #     {'name': 'styles', 'items': ['Styles', 'Format', 'Font', 'FontSize']},
#         #     {'name': 'colors', 'items': ['TextColor', 'BGColor']},
#         #     {'name': 'tools', 'items': ['Maximize', 'ShowBlocks']},
#         #     {'name': 'about', 'items': ['About']},
#         #     '/',  # put this to force next toolbar on new line
#         #     {'name': 'yourcustomtools', 'items': [
#         #         # put the name of your editor.ui.addButton here
#         #         'Preview',
#         #         'Maximize',
#         #     ]},
#         # ],
#         # 'toolbar': 'YourCustomToolbarConfig',  # put selected toolbar config here
#         # 'tabSpaces': 4,
#
        'extraPlugins': ','.join([
            'uploadimage',  # the upload image feature
            # your extra plugins here
            'div',
            'autolink',
            'autoembed',
            'embedsemantic',
            # 'autogrow',
            # 'devtools',
            'widget',
            'lineutils',
            'clipboard',
            'dialog',
            'dialogui',
            'elementspath'
        ]),
    }
}
DEFAULT_CONFIG = {
    "skin": "moono-lisa",
    "toolbar_Basic": [["Source", "-", "Bold", "Italic"]],
    "toolbar_Full": [
        [
            "Styles",
            "Format",
            "Bold",
            "Italic",
            "Underline",
            "Strike",
            "SpellChecker",
            "Undo",
            "Redo",
        ],
        ["Link", "Unlink", "Anchor"],
        ["Image", "Flash", "Table", "HorizontalRule"],
        ["TextColor", "BGColor"],
        ["Smiley", "SpecialChar"],
        ["Source"],
    ],
    "toolbar": "Full",
    "height": 291,
    "width": 835,
    "filebrowserWindowWidth": 940,
    "filebrowserWindowHeight": 725,
}
