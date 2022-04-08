from django.contrib.auth.mixins import UserPassesTestMixin
from django.views.generic import DetailView
from django.views.generic import ListView
from django.views.generic import FormView
from django.core.mail import EmailMessage
from django.shortcuts import render
from .models import Experience
from .models import Education
from .models import Article
from .models import Service
from .models import Tag
from .forms import ContactForm


from django.views.generic.base import ContextMixin
from .models import TextBlock
from .models import Code
from .models import Seo

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordChangeDoneView
from django.contrib.auth.views import PasswordChangeView
from django.contrib.auth.views import LogoutView
from django.contrib.auth.views import LoginView
from django.views.generic import TemplateView
from django.urls import reverse_lazy


class CustomPasswordChangeView(PasswordChangeView):
    template_name = 'password.html'
    success_url = reverse_lazy('content:signin')


class CustomPasswordChangeDoneView(PasswordChangeDoneView):
    pass


class SignInView(LoginView):
    template_name = 'login.html'
    redirect_field_name = 'next'


class SettingsView(LoginRequiredMixin, TemplateView):
    template_name = 'settings.html'


class SignOutView(LogoutView):
    next_page = '/'


class WebsiteContextMixin(ContextMixin):
    def get_seo_data(self):
        seos = []
        for seo in Seo.objects.all():
            if seo.url in self.request.get_full_path():
                seos.append(seo)

        if not seos:
            seo = Seo.objects.filter(url='').first()
            if seo:
                return {'title': seo.title_tag, 'description': seo.meta_description}
            else:
                return {'title': 'No title yet.', 'description': 'No description yet.'}

        final_seo = None
        slug_length = -1
        for seo in seos:
            seo_slug_length = len(seo.url)
            if seo_slug_length > slug_length:
                final_seo = seo
                slug_length = seo_slug_length

        return {'title': final_seo.title_tag, 'description': final_seo.meta_description}

    def get_custom_code(self):
        header_code = ''
        footer_code = ''
        custom_codes = []
        for custom_code in Code.objects.all():
            cc_slug = custom_code.url
            if cc_slug == '' or cc_slug in self.request.get_full_path():
                custom_codes.append(custom_code)
        for custom_code in custom_codes:
            if custom_code.location == 'HEAD':
                header_code += custom_code.code
            else:
                footer_code += custom_code.code
        return {'header_code': header_code, 'footer_code': footer_code}

    def get_text_blocks(self):
        data = {}
        for text_block in list(TextBlock.objects.all()):
            data[text_block.key] = text_block.content
        return {'textblocks': data}

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(self.get_seo_data())
        context.update(self.get_custom_code())
        context.update(self.get_text_blocks())
        return context


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
