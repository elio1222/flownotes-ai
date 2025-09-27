# Install the requests package by executing the command "pip install requests"

import requests
import time
import os
from dotenv import load_dotenv

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

def assembly_ai_text(file_name):
    with open(file_name, 'rb') as d:
        response = requests.post(base_url + '/v2/upload', headers= headers, data =d)

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
