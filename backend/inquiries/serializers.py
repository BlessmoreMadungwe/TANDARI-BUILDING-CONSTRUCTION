def serialize_contact(message):
    return {
        "id": message.id,
        "name": message.name,
        "email": message.email,
        "phone": message.phone,
        "message": message.message,
        "status": message.status,
        "created_at": message.created_at.isoformat(),
    }


def serialize_quote(quote_request):
    return {
        "id": quote_request.id,
        "name": quote_request.name,
        "email": quote_request.email,
        "phone": quote_request.phone,
        "project_type": quote_request.project_type,
        "location": quote_request.location,
        "budget": quote_request.budget,
        "details": quote_request.details,
        "status": quote_request.status,
        "created_at": quote_request.created_at.isoformat(),
    }
