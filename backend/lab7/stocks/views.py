from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.contrib.auth.models import Permission
from django.db.migrations import serializer
from django.http import HttpResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from stocks.permissions import IsManager, IsSign
from stocks.serializers import UserSerializer, ServicesSerializer, Sign_upSerializer, ScheduleSerializer
from stocks.models import *
from django_filters.rest_framework import DjangoFilterBackend
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect



class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUser]


class ServicesViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Services.objects.all().order_by('pk')
    serializer_class = ServicesSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ServiceFilter
    permission_classes = [IsManager]

class ScheduleViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Schedule.objects.all().order_by('pk')
    serializer_class = ScheduleSerializer
    permission_classes = [IsManager]


class Sign_upViewSet(viewsets.ModelViewSet):
        """
        API endpoint, который позволяет просматривать и редактировать акции компаний
        """
        # queryset всех пользователей для фильтрации по дате последнего изменения
        queryset = Sign_up.objects.all().order_by('time1')
        serializer_class = Sign_upSerializer
        filter_backends = (DjangoFilterBackend,)
        filterset_class = Sign_upFilter
        permission_classes = [IsSign]
        # permission_required = (
        # 'stocks.view_sign_up', 'stocks.change_sign_up', 'stocks.add_sign_up', 'stocks.delete_sign_up')


class Registration(APIView):
    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        if User.objects.filter(username = username).exists():
            return Response({'error':'Username already exists'})
        else:
            user = User.objects.create_user( username=username, password=password)
            user.user_permissions.add(*Permission.objects.filter(codename='view_sign_up'))
            user.user_permissions.add(*Permission.objects.filter(codename='add_sign_up'))
            # user.user_permissions.add(permissions)
            user.save()
        return Response({'success': 'User created'});


class GetCSRFToken(APIView):
    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})

class Check(APIView):
    def get(self, request, format=None):
        user = self.request.user
        isAuthenticated = user.is_authenticated

        if isAuthenticated:
            return Response({'isAuthenticated':'success'})
        else:
            return Response({'isAutheticated': 'error'})


class LoginView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'success':'User authenticated', 'username': username, 'pk':user.pk})
        else:
            return Response({'error':'Error Authenticated'})

class LogoutView(APIView):
    def post(self, request, format=None):

        try:
            logout(request)
            return Response({'success': 'User Logout'})
        except:
            return Response({'error':'Error logout'})


class profile(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        data = self.request.data

        #     profile = User.objects.get(pk = user.data.pk)
        return HttpResponse({'success': data})


# Create your views here.
