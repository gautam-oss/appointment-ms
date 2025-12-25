from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Doctor, Patient, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer, UserSerializer
from rest_framework.response import Response

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        data = [{'id': p.id, 'name': p.user.username} for p in self.queryset]
        return Response(data)

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    # Enable filtering
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['patient'] # Allows /api/appointments/?patient=ID
