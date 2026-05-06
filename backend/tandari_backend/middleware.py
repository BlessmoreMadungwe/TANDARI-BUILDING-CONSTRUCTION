from django.http import HttpResponse
from django.conf import settings


# Minimal CORS middleware for local React-to-Django requests.
class SimpleCorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Browsers send OPTIONS before some POST requests; respond immediately.
        if request.method == "OPTIONS":
            response = HttpResponse()
        else:
            response = self.get_response(request)

        origin = request.headers.get("Origin")
        if origin in settings.CORS_ALLOWED_ORIGINS:
            # Only allow configured frontend origins to call the API from a browser.
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Credentials"] = "true"
            response["Access-Control-Allow-Headers"] = "Content-Type"
            response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"

        return response
