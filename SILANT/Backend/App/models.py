from django.db import models
from django.contrib.auth.models import User


class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name_company = models.CharField(max_length=128, verbose_name='Название компании')

    def __str__(self):
        return f'{self.name_company}'

    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'


class ServiceCompany(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name_company = models.CharField(max_length=128, verbose_name='Название компании')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return f'{self.name_company}'

    class Meta:
        verbose_name = 'Сервисная компания'
        verbose_name_plural = 'Сервисные компании'


class ReferenceBooks(models.Model):
    reference_type = models.CharField(max_length=128, verbose_name='Тип справочника')
    name = models.CharField(max_length=128, verbose_name='Название')
    content = models.TextField(blank=True, null=True, verbose_name='Описание')

    def __str__(self):
        return f'{self.reference_type}: {self.name}'

    class Meta:
        unique_together = ('reference_type', 'name')
        verbose_name = 'Cправочник'
        verbose_name_plural = 'Справочники'


class Machine(models.Model):
    factory_number = models.CharField(max_length=16, unique=True, verbose_name='Зав. № машины')
    machine_model = models.ForeignKey(ReferenceBooks,on_delete=models.RESTRICT, related_name='machine_models',
                                      verbose_name='Модель техники')
    engine_model = models.ForeignKey(ReferenceBooks,on_delete=models.RESTRICT, related_name='engine_models',
                                     verbose_name='Модель двигателя')
    engine_factory_num = models.CharField(max_length=16, unique=True, verbose_name='Зав. № двигателя')
    transmission_model = models.ForeignKey(ReferenceBooks,on_delete=models.RESTRICT, related_name='transmission_models',
                                           verbose_name='Модель трансмиссии')
    factory_num_transmission = models.CharField(max_length=16, unique=True, verbose_name='Зав. № трансмиссии')
    drive_axle_model = models.ForeignKey(ReferenceBooks,on_delete=models.RESTRICT, related_name='drive_axle_models',
                                         verbose_name='Модель ведущего моста')
    factory_num_drive_axle = models.CharField(max_length=16, unique=True, verbose_name='Зав. № ведущего моста')
    guiding_bridge_model = models.ForeignKey(ReferenceBooks, on_delete=models.RESTRICT,
                                             related_name='guiding_bridge_models',
                                             verbose_name='Модель управляемого моста')
    factory_num_guiding_bridge = models.CharField(max_length=16, unique=True, verbose_name='Зав. № управляемого моста')
    delivery_agreement = models.CharField(max_length=32, unique=True, verbose_name='Договор поставки №, дата')
    date_shipment_factory = models.DateField(verbose_name='Дата отгрузки с завода')
    consignee = models.CharField(max_length=128, verbose_name='Грузополучатель (конечный потребитель)')
    shipping_address = models.CharField(max_length=256, verbose_name='Адрес поставки (эксплуатации)')
    equipment = models.TextField(verbose_name='Комплектация (доп. опции)')
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, blank=True, related_name='clients',
                               verbose_name='Клиент')
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.RESTRICT, related_name='service_companies',
                                        verbose_name='Сервисная компания')

    def __str__(self):
        return f"{self.factory_number}"

    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'


class TechMaintenance(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, verbose_name='Машина')
    type_maintenance = models.ForeignKey(ReferenceBooks, on_delete=models.RESTRICT, related_name='type_maintenance',
                                         verbose_name='Вид ТО')
    date_maintenance = models.DateField(verbose_name='Дата проведения ТО')
    operating_time = models.IntegerField(verbose_name='Наработка, м/час')
    order_number = models.CharField(max_length=64, verbose_name='№ заказ-наряда')
    order_date = models.DateField(verbose_name='Дата заказ-наряда')
    organization_maintenance = models.ForeignKey(ReferenceBooks, null=True, blank=True, on_delete=models.RESTRICT,
                                                 verbose_name='Организация, проводившая ТО')
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.RESTRICT, verbose_name='Сервисная компания')

    def __str__(self):
        maintenance = self.type_maintenance.name if self.type_maintenance else 'unknown'
        organization_name = self.organization_maintenance.name if self.organization_maintenance else 'unknown'
        return f"{maintenance} on {self.date_maintenance} by {organization_name}"

    class Meta:
        verbose_name = 'ТО машины'
        verbose_name_plural = 'ТО машин'


class Complaints(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, verbose_name='Машина')
    date_machine_failure = models.DateField(verbose_name='Дата отказа')
    operating_time = models.IntegerField(verbose_name='Наработка, м/час')
    machine_failure_node = models.ForeignKey(ReferenceBooks, null=True, blank=True, on_delete=models.RESTRICT,
                                             related_name='machine_failure_nodes', verbose_name='Узел отказа')
    description_machine_failure = models.TextField(verbose_name='Описание отказа')
    method_restoring = models.ForeignKey(ReferenceBooks, null=True, blank=True, on_delete=models.RESTRICT,
                                         related_name='methods_restoring', verbose_name='Способ восстановления')
    used_spare_parts = models.TextField(blank=True, null=True, verbose_name='Используемые запасные части')
    date_restoration = models.DateField(verbose_name='Дата восстановления')
    machine_downtime = models.IntegerField(editable=False, verbose_name='Время простоя техники')
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.RESTRICT, verbose_name='Сервисная компания')

    def __str__(self):
        return f"{self.machine_failure_node} - {self.date_machine_failure}"

    def save(self, *args, **kwargs):
        if self.date_restoration and self.date_machine_failure:
            self.machine_downtime = (self.date_restoration - self.date_machine_failure).days
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'


# Create your models here.
