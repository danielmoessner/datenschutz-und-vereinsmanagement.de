from django.urls import path
from . import views


app_name = 'users'
urlpatterns = [
    # views
    path('', views.SettingsView.as_view(), name='index'),
    path('login', views.SignInView.as_view(), name='signin'),
    path('logout', views.SignOutView.as_view(), name='signout'),
    path('einstellungen', views.SettingsView.as_view(), name='settings'),
    path('passwort-aendern', views.CustomPasswordChangeView.as_view(), name='password_change'),
]
