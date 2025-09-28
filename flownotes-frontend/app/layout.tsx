import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import {
  AppShell,
  AppShellMain,
  Group,
  AppShellHeader,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import SignInButton from "./components/SignInButton";
import HomeButton from "./components/HomeButton";

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
  },
});

export const metadata: Metadata = {
  title: "flowgo",
  description: "flowgoAI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme}>
            <AppShell
              header={{ height: 120 }}
              style={{ opacity: "unset", width: "100%" }}
              padding={"md"}
            >
              <AppShellHeader
                style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}
              >
                <Group justify="space-between" align="center">
                  <HomeButton />
                  <SignInButton />
                </Group>
              </AppShellHeader>
              <AppShellMain
                p="xl"
                style={{
                  overflow: "visible",
                  background: "linear-gradient(135deg, #360033 0%, #0b8793 100%)",
                }}
              >
                {children}
              </AppShellMain>
            </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
