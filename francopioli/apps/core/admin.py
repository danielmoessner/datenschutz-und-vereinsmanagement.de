from django.contrib import admin
from django.contrib.auth.models import Group

from .models import TextBlock
from .models import Code
from .models import Seo

admin.site.register(TextBlock)
admin.site.register(Code)
admin.site.register(Seo)

admin.site.unregister(Group)
