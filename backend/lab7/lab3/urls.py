"""lab3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from stocks import views as stock_views
from django.urls import include, path
from rest_framework import routers

from stocks.views import Registration, GetCSRFToken, LoginView, LogoutView, Check,profile

router = routers.DefaultRouter()
router.register(r'stocks', stock_views.UserViewSet)
router.register(r'stocks1', stock_views.ServicesViewSet)
router.register(r'stocks2', stock_views.Sign_upViewSet)
router.register(r'stocks3', stock_views.ScheduleViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/register/', Registration.as_view(), name ='register'),
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('authenticated', Check.as_view()),
    path('logout', LogoutView.as_view()),
    path('login', LoginView.as_view()),
    path('profile', profile.as_view()),
    path('admin/', admin.site.urls),
]

