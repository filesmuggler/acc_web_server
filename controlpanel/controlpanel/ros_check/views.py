from django.http import HttpResponse
from django.template import loader
from .models import Car
import subprocess
import os
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt

def index(request):
    template = loader.get_template('ros_check/base.html')
    data = {}
    return HttpResponse(template.render(data, request))
    
@csrf_exempt
def verify(request):
    dir_path = os.getcwd()
    script_path = dir_path + '/ros_check/scripts/verify.sh'
    if request.POST:
        if request.is_ajax():
            message = "Yes, Ajax!"
            subprocess.call(['bash', script_path])
        else:
            message = "Your browser doesn't support AJAX"
    
    return HttpResponse(message)

@csrf_exempt
def docker_start(request):
    root_pwd=request.POST['password']
    if request.is_ajax():
        dir_path = os.getcwd()
        script_path = dir_path + '/ros_check/scripts/dockeros_django.sh'
        command = "echo '" + root_pwd + "'" + " | sudo -S -k bash "+script_path+" start"
        out = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)
        stdout,stderr = out.communicate()
        message = stdout
    else:
        message = "Your browser doesn't support AJAX"
    return HttpResponse(message)

@csrf_exempt
def ros_start(request):
    root_pwd=request.POST['password']
    if request.is_ajax():
        dir_path = os.getcwd()
        script_path = dir_path + '/ros_check/scripts/dockeros_django.sh'
        command = "echo '" + root_pwd + "'" + " | sudo -S -k bash "+script_path+" ros"
        out = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)
        stdout,stderr = out.communicate()
        message = stdout
    else:
        message = "Your browser doesn't support AJAX"
    return HttpResponse(message)


@csrf_exempt
def car_search(request):
    if request.is_ajax():
        message="ajax yo"
        dir_path = os.getcwd()
        script_path = dir_path + '/ros_check/scripts/car_search.sh'
        command = "bash "+script_path
        out = subprocess.check_output(command, shell=True)
        message = out
    else:
        message="Your browser doesn't support AJAX"
    return HttpResponse(message)

@csrf_exempt
def car_fetch(request):
    if request.is_ajax():
        message="ajax yo"
        dir_path = os.getcwd()
        script_path = dir_path + '/ros_check/scripts/car_fetch_ip.sh'
        command = "bash "+script_path
        out = subprocess.check_output(command, shell=True)
        message = out
    else:
        message="Your browser doesn't support AJAX"
    return HttpResponse(message)

@csrf_exempt
def fetch_docker(request):
    if request.is_ajax():
        message = "Docker terminal"
        out = subprocess.Popen(['ls'], 
           stdout=subprocess.PIPE, 
           stderr=subprocess.STDOUT)
        stdout,stderr = out.communicate()
        message = stdout
    else:
        message = "Your browser doesn't support AJAX"
    return HttpResponse(message)

@csrf_exempt
def fetch_ros(request):
    if request.is_ajax():
        message = "ROS terminal"
    else:
        message = "Your browser doesn't support AJAX"
    return HttpResponse(message)