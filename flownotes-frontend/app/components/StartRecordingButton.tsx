import { Image, Button, Text, Stack, Box } from "@mantine/core";

interface StartRecordingButtonProps {
  onClick: () => void;
}

const StartRecordingButton = ({ onClick }: StartRecordingButtonProps) => {
  return (
    <Stack align="center" gap={'8vh'} style={{ width: '100%' }}>
      <Text
        className="typed-out"
        c="white"
        size="xl"
        fw={700}
        ta="center"
      >
        What&apos;s on your mind today?
      </Text>
      <Box
        style={{
          position: 'relative',
          width: 'min(80vw, 400px)',
          height: 'min(80vw, 400px)',
          maxWidth: '100%',
          margin: '0 auto'
        }}
      >
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
              border: "1px solid rgba(255,255,255,0.4)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }
          }}
        >
          <Box
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20%'
            }}
          >
            <Image
              src="/MicButton.svg"
              alt="Record Button"
              width="100%"
              height="100%"
              fit="contain"
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </Box>
        </Button>
      </Box>
    </Stack>
  );
};

export default StartRecordingButton;
