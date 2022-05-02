from django.contrib.auth.models import Group
from django.contrib import admin
from .models import CustomUser, TextBlock, Code, Seo, Tag, Experience, Education, Article, Service

admin.site.unregister(Group)

admin.site.register(Tag)
admin.site.register(TextBlock)
admin.site.register(Code)
admin.site.register(Seo)
admin.site.register(CustomUser)
admin.site.register(Service)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Article)
