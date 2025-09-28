"use client";

import { Center, Stack } from "@mantine/core";
import { useState } from "react";
import dynamic from "next/dynamic";
import StartRecordingButton from "./StartRecordingButton";
import StopRecordingButton from "./StopRecordingButton";
import SubmitAudioButton from "./SubmitAudioButton";

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  { ssr: false }
);

const HomePage = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <Center h="calc(100vh)">
      <Stack align="center" gap="15vh" w={"30%"} h={"70%"}>
        <ReactMediaRecorder
          audio
          onStart={() => setIsRecording(true)}
          onStop={() => setIsRecording(false)}
          render={({ startRecording, stopRecording, mediaBlobUrl }) => (
            <div style={{ textAlign: "center", width: "100%" }}>
              {isRecording ? (
                <StopRecordingButton
                  onClick={() => {
                    stopRecording();
                  }}
                />
              ) : (
                <StartRecordingButton
                  onClick={() => {
                    startRecording();
                  }}
                  mediaBlob={mediaBlobUrl}
                />
              )}
              {mediaBlobUrl && (
                <Stack>
                  <div style={{ marginTop: "20px" }}>
                  <audio
                    src={mediaBlobUrl}
                    controls
                    style={{ width: "100%" }}
                  />
                </div>
                <SubmitAudioButton audioData={mediaBlobUrl}/>
                </Stack>
              )}
            </div>
          )}
        />
      </Stack>
    </Center>
  );
};

export default HomePage;
