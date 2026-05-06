def serialize_payment(payment):
    return {
        "id": payment.id,
        "quote_request_id": payment.quote_request_id,
        "customer_name": payment.customer_name,
        "email": payment.email,
        "phone": payment.phone,
        "amount": str(payment.amount),
        "currency": payment.currency,
        "method": payment.method,
        "status": payment.status,
        "provider_reference": payment.provider_reference,
        "notes": payment.notes,
        "created_at": payment.created_at.isoformat(),
    }
