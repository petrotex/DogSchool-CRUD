from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

class BaseModelQuerySet(models.QuerySet):
  def delete(self):
    self.update( deleted_at =timezone.now(), is_active =False)

class BaseManager(models.Manager):
  def get_queryset (self):
    return BaseModelQuerySet( self.model, using=self._db).filter( deleted_at__isnull =True, is_active =True)
  
class BaseModel(models.Model):
  class Meta:
    abstract = True

  created_at = models.DateTimeField( auto_now_add = True)
  updated_at = models.DateTimeField( auto_now = True)
  deleted_at = models.DateTimeField( editable = False, blank=True, null=True)
  is_active = models.BooleanField( editable = False, default=True)
    
  objects = BaseManager()

  def delete(self, **kwargs):
      self.is_active = False
      self.deleted_at = timezone.now()
      self.save()

  def hard_delete (self, **kwargs):
      super(BaseModel , self).delete(**kwargs)

class Team(BaseModel):
   name = models.CharField(max_length=200)
   image = models.ImageField( upload_to= 'media/owner/' , null=True, blank=True)

   def __str__(self):
     return self.name
   
class Item(BaseModel):
   name = models.CharField(max_length=200)
   content = models.TextField()
   image = models.ImageField( upload_to= 'media/items/' , null=True, blank=True)

   def __str__(self):
     return self.name

class Dog(BaseModel):
   # Dados Básicos
   name = models.CharField(max_length=200)
   content = models.TextField()
   bodyimage = models.ImageField( upload_to='media/dogs/body' , null=True, blank=True)
   nameimage = models.ImageField( upload_to='media/dogs/name/' , null=True, blank=True)
   team = models.ForeignKey(Team, on_delete = models.CASCADE)
   item = models.ForeignKey(Item, on_delete = models.CASCADE, null=True, blank=True)

   # Dados Físicos
   age = models.PositiveIntegerField()
   race = models.CharField(max_length=50)
   height = models.FloatField()
   weight = models.FloatField()
   gender = models.CharField(
        max_length=1, 
        choices=[
            ('M', 'Masculino'),
            ('F', 'Feminino'),
        ],
    )
   
   # Atributos
   strength = models.PositiveIntegerField(
      validators=[MinValueValidator(1), MaxValueValidator(5)],
   )
   observation = models.PositiveIntegerField(
      validators=[MinValueValidator(1), MaxValueValidator(5)],
   )
   agility = models.PositiveIntegerField(
      validators=[MinValueValidator(1), MaxValueValidator(5)],
   )
   intelligence = models.PositiveIntegerField(
      validators=[MinValueValidator(1), MaxValueValidator(5)],
   )

   def __str__(self):
     return self.name
   
