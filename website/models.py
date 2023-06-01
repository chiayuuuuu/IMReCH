from django.db import models

# Create your models here.
class User(models.Model):
    uid = models.IntegerField()
    pwd = models.CharField(max_length=20,blank=False)
    uname = models.CharField(max_length=20,blank=True)
    mail = models.EmailField(max_length=30,default='',blank=True)
    gender = models.CharField(max_length=20,default='other',blank=True)
    online = models.CharField(max_length=20, blank=True)
    class Meta:
        db_table = "user"

class Schedule(models.Model):
    uid = models.IntegerField()
    cid = models.CharField(max_length=4,default='')
    cname = models.CharField(max_length=100, blank=True)
    teacher = models.CharField(max_length=20, blank=True)
    ctime = models.CharField(max_length=50, blank=True)

    class Meta:
        db_table = 'schedule'
    #     unique_together = ("uid", "cid")  # 這是重點

    # def __str__(self):
    #     return self.cname

class Video(models.Model):
    uid = models.IntegerField()
    cid = models.CharField(max_length=4,default='')
    vname = models.CharField(max_length=30,blank=True)
    path = models.CharField(max_length=200,blank=True)
    note = models.JSONField(blank=True,null=True)

    class Meta:
        db_table = 'video'
    #     unique_together = ("uid", "cid")  # 這是重點

class Teach(models.Model):
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='static/images')

    class Meta:
        db_table = 'teach'

class Ufile(models.Model):
    uid = models.IntegerField()
    cid = models.CharField(max_length=4, default='')
    path = 'static/media'+ str(uid)+'/'+str(cid)
    vfile = models.FileField(upload_to=path)

    class Meta:
        db_table = 'Ufile'
