from django.db import models

# Create your models here.

# Only need a model to hold user details (including their footprints)
class Footprints (models.Model):
    FootprintId = models.AutoField(primary_key=True)
    FootprintValue = models.DecimalField(max_digits=4, decimal_places=2)
    FootprintGender = models.CharField(max_length=100)
    FootprintCountry = models.CharField(max_length=200)
    FootprintAge = models.IntegerField()

