from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordChangeDoneView
from django.contrib.auth.views import PasswordChangeView
from django.contrib.auth.views import LogoutView
from django.contrib.auth.views import LoginView
from django.views.generic import TemplateView
from django.urls import reverse_lazy


class CustomPasswordChangeView(PasswordChangeView):
    template_name = 'password.html'
    success_url = reverse_lazy('users:signin')


class CustomPasswordChangeDoneView(PasswordChangeDoneView):
    pass


class SignInView(LoginView):
    template_name = 'login.html'
    redirect_field_name = 'next'


class SettingsView(LoginRequiredMixin, TemplateView):
    template_name = 'settings.html'


class SignOutView(LogoutView):
    next_page = '/'
