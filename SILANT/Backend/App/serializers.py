from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework import permissions
from fields_permissions.mixins import FieldPermissionMixin
from dj_rest_auth.serializers import UserDetailsSerializer

from .models import *


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']


class ClientSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = Client
        fields = ['id', 'user_id', 'name_company']


class ServiceCompanySerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = ServiceCompany
        fields = ['id', 'user_id', 'name_company', 'description']


class UserSerializer(serializers.ModelSerializer):
    group_name = GroupSerializer(source='groups', many=True, read_only=True)
    client = ClientSerializer(source='name_company', many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'group_name', 'client']


class CustomUserDetailsSerializer(UserDetailsSerializer):
    group_name = serializers.SerializerMethodField()
    client = serializers.SerializerMethodField()
    service = serializers.SerializerMethodField()
    assigned_service = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['pk', 'username', 'email', 'first_name', 'last_name', 'group_name', 'client', 'service',
                  'assigned_service']

    def get_group_name(self, obj):
        return list(obj.groups.values_list('name', flat=True))  # Преобразуем QuerySet в список

    def get_client(self, obj):
        client = Client.objects.filter(user=obj).first()  # Ищем объект Client по user
        return client.name_company if client else None  # Если найден - возвращаем, иначе None

    def get_service(self, obj):
        service = ServiceCompany.objects.filter(user=obj).first()  # Ищем объект ServiceCompany по user
        return service.name_company if service else None  # Если найден - возвращаем, иначе None

    #  Собираем все сервисные компании связанные с машинами клиента
    def get_assigned_service(self, obj):
        assigned_service = set()
        for machine in Machine.objects.filter(client__user=obj):
            machine_ = machine.service_company.name_company
            assigned_service.add(machine_ if machine_ else None)
        return list(assigned_service)


class ReferenceBooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferenceBooks
        fields = ['id', 'reference_type', 'name', 'content']


class MachineSerializer(FieldPermissionMixin, serializers.ModelSerializer):
    machine_model = ReferenceBooksSerializer()
    engine_model = ReferenceBooksSerializer()
    transmission_model = ReferenceBooksSerializer()
    drive_axle_model = ReferenceBooksSerializer()
    guiding_bridge_model = ReferenceBooksSerializer()
    client = ClientSerializer()
    service_company = ServiceCompanySerializer()

    class Meta:
        model = Machine
        fields = ['id',
                  'factory_number',
                  'engine_factory_num',
                  'factory_num_transmission',
                  'factory_num_drive_axle',
                  'factory_num_guiding_bridge',
                  'delivery_agreement',
                  'date_shipment_factory',
                  'consignee',
                  'shipping_address',
                  'equipment',
                  'drive_axle_model',
                  'machine_model',
                  'engine_model',
                  'transmission_model',
                  'guiding_bridge_model',
                  'client',
                  'service_company'
                  ]

        read_only_fields = ['machine_model',
                            'engine_model',
                            'transmission_model',
                            'drive_axle_model',
                            'guiding_bridge_model',
                            'client',
                            'service_company']

        show_only_for = {
            'fields': ('client', 'service_company', 'consignee', 'shipping_address', 'delivery_agreement',
                       'date_shipment_factory', 'equipment'),
            'permission_classes': (permissions.IsAuthenticatedOrReadOnly,)
        }


class TechMaintenanceSerializer(serializers.ModelSerializer):
    client = ClientSerializer(source='machine.client')
    machine_model = ReferenceBooksSerializer(source='machine.machine_model')
    machine_factory_number = serializers.CharField(source='machine.factory_number')
    type_maintenance_name = serializers.CharField(source='type_maintenance.name')
    organization_maintenance = serializers.CharField(source='organization_maintenance.name')
    service_company = ServiceCompanySerializer()

    class Meta:
        model = TechMaintenance
        fields = [
            'id',
            'machine_model',
            'machine_factory_number',
            'type_maintenance_name',
            'date_maintenance',
            'operating_time',
            'order_number',
            'order_date',
            'organization_maintenance',
            'service_company',
            'client',
        ]


class ComplaintsSerializer(serializers.ModelSerializer):
    client = ClientSerializer(source='machine.client')
    machine_model = ReferenceBooksSerializer(source='machine.machine_model')
    machine_factory_number = serializers.CharField(source='machine.factory_number')
    machine_failure_node = serializers.CharField(source='machine_failure_node.name')
    method_restoring = serializers.CharField(source='method_restoring.name')
    service_company = ServiceCompanySerializer()

    class Meta:
        model = Complaints
        fields = [
            'id',
            'machine_model',
            'date_machine_failure',
            'operating_time',
            'description_machine_failure',
            'used_spare_parts',
            'date_restoration',
            'machine_downtime',
            'machine_factory_number',
            'machine_failure_node',
            'method_restoring',
            'service_company',
            'client',
        ]
        read_only_fields = [
            'machine_factory_number',
            'machine_failure_node',
            'method_restoring'
        ]
