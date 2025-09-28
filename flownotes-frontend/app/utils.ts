export default async function SubmitAudio(audioData: string) {
  const blobFile = new Blob([audioData], { type: "audio/mpeg" });
  const file = new File([blobFile], "recording.mp3", { type: "audio/mpeg" });

  const formData = new FormData();
  formData.append("audio_file", file);
  formData.append("title", "My Note");

  await fetch("http://127.0.0.1:8000/create/note", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
}
