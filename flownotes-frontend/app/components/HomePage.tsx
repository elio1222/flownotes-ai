import { Button, Text, Center, Stack, Image } from "@mantine/core";

const HomePage = () => {
  return (
    <Center h="calc(100vh)">
      <Stack align="center" gap="15vh" w={"30%"} h={"70%"}>
        <Text
          className={"typed-out"}
          c={"white"}
          size="xl"
          fw={"bolder"}
        >
          What&apos;s on your mind today?
        </Text>
        <Button
          className="hovered-component"
          variant="transparent"
          fullWidth
          h="50%"
          c="black"
          radius="lg"
          style={{
            background: "white",
            boxShadow:
              "0 12px 36px rgba(255, 255, 255, 0.28), 0 6px 18px rgba(255, 255, 255, 0.18)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <Image src='/MicButton.svg' alt="Record Button" style={{ width: "min(30vh, 60vw)", height: "min(30vh, 60vw)" }}/>
        </Button>
      </Stack>
    </Center>
  );
};
export default HomePage;
