from django.contrib.auth.mixins import UserPassesTestMixin
from django.views.generic import TemplateView
from django.views.generic import DetailView
from django.views.generic import ListView
from django.views.generic import FormView
from django.core.mail import EmailMessage
from django.shortcuts import render

from apps.core.models import TextBlock
from apps.core.views import WebsiteContextMixin
from .models import Experience
from .models import Education
from .models import Article
from .models import Service
from .models import Tag
from .forms import ContactForm


class GeneralContextMixin(WebsiteContextMixin):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['services'] = Service.objects.all()
        context['textblocks'] = TextBlock.get_dict()
        return context


class IndexView(GeneralContextMixin, TemplateView):
    template_name = 'content/index.html'


class ContactView(GeneralContextMixin, FormView):
    template_name = 'content/contact.html'

    form_class = ContactForm

    def form_invalid(self, form):
        context = self.get_context_data(form=form)
        context['is_form_valid'] = False
        return self.render_to_response(context)

    def form_valid(self, form):
        subject = 'Neue Anfrage über die Webseite: datenschutz-und-vereinsmanagement.de'
        message = ''
        for key, value in form.cleaned_data.items():
            message += '{}: {}\n'.format(key, value)
        recipient_list = ['kontakt@tortuga-webdesign.de', 'info@vereinsberatung-und-sportmanagement.de']
        email = EmailMessage(subject=subject, body=message, from_email='projekte@tortuga-webdesign.de',
                             to=recipient_list)
        email.send()
        context = {'is_form_valid': True}
        return super().render_to_response(context)


class ArticlesView(GeneralContextMixin, ListView):
    template_name = 'content/list/articles.html'
    model = Article

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if 'tag' in self.kwargs:
            context['tag'] = Tag.objects.get(slug=self.kwargs['tag'])
        return context

    def get_queryset(self):
        articles = Article.objects.all()
        if 'tag' in self.kwargs:
            articles = articles.filter(tags__slug=self.kwargs['tag'])
        if not self.request.user.is_authenticated:
            articles = articles.exclude(is_account_required=True)
        return articles


class ArticleView(UserPassesTestMixin, GeneralContextMixin, DetailView):
    template_name = 'content/detail/article.html'
    model = Article

    def test_func(self):
        if not self.get_object().is_account_required:
            return True
        if self.request.user.is_authenticated:
            return True
        return False

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        articles = Article.objects.order_by("?")
        if not self.request.user.is_authenticated:
            articles = articles.exclude(is_account_required=True)
        articles = articles[:3]
        context['articles'] = articles
        return context


class ServiceView(GeneralContextMixin, DetailView):
    template_name = 'content/detail/service.html'
    model = Service


class AboutView(GeneralContextMixin, TemplateView):
    template_name = 'content/about.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['experiences'] = Experience.objects.all()
        context['educations'] = Education.objects.all()
        return context


def error_handler(request, exception=None):
    return render(request, 'content/error.html', {})


class ErrorView(GeneralContextMixin, TemplateView):
    template_name = 'content/error.html'


class DataProtectionView(GeneralContextMixin, TemplateView):
    template_name = 'content/data_protection.html'


class ImprintView(GeneralContextMixin, TemplateView):
    template_name = 'content/imprint.html'
