# Generated by Django 3.0.2 on 2020-04-14 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0011_education'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='slug',
            field=models.SlugField(unique=True),
        ),
    ]
