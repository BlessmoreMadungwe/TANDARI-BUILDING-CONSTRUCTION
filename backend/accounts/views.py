from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST, require_http_methods

from core.utils import parse_json, require_staff, validate_required
from .serializers import serialize_user


# Logs an admin/staff user into the Django session.
@csrf_exempt
@require_POST
def login_user(request):
    data = parse_json(request)
    user = authenticate(
        request,
        username=data.get("username", "").strip(),
        password=data.get("password", ""),
    )
    if user is None:
        return JsonResponse({"error": "Invalid username or password."}, status=400)

    login(request, user)
    return JsonResponse({"message": "Login successful.", "user": serialize_user(user)})


# Logs out the current session.
@csrf_exempt
@require_POST
def logout_user(request):
    logout(request)
    return JsonResponse({"message": "Logout successful."})


# Returns the current logged-in user, or anonymous state.
@require_GET
def current_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({"authenticated": False})
    return JsonResponse({"authenticated": True, "user": serialize_user(request.user)})


# Staff-only user management endpoint for a future custom admin dashboard.
@csrf_exempt
@require_http_methods(["GET", "POST"])
def users(request):
    auth_error = require_staff(request)
    if auth_error:
        return auth_error

    if request.method == "GET":
        return JsonResponse({"users": [serialize_user(user) for user in User.objects.order_by("username")]})

    data = parse_json(request)
    error = validate_required(data, ["username", "password"])
    if error:
        return JsonResponse({"error": error}, status=400)

    user = User.objects.create_user(
        username=data["username"].strip(),
        password=data["password"],
        email=data.get("email", "").strip(),
        first_name=data.get("first_name", "").strip(),
        last_name=data.get("last_name", "").strip(),
        is_staff=bool(data.get("is_staff", False)),
    )
    return JsonResponse({"message": "User created.", "user": serialize_user(user)}, status=201)
