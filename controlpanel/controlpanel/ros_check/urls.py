from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'ros_check'
urlpatterns = [
    path('', views.index, name='index'),
    path('verify', views.verify, name='verify'),
    path('docker_start', views.docker_start, name='docker_start'),
    path('ros_start', views.ros_start, name="ros_start"),
    path('car_fetch', views.car_fetch, name="car_fetch"),
    path('car_search',views.car_search, name='car_search'),
    path('fetch_docker', views.fetch_docker, name='fetch_docker'),
    path('fetch_ros', views.fetch_ros, name='fetch_ros'),
]