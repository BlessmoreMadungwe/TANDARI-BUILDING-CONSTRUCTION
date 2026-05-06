def serialize_employee(employee):
    return {
        "id": employee.id,
        "full_name": employee.full_name,
        "role": employee.role,
        "department": employee.department,
        "phone": employee.phone,
        "email": employee.email,
        "bio": employee.bio,
        "photo": employee.photo.url if employee.photo else "",
        "is_active": employee.is_active,
        "created_at": employee.created_at.isoformat(),
    }
