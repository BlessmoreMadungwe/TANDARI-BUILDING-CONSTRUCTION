from decimal import Decimal, InvalidOperation

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from company.models import PaymentTransaction, QuoteRequest
from core.utils import parse_json, validate_required
from .serializers import serialize_payment


# Creates a payment transaction record. Real charging requires EcoCash/card provider credentials.
@csrf_exempt
@require_POST
def initiate_payment(request):
    data = parse_json(request)
    error = validate_required(data, ["customer_name", "amount", "method"])
    if error:
        return JsonResponse({"error": error}, status=400)

    try:
        amount = Decimal(str(data["amount"]))
    except (InvalidOperation, ValueError):
        return JsonResponse({"error": "Amount must be a valid number."}, status=400)

    if data["method"] not in dict(PaymentTransaction.METHOD_CHOICES):
        return JsonResponse({"error": "Payment method must be ECOCASH, MASTERCARD, or VISA."}, status=400)

    quote_request = None
    if data.get("quote_request_id"):
        try:
            quote_request = QuoteRequest.objects.get(id=data["quote_request_id"])
        except QuoteRequest.DoesNotExist:
            return JsonResponse({"error": "Quote request not found."}, status=404)

    payment = PaymentTransaction.objects.create(
        quote_request=quote_request,
        customer_name=data["customer_name"].strip(),
        email=data.get("email", "").strip(),
        phone=data.get("phone", "").strip(),
        amount=amount,
        currency=data.get("currency", "USD").strip().upper(),
        method=data["method"],
        notes="Payment request created. Connect provider API credentials to process live payments.",
    )
    return JsonResponse(
        {
            "message": "Payment request created.",
            "payment": serialize_payment(payment),
            "next_step": "Connect EcoCash or card gateway credentials before taking live payments.",
        },
        status=201,
    )


@require_GET
def payment_options(request):
    return JsonResponse(
        {
            "methods": [
                {"code": "ECOCASH", "label": "EcoCash mobile money"},
                {"code": "MASTERCARD", "label": "Mastercard"},
                {"code": "VISA", "label": "Visa"},
            ],
            "note": "Live payment processing needs provider merchant credentials and callback URLs.",
        }
    )
