from rest_framework import serializers
from api.models import Task

class TaskSerializer(serializers.Serializer):
    """Task Serializer."""
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=200)
    completed = serializers.BooleanField()

    def create(self, validated_data):
        """Adds create object functionality through the API to the Task model."""
        title = validated_data.get('title', None)
        validated_data.pop('title')
        return Task.objects.create(title=title, **validated_data)

    def update(self, instance, validated_data):
        """Adds update object functionality through the API to the Task model."""
        instance.title = validated_data.get('title', instance.title)
        instance.completed = validated_data.get('completed', instance.completed)
        instance.save()
        return instance