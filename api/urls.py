from django.urls import path
from api.views import (
    apiOverview,
    TaskListCreateView,
    TaskDetailView
)


urlpatterns = [
    path('', apiOverview, name='api-overview'),
    path('task-list/', TaskListCreateView.as_view(), name='task-list'),
    path('task-detail/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
]
