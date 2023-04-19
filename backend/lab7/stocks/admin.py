from django.contrib import admin
from django.contrib import admin
from .models import User, Services, Sign_up
class ServicesAdmin(admin.ModelAdmin):
    list_display = ('id', 'service')
    list_display_links = ('id', 'service')

admin.site.register(Services, ServicesAdmin)



class Sign_upAdmin(admin.ModelAdmin):
    list_display = ('id', 'time1')
    list_display_links = ('id', 'time1')

admin.site.register( Sign_up, Sign_upAdmin)
# Register your models here.
