from django.urls import path

from . import views

urlpatterns = [
    path("contact/", views.contact, name="contact"),
    path("quote/", views.quote, name="quote"),
    path("admin/messages/", views.messages, name="messages"),
    path("admin/quotes/", views.quote_requests, name="quote-requests"),
]
