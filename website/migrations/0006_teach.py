# Generated by Django 3.2.14 on 2022-12-28 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0005_auto_20221209_1507'),
    ]

    operations = [
        migrations.CreateModel(
            name='Teach',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('photo', models.ImageField(upload_to='teaches')),
            ],
            options={
                'db_table': 'teach',
            },
        ),
    ]