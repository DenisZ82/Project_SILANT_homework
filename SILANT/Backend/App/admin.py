from django.contrib import admin
from .models import *


class MachineAdmin(admin.ModelAdmin):
    list_display = ('id', 'factory_number', 'machine_model__name', 'engine_model__name', 'engine_factory_num',
                    'transmission_model__name', 'factory_num_transmission', 'drive_axle_model__name',
                    'factory_num_drive_axle', 'guiding_bridge_model__name', 'factory_num_guiding_bridge',
                    'delivery_agreement', 'date_shipment_factory', 'consignee', 'shipping_address', 'equipment',
                    'client', 'service_company')

    # list_filter = ('id', 'factory_number', 'machine_model', 'engine_model', 'engine_factory_num',
    # 'transmission_model')


class TechMaintenanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'machine', 'type_maintenance__name', 'date_maintenance', 'operating_time', 'order_number',
                    'order_date', 'organization_maintenance__name', 'service_company')


class ComplaintsAdmin(admin.ModelAdmin):
    list_display = ('id', 'machine', 'date_machine_failure', 'operating_time', 'machine_failure_node__name',
                    'date_restoration', 'machine_downtime')


admin.site.register(Client)
admin.site.register(ServiceCompany)
admin.site.register(ReferenceBooks)
admin.site.register(Machine, MachineAdmin)
admin.site.register(TechMaintenance, TechMaintenanceAdmin)
admin.site.register(Complaints, ComplaintsAdmin)

# Register your models here.
