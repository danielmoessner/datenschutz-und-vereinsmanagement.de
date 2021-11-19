from django.db import models


class Seo(models.Model):
    url = models.CharField(max_length=200, unique=True, blank=True, verbose_name='Url',
                           help_text='Aktiviert sich bei dieser Url. Wenn leer immer aktiv.')
    title_tag = models.CharField(max_length=60, verbose_name='Titel')
    meta_description = models.TextField(max_length=160, verbose_name='Beschreibung', blank=True, null=True)

    objects = models.Manager()

    def __str__(self):
        if self.url:
            return '{}: {}'.format(self.url, self.title_tag)
        return self.title_tag

    class Meta:
        verbose_name = 'Seo Einstellung'
        verbose_name_plural = 'Seo Einstellungen'


class Code(models.Model):
    name = models.CharField(max_length=200, verbose_name='Name')
    url = models.CharField(max_length=200, blank=True, verbose_name='Url')
    LOCATIONS = [('HEAD', 'Head'), ('BODY', 'Body')]
    location = models.CharField(choices=LOCATIONS, max_length=200, verbose_name='Location',
                                help_text='Where is the code supposed to be?')
    code = models.TextField(verbose_name='Code', help_text='The code is not validated and should be correct.')

    objects = models.Manager()

    def __str__(self):
        if self.url:
            return '/{}: {}'.format(self.url, self.name)
        return self.name

    class Meta:
        verbose_name = 'Code'
        verbose_name_plural = 'Code'


class TextBlock(models.Model):
    key = models.CharField(max_length=200)
    content = models.TextField()

    class Meta:
        verbose_name = 'Textbaustein'
        verbose_name_plural = 'Textbausteine'
        ordering = ['key']

    def __str__(self):
        content = (self.content[:60] + '..') if len(self.content) > 60 else self.content
        return '{}-------------{}'.format(self.key, content)

    @staticmethod
    def get_dict():
        text_blocks = list(TextBlock.objects.all())
        text_blocks_dict = {text_block.key : text_block.content for text_block in text_blocks}
        return text_blocks_dict
