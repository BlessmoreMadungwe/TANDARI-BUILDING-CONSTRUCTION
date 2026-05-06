def serialize_project(project):
    return {
        "id": project.id,
        "title": project.title,
        "description": project.description,
        "location": project.location,
        "client_name": project.client_name,
        "status": project.status,
        "estimated_value": project.estimated_value,
        "cover_image": project.cover_image.url if project.cover_image else "",
        "is_featured": project.is_featured,
        "created_at": project.created_at.isoformat(),
        "updated_at": project.updated_at.isoformat(),
        "images": [serialize_project_image(image) for image in project.images.all()],
    }


def serialize_project_image(project_image):
    return {
        "id": project_image.id,
        "image": project_image.image.url if project_image.image else "",
        "caption": project_image.caption,
        "uploaded_at": project_image.uploaded_at.isoformat(),
    }
