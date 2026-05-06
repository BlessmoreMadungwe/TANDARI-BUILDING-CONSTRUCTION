from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from company.models import Employee
from core.utils import request_data, require_staff, update_model
from .serializers import serialize_employee


# Staff-only employee CRUD.
@csrf_exempt
@require_http_methods(["GET", "POST"])
def employees(request):
    if request.method == "GET":
        return JsonResponse({"employees": [serialize_employee(employee) for employee in Employee.objects.all()]})

    auth_error = require_staff(request)
    if auth_error:
        return auth_error

    employee = Employee.objects.create(**employee_payload(request))
    if request.FILES.get("photo"):
        employee.photo = request.FILES["photo"]
        employee.save(update_fields=["photo"])
    return JsonResponse({"message": "Employee created.", "employee": serialize_employee(employee)}, status=201)


@csrf_exempt
@require_http_methods(["GET", "PUT", "DELETE"])
def employee_detail(request, employee_id):
    try:
        employee = Employee.objects.get(id=employee_id)
    except Employee.DoesNotExist:
        return JsonResponse({"error": "Employee not found."}, status=404)

    if request.method == "GET":
        return JsonResponse({"employee": serialize_employee(employee)})

    auth_error = require_staff(request)
    if auth_error:
        return auth_error

    if request.method == "DELETE":
        employee.delete()
        return JsonResponse({"message": "Employee deleted."})

    update_model(employee, employee_payload(request))
    return JsonResponse({"message": "Employee updated.", "employee": serialize_employee(employee)})


def employee_payload(request):
    data = request_data(request)
    return {
        "full_name": data.get("full_name", "").strip(),
        "role": data.get("role", "").strip(),
        "department": data.get("department", "LABOUR").strip(),
        "phone": data.get("phone", "").strip(),
        "email": data.get("email", "").strip(),
        "bio": data.get("bio", "").strip(),
        "is_active": str(data.get("is_active", "true")).lower() not in {"false", "0", "no"},
    }
