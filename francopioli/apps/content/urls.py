from django.urls import path

from . import views


app_name = "content"
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('kontakt', views.ContactView.as_view(), name='contact'),
    path('artikel', views.ArticlesView.as_view(), name='articles'),
    path('artikel/tag/<slug:tag>/', views.ArticlesView.as_view(), name='articles_tag'),
    path('artikel/<slug:slug>', views.ArticleView.as_view(), name='article'),
    path('leistung/<slug:slug>', views.ServiceView.as_view(), name='service'),
    path('ueber-uns/', views.AboutView.as_view(), name='about'),
    path('error/', views.ErrorView.as_view(), name='error'),
    path('datenschutz/', views.DataProtectionView.as_view(), name='data_protection'),
    path('impressum/', views.ImprintView.as_view(), name='imprint'),
]
