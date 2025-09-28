from django.shortcuts import render
from django.http import HttpResponse
from apis.services import assembly_ai_text
from rest_framework.decorators import api_view
from apis.serializers import CreateUserSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from apis.models import Note
from apis.serializers import NoteSerializer
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
@login_required
def get_audio(request):

    # every request in Django has a request.user, the the request.user can be a user object or an anoymous user object is the user is not logged in. Django's .is_authenticated tells you whether or not the user is logged in
    if not request.user.is_authenticated:
        return Response({'status': 'bad', 'message': 'user not logged in'})
    
    mp3_file_path = "/Users/eliorocha/Development/WindowsDevelopment/flownotes/first_test.mp3"
    text = assembly_ai_text(mp3_file_path)
    return HttpResponse(text)

@csrf_exempt
@api_view(['POST'])
def createUser(request):
    print(request.data)
    serial = CreateUserSerializer(data = request.data)
    if serial.is_valid():
        serial.save()
    else:
        return HttpResponse('error')
    
    return Response({'status': 'good', 'message': 'user created'})
    
@api_view(['POST'])
def authenticateUser(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        return Response ({'status': 'good', 'message': 'user logged in'})
    else:
        return Response({'status': 'bad', 'message': 'failed auth'})
    

def logoutUser(request):
    logout(request)
    return Response({'status': 'good', 'message': 'user logged out'})

# create note
@login_required
def createNote(request):
    
    audio_file = request.FILES.get('audio_file')
    title = request.data.get('title')
    text = assembly_ai_text(audio_file)
    new_note = NoteSerializer(data = {'user': request.user, 'title': title, 'text': text}) 
    if new_note.is_valid():
        new_note.save()
    else:
        return Response({'status': 'bad', 'message': 'failed to create note'})

    return Response({'status': 'good', 'message': 'created note'})
# read note(s)
@login_required
def readNote(request):
    
    # if the user has a specific note in mind they want to read, they can search it and get that note. 
    if request.data.get('title'):
        note = Note.objects.get(user=request.user, title= request.data.get('title'))
        serial_note = NoteSerializer(note)
        return Response(serial_note)
    
    # else display all notes 
    notes = Note.objects.filter(user = request.user)
    serial_notes = NoteSerializer(notes, many = True)
    return Response(serial_notes.data)


# update note
@login_required
def updateNote(request):
    
    # gets a title from the frontend
    title = request.data.get('title')
    note = Note.objects.get(user = request.user, title=title)
    # changes the text attribute of the note in the database
    note.text = request.data.get('text')
    # save it to the database
    note.save()
    return Response({'status': 'good', 'message': 'success'})

# delete note
@login_required
def deleteNote(request):
    if not request.user.is_authenticated:
        return Response({'status': 'bad', 'message': 'user not logged in'})
    # getting the data from the request, the frontend will have an implementation of a form where the user will put a title
    title = request.data.get('title')
    # filter note database through the title
    note = Note.objects.get(user = request.user, title = title)
    # delete the note from database
    note.delete()

    # return good status
    return Response({'status': 'good', 'message': f'deleted {title}'})
