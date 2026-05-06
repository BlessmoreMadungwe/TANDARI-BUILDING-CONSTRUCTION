from django.urls import include, path

from . import views

# API routes used by the React frontend.
urlpatterns = [
    path("site-content/", views.site_content, name="site-content"),
    path("", include("accounts.urls")),
    path("", include("employees.urls")),
    path("", include("projects.urls")),
    path("", include("inquiries.urls")),
    path("", include("payments.urls")),
]
