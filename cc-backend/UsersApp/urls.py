from django.urls import re_path as url 
from UsersApp import views


urlpatterns = [
    url(r'^footprint$', views.footprintApi),
    url(r'^footprint/([0-9]+)$', views.footprintApi),
]