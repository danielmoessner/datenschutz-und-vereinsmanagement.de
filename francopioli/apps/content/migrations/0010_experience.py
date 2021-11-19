# Generated by Django 3.0.2 on 2020-02-27 12:36

from django.db import migrations, models
import martor.models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0009_service_slug'),
    ]

    operations = [
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.TextField()),
                ('text', martor.models.MartorField()),
            ],
            options={
                'verbose_name': 'Erfahrung',
                'verbose_name_plural': 'Erfahrungen',
                'ordering': ['time'],
            },
        ),
    ]
