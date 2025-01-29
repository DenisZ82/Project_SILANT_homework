from rest_framework import serializers
from django.contrib.auth.models import Group

from .models import *


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    group_name = GroupSerializer(source='groups', many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'group_name']


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = ['id', 'name_company']


class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = ['id', 'name_company', 'description']


class ReferenceBooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferenceBooks
        fields = ['id', 'reference_type', 'name', 'content']


class MachineSerializer(serializers.ModelSerializer):
    machine_model = ReferenceBooksSerializer()
    engine_model = ReferenceBooksSerializer()
    transmission_model = ReferenceBooksSerializer()
    drive_axle_model = ReferenceBooksSerializer()
    guiding_bridge_model = ReferenceBooksSerializer()
    client = UserSerializer()
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


class TechMaintenanceSerializer(serializers.ModelSerializer):
    machine_factory_number = serializers.CharField(source='machine.factory_number')
    type_maintenance_name = serializers.CharField(source='type_maintenance.name')
    organization_maintenance = serializers.CharField(source='organization_maintenance.name')
    service_company = ServiceCompanySerializer()
    # service_company = ServiceCompanySerializer(source='service_company')

    class Meta:
        model = TechMaintenance
        fields = [
            'id',
            'machine_factory_number',
            'type_maintenance_name',
            'date_maintenance',
            'operating_time',
            'order_number',
            'order_date',
            'organization_maintenance',
            'service_company'
        ]


class ComplaintsSerializer(serializers.ModelSerializer):
    machine_factory_number = serializers.CharField(source='machine.factory_number')
    machine_failure_node = serializers.CharField(source='machine_failure_node.name')
    method_restoring = serializers.CharField(source='method_restoring.name')
    service_company = ServiceCompanySerializer()

    class Meta:
        model = Complaints
        fields = [
            'id',
            'date_machine_failure',
            'operating_time',
            'description_machine_failure',
            'used_spare_parts',
            'date_restoration',
            'machine_downtime',
            'machine_factory_number',
            'machine_failure_node',
            'method_restoring',
            'service_company'
        ]
        read_only_fields = [
            'machine_factory_number',
            'machine_failure_node',
            'method_restoring'
        ]
