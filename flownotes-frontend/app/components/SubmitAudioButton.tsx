"use client";
import { Button } from "@mantine/core";
import SubmitAudio from "../utils";
import { useRouter } from 'next/navigation';

interface SubmitAudioButtonProps {
  audioData: string | null;
}

const SubmitAudioButton = ({ audioData }: SubmitAudioButtonProps) => {
  const router = useRouter();
  const handleSubmit = async () => {
    if (!audioData) {
      console.error("No audio data to submit");
      return;
    }
    try {
      await SubmitAudio(audioData);
      router.push("/notes")
    } catch (error) {
      console.error("Error submitting audio:", error);
    }
  };

  return (
    <Button c="#73006b" variant="transparent" onClick={handleSubmit} disabled={!audioData}>
      Submit Audio
    </Button>
  );
};

export default SubmitAudioButton;
