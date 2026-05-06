from django.contrib import admin

from company.models import ContactInquiry, QuoteRequest


# Admin table for reviewing messages sent through the Contact page.
@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("name", "email", "phone", "message")
    readonly_fields = ("created_at",)


# Admin table for reviewing project quote requests.
@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "project_type", "location", "status", "created_at")
    list_filter = ("status", "project_type", "created_at")
    search_fields = ("name", "phone", "project_type", "location", "details")
    readonly_fields = ("created_at",)
