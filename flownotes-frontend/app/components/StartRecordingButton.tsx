import { Image, Button, Text, Stack } from "@mantine/core";

interface StartRecordingButtonProps {
  onClick: () => void;
}

const StartRecordingButton = ({ onClick }: StartRecordingButtonProps) => {
  return (
    <Stack align="center" gap={100}>
      <Text
        className={"typed-out"}
        c={"white"}
        size="xl"
        fw={"bolder"}
        ta="center"
      >
        What&apos;s on your mind today?
      </Text>
      <Button
        className="hovered-component"
        variant="transparent"
        fullWidth
        h={300}
        c="black"
        radius="lg"
        onClick={onClick}
        style={{
          background: "white",
          boxShadow:
            "0 12px 36px rgba(255, 255, 255, 0.28), 0 6px 18px rgba(255, 255, 255, 0.18)",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <Image
          src="/MicButton.svg"
          alt="Record Button"
          style={{ width: "min(30vh, 60vw)", height: "min(30vh, 60vw)" }}
        />
      </Button>
    </Stack>
  );
};
export default StartRecordingButton;
