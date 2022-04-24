#this will help convert model instances into python data types that are easily renderible 

from rest_framework import serializers
from UsersApp.models import Footprints

class FootprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footprints
        fields = ("FootprintId", "FootprintValue", "FootprintGender", "FootprintCountry", "FootprintAge")