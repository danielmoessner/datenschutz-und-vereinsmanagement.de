from django.contrib import admin
from .models import Experience
from .models import Education
from .models import Article
from .models import Service
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from django.contrib.auth.models import Group

from .models import TextBlock
from .models import Code
from .models import Seo

admin.site.register(TextBlock)
admin.site.register(Code)
admin.site.register(Seo)

admin.site.unregister(Group)
from .models import CustomUser


admin.site.register(CustomUser)

admin.site.register(Service)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Article)
