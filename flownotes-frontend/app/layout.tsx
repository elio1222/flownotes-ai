import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  BackgroundImage,
  Center,
  Group,
} from "@mantine/core";
import SignInButton from "./components/SignInButton";
import HomeButton from "./components/HomeButton";

export const metadata: Metadata = {
  title: "flownotes",
  description: "FlownotesAI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <BackgroundImage src="">
            <Center
              style={{
                backgroundSize: 800,
                backgroundRepeat: "repeat",
                backgroundAttachment: "fixed",
                // backgroundImage:
                //   "",
              }}
            >
              <AppShell
                style={{ opacity: "unset" }}
                header={{ height: 70 }}
                padding={"xs"}
                w={"75%"}
              >
                <AppShellHeader>
                  <Group
                    justify={"space-evenly"}
                    h={"100%"}
                    w={"100%"}
                    pr={"sm"}
                    miw={"345px"}
                  >
                    {/*Add components here, one for home button and one for sign in */}
                    <HomeButton />
                    <SignInButton />
                  </Group>
                </AppShellHeader>
                <AppShellMain>{children}</AppShellMain>
              </AppShell>
            </Center>
          </BackgroundImage>
        </Providers>
      </body>
    </html>
  );
}
