from django.urls import path

from . import views

urlpatterns = [
    path("payments/options/", views.payment_options, name="payment-options"),
    path("payments/initiate/", views.initiate_payment, name="initiate-payment"),
]
