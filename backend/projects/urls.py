from django.urls import path

from . import views

urlpatterns = [
    path("projects/", views.projects, name="projects"),
    path("projects/<int:project_id>/", views.project_detail, name="project-detail"),
    path("projects/<int:project_id>/images/", views.project_images, name="project-images"),
]
