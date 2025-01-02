from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from .models import Owner, Item, Dog
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken
import json

class OwnerAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.access_token = AccessToken.for_user(self.user)
        self.authorization_header = f'Bearer {self.access_token}'

    def test_create_owner(self):
        response = self.client.post(
            '/api/owners/',
            {'name': 'Novo Owner'},
            HTTP_AUTHORIZATION=self.authorization_header
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Owner.objects.count(), 1)

        owner = Owner.objects.first()
        self.assertEqual(owner.name, 'Novo Owner')

    def test_retrieve_owner(self):
        owner = Owner.objects.create(name='Teste')

        response = self.client.get(f'/api/owners/{owner.id}/',
                                   HTTP_AUTHORIZATION=self.authorization_header)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data['id'], owner.id)
        self.assertEqual(response.data['name'], owner.name)

    def test_update_owner(self):
        owner = Owner.objects.create(name='Owner Antigo')

        response = self.client.put(
            f'/api/owners/{owner.id}/',
            {'name': 'Owner Atualizado'},
            HTTP_AUTHORIZATION=self.authorization_header
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        owner.refresh_from_db()  # Atualiza o objeto do banco de dados
        self.assertEqual(owner.name, 'Owner Atualizado')

    def test_delete_owner(self):
        owner = Owner.objects.create(name='Owner para Deletar')

        response = self.client.delete(
            f'/api/owners/{owner.id}/',
            HTTP_AUTHORIZATION=self.authorization_header
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Owner.objects.count(), 0) 

    def test_update_owner(self):
        owner = Owner.objects.create(name='Teste')

        updated_data = {'name': 'Employee Atualizado', 'content': 'Conteúdo atualizado'}
        response = self.client.put(f'/api/owners/{owner.id}/',
                                   json.dumps(updated_data),
                                   content_type='application/json',
                                   HTTP_AUTHORIZATION=self.authorization_header)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        owner.refresh_from_db()

        self.assertEqual(owner.name, updated_data['name'])

    def test_delete_owner(self):
        owner = Owner.objects.create(name='Teste')

        response = self.client.delete(f'/api/owners/{owner.id}/',
                                      HTTP_AUTHORIZATION=self.authorization_header)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Owner.objects.count(), 0)

class ItemAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.access_token = AccessToken.for_user(self.user)
        self.authorization_header = f'Bearer {self.access_token}'

    def test_create_item(self):
        response = self.client.post(
            '/api/items/',
            {
                'name': 'Novo Item',
                'content': 'Conteúdo do Novo Item'
            },
            HTTP_AUTHORIZATION=self.authorization_header
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Item.objects.count(), 1)

        item = Item.objects.first()
        self.assertEqual(item.name, 'Novo Item')
        self.assertEqual(item.content, 'Conteúdo do Novo Item')

    def test_retrieve_item(self):
        item = Item.objects.create(name='Teste Item', content='Conteúdo do Teste')

        response = self.client.get(f'/api/items/{item.id}/',
                                   HTTP_AUTHORIZATION=self.authorization_header)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], item.id)
        self.assertEqual(response.data['name'], item.name)
        self.assertEqual(response.data['content'], item.content)

    def test_update_item(self):
        item = Item.objects.create(name='Item Antigo', content='Conteúdo Antigo')

        response = self.client.put(
            f'/api/items/{item.id}/',
            {
                'name': 'Item Atualizado',
                'content': 'Conteúdo Atualizado'
            },
            HTTP_AUTHORIZATION=self.authorization_header
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        item.refresh_from_db()
        self.assertEqual(item.name, 'Item Atualizado')
        self.assertEqual(item.content, 'Conteúdo Atualizado')

    def test_delete_item(self):
        item = Item.objects.create(name='Item para Deletar', content='Conteúdo')

        response = self.client.delete(
            f'/api/items/{item.id}/',
            HTTP_AUTHORIZATION=self.authorization_header
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Item.objects.count(), 0) 

class DogAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.access_token = AccessToken.for_user(self.user)
        self.authorization_header = f'Bearer {self.access_token}'

        # Cria um Owner e um Item para usar nas referências
        self.owner = Owner.objects.create(name='Owner Teste')
        self.item = Item.objects.create(name='Item Teste', content='Conteúdo do Item Teste')

    def test_create_dog(self):
        response = self.client.post(
            '/api/dogs/',
            {
                'name': 'Novo Dog',
                'content': 'Conteúdo do Novo Dog',
                'owner': self.owner.id,
                'item': self.item.id
            },
            HTTP_AUTHORIZATION=self.authorization_header
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Dog.objects.count(), 1)

        dog = Dog.objects.first()
        self.assertEqual(dog.name, 'Novo Dog')
        self.assertEqual(dog.content, 'Conteúdo do Novo Dog')
        self.assertEqual(dog.owner, self.owner)
        self.assertEqual(dog.item, self.item)

    def test_retrieve_dog(self):
        dog = Dog.objects.create(name='Teste Dog', content='Conteúdo do Teste Dog', owner=self.owner, item=self.item)

        response = self.client.get(f'/api/dogs/{dog.id}/',
                                   HTTP_AUTHORIZATION=self.authorization_header)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], dog.id)
        self.assertEqual(response.data['name'], dog.name)
        self.assertEqual(response.data['content'], dog.content)
        self.assertEqual(response.data['owner'], self.owner.id)
        self.assertEqual(response.data['item'], self.item.id)

    def test_update_dog(self):
        dog = Dog.objects.create(name='Dog Antigo', content='Conteúdo Antigo', owner=self.owner, item=self.item)

        response = self.client.put(
            f'/api/dogs/{dog.id}/',
            {
                'name': 'Dog Atualizado',
                'content': 'Conteúdo Atualizado',
                'owner': self.owner.id,
                'item': self.item.id
            },
            HTTP_AUTHORIZATION=self.authorization_header
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        dog.refresh_from_db()  # Atualiza o objeto do banco de dados
        self.assertEqual(dog.name, 'Dog Atualizado')
        self.assertEqual(dog.content, 'Conteúdo Atualizado')

    def test_delete_dog(self):
        dog = Dog.objects.create(name='Dog para Deletar', content='Conteúdo do Dog', owner=self.owner, item=self.item)

        response = self.client.delete(
            f'/api/dogs/{dog.id}/',
            HTTP_AUTHORIZATION=self.authorization_header
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Dog.objects.count(), 0)