from django.contrib import admin

from company.models import Project, ProjectImage


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "status", "estimated_value", "is_featured", "created_at")
    list_filter = ("status", "is_featured", "created_at")
    search_fields = ("title", "description", "location", "client_name")
    inlines = [ProjectImageInline]
