from ckeditor_uploader import fields
from django.db import models


class Experience(models.Model):
    time = models.TextField('Zeit')
    text = models.TextField('Erfahrung')

    class Meta:
        verbose_name_plural = 'Erfahrungen'
        verbose_name = 'Erfahrung'
        ordering = ['time']

    def __str__(self):
        return self.time


class Education(models.Model):
    time = models.TextField('Zeit')
    text = models.TextField('Bildung')

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
    is_account_required = models.BooleanField('Nur für eingeloggte Benutzer sichtbar', default=False)
    # public
    author = models.CharField('Autor', max_length=200)
    title = models.CharField('Titel', max_length=200)
    slug = models.SlugField('Slug', help_text='Der Name klein geschrieben und ohne Leerzeichen oder Sonderzeichen.',
                            unique=True)
    date = models.DateField('Datum')
    # tags = models.ManyToManyField(Tag)
    description = models.TextField('Beschreibung')
    image = models.ImageField('Bild', upload_to='article-images/')
    content = fields.RichTextUploadingField('Inhalt')

    class Meta:
        verbose_name = 'Artikel'
        verbose_name_plural = 'Artikel'

    def __str__(self):
        return '{}: {}'.format(self.date.strftime('%d.%m.%Y'), self.title)


class Service(models.Model):
    name = models.CharField('Name', max_length=200)
    slug = models.SlugField('Slug', help_text='Der Name klein geschrieben und ohne Leerzeichen oder Sonderzeichen.',
                            unique=True)
    content = fields.RichTextUploadingField('Inhalt')

    class Meta:
        verbose_name = 'Leistung'
        verbose_name_plural = 'Leistungen'

    def __str__(self):
        return self.name
