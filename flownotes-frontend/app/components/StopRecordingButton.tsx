import { Button, Image, Text, Stack, Box } from "@mantine/core";

interface StopRecordingButtonProps {
  onClick: () => void;
}

const StopRecordingButton = ({ onClick }: StopRecordingButtonProps) => {
  return (
    <Stack align="center" gap="8vh" w="100%">
      <Text className="typed-out" c="white" size="xl" fw={700} ta="center">
        Recording and summarizing...
      </Text>
      <Box w="min(80vw, 400px)" h="min(80vw, 400px)" maw="100%" mx="auto">
        <Button
          className="hovered-component"
          variant="white"
          p={0}
          w="100%"
          h="100%"
          c="black"
          radius="lg"
          onClick={onClick}
          styles={{
            root: {
              background: "white",
              boxShadow: "0 12px 36px rgba(255, 255, 255, 0.28), 0 6px 18px rgba(255, 255, 255, 0.18)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          }}
        >
          <Box w="100%" h="100%" p="20%" display="flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src="/PauseButton.svg"
              alt="Stop Recording Button"
              width="100%"
              height="100%"
              fit="contain"
              style={{ display: 'block' }}
            />
          </Box>
        </Button>
      </Box>
    </Stack>
  );
};

export default StopRecordingButton;
