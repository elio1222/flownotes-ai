import { Button } from "@mantine/core";
import SubmitAudio from "../utils";

interface SubmitAudioButtonProps {
  audioData: string | null;
}

const SubmitAudioButton = ({ audioData }: SubmitAudioButtonProps) => {
  const handleSubmit = async () => {
    if (!audioData) {
      console.error("No audio data to submit");
      return;
    }
    try {
      await SubmitAudio(audioData);
    } catch (error) {
      console.error("Error submitting audio:", error);
    }
  };

  return (
    <Button variant="transparent" onClick={handleSubmit} disabled={!audioData}>
      Submit Audio
    </Button>
  );
};

export default SubmitAudioButton;
