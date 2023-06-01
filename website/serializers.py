from rest_framework import serializers
from website.models import User,Schedule,Video,Teach,Ufile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class TeachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teach
        fields = '__all__'

class UfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ufile
        fields = '__all__'