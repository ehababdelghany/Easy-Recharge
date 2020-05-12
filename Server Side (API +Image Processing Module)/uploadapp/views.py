from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import JsonResponse
from .serializers import FileSerializer
import processing as p
import json
import base64
import random

# function for API
class FileUploadView(APIView):
    # parser term
    parser_class = (FileUploadParser,)

    # post request processing
    def post(self, request, *args, **kwargs):
        # call the serilizer
        # file_serializer = FileSerializer(data=request.data)
        #
        try:
            # take image from the json body in base64 format
            load = json.loads(request.body)
            # result = str(load * 10)
            # Assign name for the image
            filename = "media/"+"image" + str(random.randint(0, 1000000)) + ".jpg"
            fh = open(filename, "wb")
            # Decode the image and save it as jpg image
            fh.write(base64.b64decode(load))
            fh.close()
            # Create output Dictionary for the output data 
            output = {}
            # Get the card Number and assign it to the Dictionary
            output['cardNo'] = str(p.getCardNO(filename))
            # Get the Comapany Type and assign it to the Dictionary
            output['company'] = p.NameC(filename)
            # Get the path of the image and assign it in the Dictionary
            output['path'] = "/" + filename
            return JsonResponse(output, safe=False)
        except ValueError as e:
            # Return BAD_REQUEST if the value is invalid
            return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
        # # check file validation
        # if file_serializer.is_valid():
        #     # save the image
        #     file_serializer.save()
        #     # get card Number
        #     cardNo = processing.getCardNO(file_serializer.data['file'][1:])
        #     # get company type like ('orange, vodafon, etc...')
        #     company = processing.NameC(file_serializer.data['file'][1:])
        #
        #     # create json dictionary for the output data
        #     outputData = {}
        #     # the card serial number
        #     # print(type(str(cardNo)))
        #     outputData['cardNo'] = str(cardNo)
        #     # the company type
        #     outputData['company'] = company
        #     # the path of the image uploaded
        #     outputData['path'] = file_serializer.data['file']
        #     # print(file_serializer.data['file'][1:])
        #     # send response
        #     return Response(outputData, status=status.HTTP_201_CREATED)
        # # handle the exception errors
        # else:
        #     return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)