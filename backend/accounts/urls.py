from django.urls import path

from . import views

urlpatterns = [
    path("auth/login/", views.login_user, name="login-user"),
    path("auth/logout/", views.logout_user, name="logout-user"),
    path("auth/me/", views.current_user, name="current-user"),
    path("admin/users/", views.users, name="users"),
]
