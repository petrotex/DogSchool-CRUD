from rest_framework import serializers
from dogcareapp import models

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Item
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        fields = '__all__'


class DogSerializer(serializers.ModelSerializer):
    team_id = serializers.IntegerField(source='team.id', read_only=True)

    class Meta:
        model = models.Dog
        fields = '__all__'

    def to_representation(self, instance):
        # Obtém a representação padrão
        representation = super().to_representation(instance)

        # Serializa o item, se existir, e adiciona ao resultado
        if instance.item:
            representation['item'] = ItemSerializer(instance.item).data

        return representation