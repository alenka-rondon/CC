from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt #allows other domains to access our methods
from rest_framework.parsers import JSONParser #parse incoming data into data model 
from django.http.response import JsonResponse

from UsersApp.models import Footprints
from UsersApp.serializers import FootprintSerializer

#Creating API methods
@csrf_exempt
def footprintApi(request, id=0):
    if request.method == 'GET':
        footprints = Footprints.objects.all()
        foortprints_serializer = FootprintSerializer(footprints, many=True)
        return JsonResponse(foortprints_serializer.data, safe=False)
    elif request.method == 'POST':
        footprint_data = JSONParser().parse(request)
        foortprints_serializer = FootprintSerializer(data=footprint_data)
        if foortprints_serializer.is_valid():
            foortprints_serializer.save()
            return JsonResponse("Posted successfully",safe=False)
        return JsonResponse("Not posted successfully",safe=False)
    elif request.method == 'PUT':
        footprint_data = JSONParser().parse(request)
        footprint = Footprints.objects.get(FootprintId = footprint_data['FootprintId'])
        foortprints_serializer= FootprintSerializer(footprint, data=footprint_data)
        if foortprints_serializer.is_valid():
            foortprints_serializer.save()
            return JsonResponse("Updated successfully",safe=False)
        return JsonResponse("Not updated successfully", safe=False)
    elif request.method == 'DELETE':
        footprint = Footprints.objects.get(FootprintId = id)
        footprint.delete()
        return JsonResponse("Deleted Successfuly", safe=False)
        



