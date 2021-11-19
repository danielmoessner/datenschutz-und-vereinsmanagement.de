"""qcqualitycontrol URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.conf.urls import include
from django.contrib import admin
from django.conf import settings
from django.urls import path


urlpatterns = [
    path('benutzer/', include('apps.users.urls')),
    path('', include('apps.content.urls')),
    path('admin/', admin.site.urls),
    path('martor/', include('martor.urls')),
]


handler400 = "apps.content.views.error_handler"
handler403 = "apps.content.views.error_handler"
handler404 = "apps.content.views.error_handler"
handler500 = "apps.content.views.error_handler"


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls)), ]