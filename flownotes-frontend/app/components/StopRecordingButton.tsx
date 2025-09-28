import { Button, Image, Text, Stack } from "@mantine/core";

interface StopRecordingButtonProps {
  onClick: () => void;
}

const StopRecordingButton = ({ onClick }: StopRecordingButtonProps) => {
  return (
    <Stack align="center" gap={100}>
      <Text
        className={"typed-out"}
        c={"white"}
        size="xl"
        fw={"bolder"}
        ta="center"
      >
        Recording and summarizing...
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
          src="/PauseButton.svg"
          alt="Stop Recording Button"
          style={{ width: "min(30vh, 60vw)", height: "min(30vh, 60vw)" }}
        />
      </Button>
    </Stack>
  );
};
export default StopRecordingButton;
