import django_filters
from .models import Dog
from dogcareapp import models

class DogFilter(django_filters.FilterSet):
    team = django_filters.NumberFilter(field_name='team__id', lookup_expr='exact')  # Filtra por ID do time

    class Meta:
        model = models.Dog
        fields = ['team']  # Permite filtrar cães pelo time