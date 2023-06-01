from django.contrib import admin

# Register your models here.
from website.models import User,Schedule,Video,Teach,Ufile
admin.site.register(User)
admin.site.register(Schedule)
admin.site.register(Video)
admin.site.register(Teach)
admin.site.register(Ufile)