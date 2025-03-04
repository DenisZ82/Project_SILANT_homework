from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly

from .serializers import *
from .models import *


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class ClientViewset(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]


class ServiceCompanyViewset(viewsets.ModelViewSet):
    queryset = ServiceCompany.objects.all()
    serializer_class = ServiceCompanySerializer
    permission_classes = [IsAuthenticated]


class ReferenceBooksViewset(viewsets.ModelViewSet):
    queryset = ReferenceBooks.objects.all()
    serializer_class = ReferenceBooksSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


class MachineViewset(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


class TechMaintenanceViewset(viewsets.ModelViewSet):
    queryset = TechMaintenance.objects.all()
    serializer_class = TechMaintenanceSerializer
    permission_classes = [DjangoModelPermissions]


class ComplaintsViewset(viewsets.ModelViewSet):
    queryset = Complaints.objects.all()
    serializer_class = ComplaintsSerializer
    permission_classes = [DjangoModelPermissions]

# Create your views here.
