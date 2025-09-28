import { Image, Button, Text, Stack, Box } from "@mantine/core";

interface StartRecordingButtonProps {
  onClick: () => void;
  mediaBlob?: string;
}

const StartRecordingButton = (
  { onClick, mediaBlob }: StartRecordingButtonProps
) => {
  return (
    <Stack align="center" gap={"8vh"} style={{ width: "100%" }}>
      {mediaBlob ? (
        <Text className="typed-out" c="white" size="xl" fw={700} ta="center">
          Click the microphone to retry
        </Text>
      ) : (
        <Text className="typed-out" c="white" size="xl" fw={700} ta="center">
          What&apos;s on your mind today?
        </Text>
      )}
      <Box className="record-button-container">
        <Button
          className="hovered-component record-button"
          variant="white"
          p={0}
          w="100%"
          h="100%"
          c="black"
          radius="lg"
          onClick={onClick}
        >
          <Box className="record-button-content">
            <Image
              src="/MicButton.svg"
              alt="Record Button"
              width="100%"
              height="100%"
              fit="contain"
              className="record-button-image"
            />
          </Box>
        </Button>
      </Box>
    </Stack>
  );
};

export default StartRecordingButton;
