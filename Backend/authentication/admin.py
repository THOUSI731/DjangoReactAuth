from django.contrib import admin
from . models import User,Profile

# Register your models here.

class ProfileAdmin(admin.ModelAdmin):
     list_display = ['verified','full_name','user']
     list_display_links = ['user']
     

admin.site.register(User)
admin.site.register(Profile,ProfileAdmin)
