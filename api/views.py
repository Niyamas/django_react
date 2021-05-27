from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from api.serializers import TaskSerializer
from api.models import Task


@api_view(['GET'])
def apiOverview(request):
    """API v1 home page."""

    api_urls = {
        'Task List': '/task-list/',
        'Task Detail': '/task-detail/<task ID>/',
    }

    return Response(api_urls)

class TaskListCreateView(ListCreateAPIView):
    """Displays a list of tasks. Can add new tasks."""
    serializer_class = TaskSerializer
    queryset = Task.objects.all().order_by('id')

class TaskDetailView(RetrieveUpdateDestroyAPIView):
    """Display a specific, single task. Can add, delete, or update this task."""
    serializer_class = TaskSerializer
    queryset = Task.objects.all()