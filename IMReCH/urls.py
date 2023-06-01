from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from website.views import login,logout,home,course,alter,setting
from rest_framework.routers import DefaultRouter
from website import views


router = DefaultRouter()
router.register(r'user', views.UserViewSet)
router.register(r'schedule', views.ScheduleViewSet)
router.register(r'video', views.VideoViewSet)
router.register(r'image', views.TeachViewSet)
router.register(r'ufile', views.UfileViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^$', login),
    url(r'^login/$', login),
    url(r'^logout/$', logout),
    url(r'^home/$', home),
    url(r'^setting/$', setting),
    url(r'^course/$', course),
    url(r'^course/alter/$', alter),

]
