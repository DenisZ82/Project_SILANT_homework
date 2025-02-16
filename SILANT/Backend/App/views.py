from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import viewsets, permissions, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import *
from .models import *


# class UserGroupsView(APIView):
#     def get(self, request, *args, **kwargs):
#         user = request.user
#         groups = user.groups.all()
#         return Response({'groups': [group.name for group in groups]})


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]


class ClientViewset(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]


class ServiceCompanyViewset(viewsets.ModelViewSet):
    queryset = ServiceCompany.objects.all()
    serializer_class = ServiceCompanySerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]


class ReferenceBooksViewset(viewsets.ModelViewSet):
    queryset = ReferenceBooks.objects.all()
    serializer_class = ReferenceBooksSerializer


class MachineViewset(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer


class TechMaintenanceViewset(viewsets.ModelViewSet):
    queryset = TechMaintenance.objects.all()
    serializer_class = TechMaintenanceSerializer


class ComplaintsViewset(viewsets.ModelViewSet):
    queryset = Complaints.objects.all()
    serializer_class = ComplaintsSerializer

# Create your views here.
