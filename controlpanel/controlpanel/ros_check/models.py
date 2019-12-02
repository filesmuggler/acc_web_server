from django.db import models

# Create your models here.

class Car(models.Model):
    car_name = models.CharField(max_length=50)
    car_hostname = models.CharField(max_length=50)
    car_state = models.CharField(max_length=50)



    
    def __str__(self):
        return self.car_name
    def get_hostname(self):
        return self.car_hostname
    def get_state(self):
        return self.car_state