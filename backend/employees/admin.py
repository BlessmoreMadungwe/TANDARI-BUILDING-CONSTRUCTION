from django.contrib import admin

from company.models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ("full_name", "role", "department", "phone", "email", "is_active")
    list_filter = ("department", "is_active")
    search_fields = ("full_name", "role", "phone", "email")
