# Generated by Django 2.2.4 on 2019-08-26 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('car_name', models.CharField(max_length=50)),
                ('car_hostname', models.CharField(max_length=50)),
                ('car_state', models.CharField(max_length=50)),
            ],
        ),
    ]
