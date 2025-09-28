from django.contrib.auth.models import User
from rest_framework import serializers
from apis.models import Note

# serializers act as a translator between complex python objects and data formats that can be sent over the web

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {'password': {'write_only': True}}
        # the key word argument 'write_only: True' ensures that the password cannot be read, and only written to, to respect the privacy of the password and sensitive information

        '''
        for example: if you were to serialize a User with the password {'write_only': False}, when serializing the object, when accessing the model. You will get 
        {'username': 'mrfreeze', 'email': 'freeze@test.com', 'password' 'password123'}, and this could be an issue when returning the object model to the front end because you are not exposing the password to the client side. So set the password's write only to True. 
        '''

    # overrides the generic save method
    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"