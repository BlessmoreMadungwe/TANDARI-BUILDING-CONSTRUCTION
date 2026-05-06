import json

from django.http import JsonResponse


# Safely parses JSON request bodies. Invalid JSON becomes an empty dictionary.
def parse_json(request):
    try:
        return json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return {}


# Checks required fields and returns a human-readable error message.
def validate_required(data, fields):
    for field in fields:
        if not str(data.get(field, "")).strip():
            return f"{field.replace('_', ' ').title()} is required."
    return ""


def require_staff(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Login required."}, status=401)
    if not request.user.is_staff:
        return JsonResponse({"error": "Admin permission required."}, status=403)
    return None


def request_data(request):
    if request.content_type and request.content_type.startswith("multipart/form-data"):
        return request.POST
    return parse_json(request)


def update_model(instance, payload):
    for field, value in payload.items():
        setattr(instance, field, value)
    instance.save()
