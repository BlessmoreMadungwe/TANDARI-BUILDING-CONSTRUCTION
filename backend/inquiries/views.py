from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_http_methods

from company.models import ContactInquiry, QuoteRequest
from core.utils import parse_json, require_staff, validate_required
from .serializers import serialize_contact, serialize_quote


# Receives the Contact page message form and saves it to the database.
@csrf_exempt
@require_POST
def contact(request):
    data = parse_json(request)
    error = validate_required(data, ["name", "email", "phone", "message"])
    if error:
        return JsonResponse({"error": error}, status=400)

    try:
        validate_email(data["email"])
    except Exception:
        return JsonResponse({"error": "Please provide a valid email address."}, status=400)

    inquiry = ContactInquiry.objects.create(
        name=data["name"].strip(),
        email=data["email"].strip(),
        phone=data["phone"].strip(),
        message=data["message"].strip(),
    )
    return JsonResponse({"message": "Contact inquiry received.", "id": inquiry.id}, status=201)


# Receives project quote requests and saves them for admin follow-up.
@csrf_exempt
@require_POST
def quote(request):
    data = parse_json(request)
    error = validate_required(data, ["name", "phone", "project_type", "details"])
    if error:
        return JsonResponse({"error": error}, status=400)

    quote_request = QuoteRequest.objects.create(
        name=data["name"].strip(),
        email=data.get("email", "").strip(),
        phone=data["phone"].strip(),
        project_type=data["project_type"].strip(),
        location=data.get("location", "").strip(),
        budget=data.get("budget", "").strip(),
        details=data["details"].strip(),
    )
    return JsonResponse({"message": "Quote request received.", "id": quote_request.id}, status=201)


# Admin message inbox for contact form submissions.
@csrf_exempt
@require_http_methods(["GET", "PUT"])
def messages(request):
    auth_error = require_staff(request)
    if auth_error:
        return auth_error

    if request.method == "GET":
        return JsonResponse({"messages": [serialize_contact(message) for message in ContactInquiry.objects.all()]})

    data = parse_json(request)
    message_id = data.get("id")
    status = data.get("status")
    if not message_id or not status:
        return JsonResponse({"error": "Message id and status are required."}, status=400)

    try:
        message = ContactInquiry.objects.get(id=message_id)
    except ContactInquiry.DoesNotExist:
        return JsonResponse({"error": "Message not found."}, status=404)

    message.status = status
    message.save(update_fields=["status"])
    return JsonResponse({"message": "Message status updated.", "contact": serialize_contact(message)})


# Lists quote requests for admin review.
@csrf_exempt
@require_http_methods(["GET", "PUT"])
def quote_requests(request):
    auth_error = require_staff(request)
    if auth_error:
        return auth_error

    if request.method == "GET":
        return JsonResponse({"quotes": [serialize_quote(quote) for quote in QuoteRequest.objects.all()]})

    data = parse_json(request)
    quote_id = data.get("id")
    status = data.get("status")
    if not quote_id or not status:
        return JsonResponse({"error": "Quote id and status are required."}, status=400)

    try:
        quote_request = QuoteRequest.objects.get(id=quote_id)
    except QuoteRequest.DoesNotExist:
        return JsonResponse({"error": "Quote request not found."}, status=404)

    quote_request.status = status
    quote_request.save(update_fields=["status"])
    return JsonResponse({"message": "Quote status updated.", "quote": serialize_quote(quote_request)})
