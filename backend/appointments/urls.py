from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, AppointmentViewSet, PatientViewSet

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'patients', PatientViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
