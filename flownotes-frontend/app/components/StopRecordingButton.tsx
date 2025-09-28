import { Button, Image, Text, Stack, Box } from "@mantine/core";

interface StopRecordingButtonProps {
  onClick: () => void;
}

const StopRecordingButton = ({ onClick }: StopRecordingButtonProps) => {
  return (
    <Stack align="center" gap="8vh" w="100%">
      <Text className="typed-out" c="white" size="xl" fw={700} ta="center">
        Collecting ingeneous ideas...
      </Text>
      <Box w="min(80vw, 400px)" h="min(80vw, 400px)" maw="100%" mx="auto">
        <Button
          className="hovered-component recording-pulse"
          variant="white"
          p={0}
          w="100%"
          h="100%"
          c="black"
          radius="lg"
          onClick={onClick}
          styles={{
            root: {
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
