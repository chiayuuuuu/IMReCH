# Generated by Django 3.2.14 on 2022-12-30 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0010_delete_video'),
    ]

    operations = [
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.IntegerField()),
                ('cid', models.CharField(default='', max_length=4)),
                ('vname', models.CharField(blank=True, max_length=30)),
                ('path', models.CharField(blank=True, max_length=200)),
                ('note', models.JSONField(blank=True, null=True)),
                ('vfile', models.FileField(upload_to='static/media')),
            ],
            options={
                'db_table': 'video',
            },
        ),
    ]
