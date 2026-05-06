from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.urls import include, path


def backend_home(request):
    return JsonResponse(
        {
            "message": "Tandari backend is running.",
            "frontend": "http://127.0.0.1:5174/",
            "react_admin": "http://127.0.0.1:5174/admin",
            "django_admin": "http://127.0.0.1:8000/admin/",
            "api": "http://127.0.0.1:8000/api/",
        }
    )


urlpatterns = [
    path("", backend_home, name="backend-home"),
    path("admin/", admin.site.urls),
    path("api/", include("company.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
