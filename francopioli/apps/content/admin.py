from django.contrib import admin

from .models import Experience
from .models import Education
from .models import Article
from .models import Service
from .models import Tag
from .forms import ArticleForm


class ArticleModelAdmin(admin.ModelAdmin):
    form = ArticleForm


admin.site.register(Tag)
admin.site.register(Service)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Article, ArticleModelAdmin)
