# Install the requests package by executing the command "pip install requests"

import requests
import time
import os
from dotenv import load_dotenv
# from pydub import AudioSegment
# import tempfile

load_dotenv()

# base url for api url
base_url = "https://api.assemblyai.com"

# headers for api call authorization. putting api key in here
headers = {
    "authorization": f"{os.getenv("API_KEY")}"
}

# You can upload a local file using the following code
# with open("./my-audio.mp3", "rb") as f:
#   response = requests.post(base_url + "/v2/upload",
#                           headers=headers,
#                           data=f)
# 
# audio_url = response.json()["upload_url"]

def assembly_ai_text(file_obj):
    print(f'file obj: {file_obj}')
    # print(file_name)
    # with open(file_name, 'rb') as d:
    #     response = requests.post(base_url + '/v2/upload', headers= headers, data =d)

    # print(f'ERROROROROROOR: {response.status_code}, {response.text}')
    with open(file_obj, 'rb') as f:
        files = {'file': (os.path.basename(file_obj), f, 'audio/mpeg')}  # or 'audio/wav'
        response = requests.post(
            "https://api.assemblyai.com/v2/upload",
            headers={"authorization": os.getenv("API_KEY")},  # DO NOT set Content-Type
            files=files
        )

    print(response.status_code, response.text)

    audio_url = response.json()['upload_url']
    data = {
        "audio_url": audio_url,
        "speech_model": "universal"
    }
    response = requests.post(base_url + '/v2/transcript', json=data, headers=headers)

    transcript_id = response.json()['id']
    api_endpoint = base_url + '/v2/transcript/' + transcript_id

    while True:
        results = requests.get(url = api_endpoint, headers=headers)

        if results.json()['status'] == 'completed':
            text = results.json()['text']
            return text
        elif results.json()['status'] == 'error':
            return 'error'
        else:
            time.sleep(3)

# def convert_to_mp3(audio_file):
#     """
#     audio_file: InMemoryUploadedFile from Django request.FILES
#     Returns path to temporary MP3 file
#     """
#     # Use a temporary file for output
#     tmp_mp3 = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
#     tmp_mp3_path = tmp_mp3.name
#     tmp_mp3.close()  # close so pydub can write to it

#     # Load input audio (pydub detects format automatically)
#     audio = AudioSegment.from_file(audio_file)
#     # Export as MP3
#     audio.export(tmp_mp3_path, format="mp3")

#     return tmp_mp3_path