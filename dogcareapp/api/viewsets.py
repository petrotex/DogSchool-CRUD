from rest_framework import viewsets, permissions
from dogcareapp import models
from dogcareapp.api import serializers
from ..filters import DogFilter
from django_filters.rest_framework import DjangoFilterBackend

class TeamViewSet(viewsets.ModelViewSet):
    queryset = models.Team.objects.all().order_by('id')
    serializer_class = serializers.TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

class DogViewSet(viewsets.ModelViewSet):
    queryset = models.Dog.objects.all().order_by('id')
    serializer_class = serializers.DogSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DogFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        # Verificando o parâmetro 'team' na query string e aplicando o filtro
        team_id = self.request.query_params.get('team', None)
        if team_id:
            queryset = queryset.filter(team__id=team_id)  # Filtra os cães pelo time com o ID passado
        return queryset

class ItemViewSet(viewsets.ModelViewSet):
    queryset = models.Item.objects.all().order_by('id')
    serializer_class = serializers.ItemSerializer
    permission_classes = [permissions.IsAuthenticated]