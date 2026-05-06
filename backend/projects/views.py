from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_http_methods

from company.models import Project, ProjectImage
from core.utils import request_data, require_staff, update_model
from .serializers import serialize_project, serialize_project_image


# Project CRUD. GET is public for portfolio display; write actions require staff.
@csrf_exempt
@require_http_methods(["GET", "POST"])
def projects(request):
    if request.method == "GET":
        return JsonResponse({"projects": [serialize_project(project) for project in Project.objects.prefetch_related("images")]})

    auth_error = require_staff(request)
    if auth_error:
        return auth_error

    project = Project.objects.create(**project_payload(request))
    if request.FILES.get("cover_image"):
        project.cover_image = request.FILES["cover_image"]
        project.save(update_fields=["cover_image"])
    return JsonResponse({"message": "Project created.", "project": serialize_project(project)}, status=201)


@csrf_exempt
@require_http_methods(["GET", "PUT", "DELETE"])
def project_detail(request, project_id):
    try:
        project = Project.objects.prefetch_related("images").get(id=project_id)
    except Project.DoesNotExist:
        return JsonResponse({"error": "Project not found."}, status=404)

    if request.method == "GET":
        return JsonResponse({"project": serialize_project(project)})

    auth_error = require_staff(request)
    if auth_error:
        return auth_error

    if request.method == "DELETE":
        project.delete()
        return JsonResponse({"message": "Project deleted."})

    update_model(project, project_payload(request))
    return JsonResponse({"message": "Project updated.", "project": serialize_project(project)})


# Uploads additional pictures for an existing project.
@csrf_exempt
@require_POST
def project_images(request, project_id):
    auth_error = require_staff(request)
    if auth_error:
        return auth_error

    try:
        project = Project.objects.get(id=project_id)
    except Project.DoesNotExist:
        return JsonResponse({"error": "Project not found."}, status=404)

    image = request.FILES.get("image")
    if image is None:
        return JsonResponse({"error": "Image file is required."}, status=400)

    project_image = ProjectImage.objects.create(
        project=project,
        image=image,
        caption=request.POST.get("caption", ""),
    )
    return JsonResponse({"message": "Project image uploaded.", "image": serialize_project_image(project_image)}, status=201)


def project_payload(request):
    data = request_data(request)
    return {
        "title": data.get("title", "").strip(),
        "description": data.get("description", "").strip(),
        "location": data.get("location", "").strip(),
        "client_name": data.get("client_name", "").strip(),
        "status": data.get("status", "PLANNING").strip(),
        "estimated_value": data.get("estimated_value", "").strip(),
        "is_featured": str(data.get("is_featured", "false")).lower() in {"true", "1", "yes"},
    }
