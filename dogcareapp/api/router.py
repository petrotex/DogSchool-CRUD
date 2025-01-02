from rest_framework.routers import DefaultRouter
from .viewsets import *

router = DefaultRouter()
router.register(r'dogs', DogViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'items', ItemViewSet)