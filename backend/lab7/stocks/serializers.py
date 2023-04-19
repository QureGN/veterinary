from stocks.models import Sign_up, Services, Schedule
from rest_framework import serializers
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = User
        # Поля, которые мы сериализуем
        fields = ["pk", "username", "password", "is_staff"]

class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Services
        # Поля, которые мы сериализуем
        fields = ["pk", "service", "description", "price"]


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Schedule
        # Поля, которые мы сериализуем
        fields = ["pk", "time2"]

class Sign_upSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Sign_up
        # Поля, которые мы сериализуем
        fields = ["pk", "time1", "service1", "client_user","check1", "note"]



