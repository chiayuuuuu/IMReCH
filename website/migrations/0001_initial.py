# Generated by Django 3.2.14 on 2022-11-20 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('uid', models.IntegerField(primary_key=True, serialize=False)),
                ('pwd', models.CharField(max_length=20)),
                ('uname', models.CharField(blank=True, max_length=20)),
                ('mail', models.EmailField(blank=True, default='', max_length=30)),
                ('gender', models.CharField(blank=True, default='other', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.IntegerField()),
                ('cid', models.CharField(default='', max_length=4)),
                ('vname', models.CharField(blank=True, max_length=30)),
                ('path', models.CharField(blank=True, max_length=200)),
                ('note', models.JSONField(blank=True, null=True)),
            ],
            options={
                'db_table': 'Video',
                'unique_together': {('uid', 'cid')},
            },
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.IntegerField()),
                ('cid', models.CharField(default='', max_length=4)),
                ('cname', models.CharField(blank=True, max_length=100)),
                ('teacher', models.CharField(blank=True, max_length=20)),
                ('ctime', models.CharField(blank=True, max_length=50)),
            ],
            options={
                'db_table': 'Schedule',
                'unique_together': {('uid', 'cid')},
            },
        ),
    ]
