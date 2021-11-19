from django.db import models

from martor.models import MartorField


class Experience(models.Model):
    time = models.TextField()
    text = MartorField()

    class Meta:
        verbose_name_plural = 'Erfahrungen'
        verbose_name = 'Erfahrung'
        ordering = ['time']

    def __str__(self):
        return self.time


class Education(models.Model):
    time = models.TextField()
    text = MartorField()

    class Meta:
        verbose_name_plural = 'Bildungen'
        verbose_name = 'Bildung'
        ordering = ['time']

    def __str__(self):
        return self.time


class Tag(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField()

    class Meta:
        verbose_name = 'Tag'
        verbose_name_plural = 'Tags'

    def __str__(self):
        return self.name


class Article(models.Model):
    # auto
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # private
    is_account_required = models.BooleanField(default=False)
    # public
    author = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    date = models.DateField()
    tags = models.ManyToManyField(Tag)
    description = models.TextField()
    image = models.ImageField(upload_to='article-images/')
    content = MartorField()

    class Meta:
        verbose_name = 'Artikel'
        verbose_name_plural = 'Artikel'

    def __str__(self):
        return '{}: {}'.format(self.date.strftime('%d.%m.%Y'), self.title)


class Service(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField()
    content = MartorField()

    class Meta:
        verbose_name = 'Leistung'
        verbose_name_plural = 'Leistungen'

    def __str__(self):
        return self.name
