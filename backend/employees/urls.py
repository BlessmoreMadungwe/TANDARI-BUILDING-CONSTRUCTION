from django.urls import path

from . import views

urlpatterns = [
    path("employees/", views.employees, name="employees"),
    path("employees/<int:employee_id>/", views.employee_detail, name="employee-detail"),
]
