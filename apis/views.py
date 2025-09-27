from django.shortcuts import render
from django.http import HttpResponse
from apis.services import assembly_ai_text

# Create your views here.
def get_audio(request):
    mp3_file_path = "/Users/eliorocha/Development/WindowsDevelopment/flownotes/first_test.mp3"
    text = assembly_ai_text(mp3_file_path)
    return HttpResponse(text)