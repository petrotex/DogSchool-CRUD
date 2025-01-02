from django.contrib import admin
from django.apps import apps

models = apps.get_app_config('dogcareapp').get_models()

for model in models:
    # Verifica se o modelo não é abstrato
    if not model._meta.abstract:
        admin.site.register(model)
