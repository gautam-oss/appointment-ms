from django.contrib import admin
from .models import Doctor, Patient, Appointment

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'specialty', 'is_available')

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'doctor', 'patient', 'date_time', 'status')
    list_filter = ('status', 'date_time')
