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
from django.contrib.auth.models import User
import tempfile
import requests
import os
import time

# base url for api url
base_url = "https://api.assemblyai.com"

# headers for api call authorization. putting api key in here
headers = {
    "authorization": f"{os.getenv("API_KEY")}"
}

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
    
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username = username, password=password)
    if user is not None:
        login(request, user)
        return Response ({'status': 'good', 'message': 'user logged in'})
    else:
        return Response({'status': 'bad', 'message': 'failed auth'})  
    
# i rather just authenticate the user right away from the sign up page and then go to their notes
# @api_view(['POST'])
# def authenticateUser(request):
#     username = request.POST.get('username')
#     password = request.POST.get('password')
#     user = authenticate(request, username=username, password=password)
    
#     if user is not None:
#         login(request, user)
#         return Response ({'status': 'good', 'message': 'user logged in'})
#     else:
#         return Response({'status': 'bad', 'message': 'failed auth'})
    

def logoutUser(request):
    logout(request)
    return Response({'status': 'good', 'message': 'user logged out'})

# # create note
# @csrf_exempt
# # @login_required
# @api_view(["POST"])
# def createNote(request):
    
#     audio_file = request.FILES.get('audio_file')
#     print(f'AUDIO FILEEEE: {audio_file}')
#     title = request.data.get('title')
#     local_path = "/Users/eliorocha/Development/WindowsDevelopment/flownotes/apis/audios"
#     try:
#         # Make sure directory exists
#         local_dir = "/Users/eliorocha/Development/WindowsDevelopment/flownotes/apis/audios"
#         os.makedirs(local_dir, exist_ok=True)

#         # Build full path
#         file_path = os.path.join(local_dir, f"{title}.mp3")  # or .webm if raw

#         # Save uploaded file to disk
#         with open(file_path, 'wb') as f:
#             for chunk in audio_file.chunks():
#                 f.write(chunk)

#         print(f"Audio file saved successfully to {file_path}")

#     except requests.exceptions.RequestException as e:
#         print(f"Error downloading audio file: {e}")

#     # tmp_path = convert_to_mp3(audio_file)
#     text = assembly_ai_text(audio_file)
#     user = User.objects.all()[0]
#     new_note = NoteSerializer(data = {'user': user, 'title': title, 'text': text}) 
#     if new_note.is_valid():
#         new_note.save()
#     else:
#         return Response({'status': 'bad', 'message': 'failed to create note'})

#     return Response({'status': 'good', 'message': 'created note'})
@csrf_exempt
@api_view(['POST'])
def createNote(request):
    audio_file = request.FILES.get("audio_file")  # InMemoryUploadedFile
    title = request.data.get("title")

    if not audio_file or not title:
        return Response({"status": "bad", "message": "Missing audio file or title"})

    # --- Step 1: Upload audio to AssemblyAI ---
    try:
        upload_res = requests.post(
            f"{base_url}/v2/upload",
            headers={"authorization": os.getenv("API_KEY")},
            data=audio_file.file  # stream raw binary
        )
        upload_res.raise_for_status()
    except requests.exceptions.RequestException as e:
        return Response({"status": "bad", "message": f"Upload failed: {e}"})

    audio_url = upload_res.json().get("upload_url")
    if not audio_url:
        return Response({"status": "bad", "message": "No upload URL returned"})

    # --- Step 2: Request transcription ---
    transcript_req = {"audio_url": audio_url, "speaker_labels": False}
    try:
        transcript_res = requests.post(
            f"{base_url}/v2/transcript",
            headers={"authorization": os.getenv("API_KEY"), "content-type": "application/json"},
            json=transcript_req
        )
        transcript_res.raise_for_status()
    except requests.exceptions.RequestException as e:
        return Response({"status": "bad", "message": f"Transcription failed: {e}"})

    transcript_data = transcript_res.json()
    transcript_id = transcript_data.get('id')

    endpoint = base_url + '/v2/transcript/' + transcript_id
    while True:
        transcript_result = requests.get(endpoint, headers=headers).json()
        if transcript_result['status'] == 'completed':
            print(f'Assembly AI Response: {transcript_result['text']}')
            note = Note(user=User.objects.all()[0], title = "Untitled", text = transcript_result['text'] )
            note.save()

            return Response({'status': 'good', 'message': 'note created', 'assemblyai_response': transcript_result['text']})
            break
        elif transcript_result['status'] == 'error':
            raise RuntimeError(f"Transcription failed: {transcript_result['error']}")

        else:
            time.sleep(3)


# read note(s)
@api_view(['GET'])
def readNote(request):
    
    # if the user has a specific note in mind they want to read, they can search it and get that note. 
    if request.data.get('title'):
        note = Note.objects.get(user=request.user, title= request.data.get('title'))
        serial_note = NoteSerializer(note)
        return Response(serial_note)
    
    # else display all notes 
    notes = Note.objects.filter(user = User.objects.all()[0])
    print(f'NOTE: {notes}')
    notess = Note.objects.all()
    print(f'NOTES:::::: {notess}')
    last_note = Note.objects.last()
    serial_notes = NoteSerializer(last_note)
    print(f'SERIAL NOTESSS: ::::: {serial_notes.data}')

    return Response(serial_notes.data)

@api_view(['GET'])
def readALLNote(request):
    
    # if the user has a specific note in mind they want to read, they can search it and get that note. 
    if request.data.get('title'):
        note = Note.objects.get(user=request.user, title= request.data.get('title'))
        serial_note = NoteSerializer(note)
        return Response(serial_note)
    
    # else display all notes 
    notess = Note.objects.all()
    serial_notes = NoteSerializer(notess, many = True)

    return Response(serial_notes.data)

# update note
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

def summarizeNote(request):
    return