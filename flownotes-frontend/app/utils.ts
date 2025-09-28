export default async function SubmitAudio(audioUrl: string) {
  // Fetch the actual blob from the blob URL
  const response = await fetch(audioUrl);
  const blob = await response.blob();

  // Turn the blob into a File
  const file = new File([blob], "recording.mp3", { type: blob.type || "audio/mpeg" });

  // Build form data
  const formData = new FormData();
  formData.append("audio_file", file);
  formData.append("title", "My Note");

  // Send to Django backend
  const res = await fetch("http://127.0.0.1:8000/create/note", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const data = await res.json();
    console.log("Backend response:", data);
  } else {
    try {
      const data = await res.json();
      console.error("request failed", data);
    } catch (err) {
      console.error("could not parse error response", err);
    }
  }
}
