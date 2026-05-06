from django.db import models


# Stores messages submitted from the Contact page form.
class ContactInquiry(models.Model):
    STATUS_CHOICES = [
        ("NEW", "New"),
        ("READ", "Read"),
        ("REPLIED", "Replied"),
        ("ARCHIVED", "Archived"),
    ]

    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="NEW")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "contact inquiries"

    def __str__(self):
        # Display a readable label in the Django admin.
        return f"{self.name} - {self.email}"


# Stores project quote requests submitted from the Quote form.
class QuoteRequest(models.Model):
    STATUS_CHOICES = [
        ("NEW", "New"),
        ("REVIEWING", "Reviewing"),
        ("QUOTED", "Quoted"),
        ("ACCEPTED", "Accepted"),
        ("DECLINED", "Declined"),
    ]

    name = models.CharField(max_length=120)
    email = models.EmailField(blank=True, default="")
    phone = models.CharField(max_length=40)
    project_type = models.CharField(max_length=120)
    location = models.CharField(max_length=160, blank=True)
    budget = models.CharField(max_length=120, blank=True, default="")
    details = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="NEW")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        # Display the client name and requested service in the Django admin.
        return f"{self.name} - {self.project_type}"


# Employee records for company staff shown in admin or a future dashboard.
class Employee(models.Model):
    ROLE_CHOICES = [
        ("MANAGEMENT", "Management"),
        ("SALES", "Sales"),
        ("FOREMAN", "Site Foreman"),
        ("ADMIN", "Administration"),
        ("LABOUR", "Labour"),
    ]

    full_name = models.CharField(max_length=140)
    role = models.CharField(max_length=80)
    department = models.CharField(max_length=30, choices=ROLE_CHOICES, default="LABOUR")
    phone = models.CharField(max_length=40, blank=True)
    email = models.EmailField(blank=True)
    bio = models.TextField(blank=True)
    photo = models.FileField(upload_to="employees/", blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["full_name"]

    def __str__(self):
        return f"{self.full_name} - {self.role}"


# Project records for portfolio/admin CRUD.
class Project(models.Model):
    STATUS_CHOICES = [
        ("PLANNING", "Planning"),
        ("IN_PROGRESS", "In Progress"),
        ("COMPLETED", "Completed"),
        ("ON_HOLD", "On Hold"),
    ]

    title = models.CharField(max_length=160)
    description = models.TextField()
    location = models.CharField(max_length=160, blank=True)
    client_name = models.CharField(max_length=140, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PLANNING")
    estimated_value = models.CharField(max_length=120, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    cover_image = models.FileField(upload_to="projects/covers/", blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


# Extra pictures for each project.
class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name="images", on_delete=models.CASCADE)
    image = models.FileField(upload_to="projects/gallery/")
    caption = models.CharField(max_length=180, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["uploaded_at"]

    def __str__(self):
        return self.caption or f"Image for {self.project.title}"


# Payment transaction requests for EcoCash, Mastercard, or Visa provider integration.
class PaymentTransaction(models.Model):
    METHOD_CHOICES = [
        ("ECOCASH", "EcoCash"),
        ("MASTERCARD", "Mastercard"),
        ("VISA", "Visa"),
    ]
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("PROCESSING", "Processing"),
        ("PAID", "Paid"),
        ("FAILED", "Failed"),
        ("CANCELLED", "Cancelled"),
    ]

    quote_request = models.ForeignKey(QuoteRequest, related_name="payments", on_delete=models.SET_NULL, null=True, blank=True)
    customer_name = models.CharField(max_length=140)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=40, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=10, default="USD")
    method = models.CharField(max_length=20, choices=METHOD_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    provider_reference = models.CharField(max_length=160, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.customer_name} - {self.method} - {self.amount} {self.currency}"
