from django.db import models
from django.contrib.auth.models import User


class Activity(models.Model):
    ACTIVITY_TYPES = [
        ('workout', 'Workout'),
        ('meal', 'Meal'),
        ('steps', 'Steps'),
    ]

    STATUS_CHOICES = [
        ('planned', 'Planned'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPES)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planned')

    # Workout specific fields
    duration_minutes = models.IntegerField(null=True, blank=True)
    workout_type = models.CharField(max_length=100, null=True, blank=True)

    # Meal specific fields
    calories = models.IntegerField(null=True, blank=True)
    meal_type = models.CharField(max_length=50, null=True, blank=True)

    # Steps specific field
    step_count = models.IntegerField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.activity_type} - {self.title} ({self.date})"