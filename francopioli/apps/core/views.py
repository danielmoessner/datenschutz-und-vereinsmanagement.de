from django.views.generic.base import ContextMixin
from django.views.generic import RedirectView
from django.views.generic import TemplateView
from django.http import HttpResponseRedirect

from .models import TextBlock
from .models import Code
from .models import Seo

import re


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


class StaticRedirectView(RedirectView):
    def get(self, request, *args, **kwargs):
        current_url = self.request.get_full_path()
        splitted_url = re.split(r'(js|images|css)', current_url)
        url = ''.join(splitted_url[1:])
        static_url = '/static/' + url
        return HttpResponseRedirect(static_url)


class AnyHtmlView(WebsiteContextMixin, TemplateView):
    def get(self, *args, **kwargs):
        current_url = self.request.get_full_path()
        current_url = current_url.strip('/')
        self.template_name = current_url
        return super().get(self, *args, **kwargs)
