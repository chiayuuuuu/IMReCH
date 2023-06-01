from django.shortcuts import render, redirect
from django.contrib import messages
from website.models import User, Schedule, Video, Teach,Ufile
from website.serializers import UserSerializer, ScheduleSerializer, VideoSerializer,TeachSerializer,UfileSerializer
from rest_framework import viewsets
from website import spider

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
class TeachViewSet(viewsets.ModelViewSet):
    queryset = Teach.objects.all()
    serializer_class = TeachSerializer
class UfileViewSet(viewsets.ModelViewSet):
    queryset = Ufile.objects.all()
    serializer_class = UfileSerializer


# Create your views here.
def home(request):
    if 'userid' in request.session:
        userid = request.session['userid']
        userpwd = request.session['userpwd']
        users = User.objects.all()
    return render(request, 'home.html', locals())

def login(request):
    if request.method == 'POST':
        global onlineUser
        login_userid = request.POST['uid']
        login_userpwd = request.POST['pwd']
        onlineUser = login_userid
        if User.objects.filter(uid=login_userid).exists():
            if User.objects.filter(pwd=login_userpwd):
                recd = User.objects.get(uid=login_userid)
                recd.online = 'true'
                recd.save()
                return redirect('/home/')
            else:
                messages.error(request, '帳號或密碼錯誤')
                recd = User.objects.get(uid=login_userid)
                recd.online = 'false'
                recd.save()
                return render(request, 'login.html', locals())
        else:
            # 解析classinfo
            courseData = spider.class_info(login_userid, login_userpwd)
            if courseData != 'ValueError':
                for i in range(0, len(courseData[0])):
                    c_id = courseData[0][i]
                    c_name = courseData[1][i]
                    c_teacher = courseData[2][i]
                    c_time = courseData[3][i]
                    recd2 = Schedule.objects.create(uid=login_userid, cid=c_id, cname=c_name, teacher= c_teacher,ctime=c_time)
                    recd4 = Ufile.objects.create(uid=login_userid, cid=c_id)
                    recd2.save()
                    recd4.save()
                recd = User.objects.create(uid=login_userid, pwd=login_userpwd, uname=str(login_userid),online='true')
                recd3 = Video.objects.create(uid=login_userid)
                recd.save()
                recd3.save()
                onlineUser = login_userid
                return render(request, 'home.html', locals())
            else:
                messages.error (request, '帳號或密碼錯誤')
                return render(request, 'login.html', locals())
    return render(request, 'login.html', locals())

def logout(request):
    recd = User.objects.get(uid=onlineUser)
    recd.online = 'false'
    recd.save()
    return redirect('/')

def course(request):
    recd = Schedule.objects.get(uid=onlineUser)
    return render(request, 'courses.html', locals())

def alter(request):
    return render(request, 'alter.html')

def setting(request):
    users = User.objects.all()
    return render(request, 'setting.html', locals())
