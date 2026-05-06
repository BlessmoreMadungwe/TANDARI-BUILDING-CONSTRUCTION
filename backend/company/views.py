from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .content import SITE_CONTENT


# Returns static website content as JSON for future frontend/API use.
@require_GET
def site_content(request):
    return JsonResponse(SITE_CONTENT)
