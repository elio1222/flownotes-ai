"use client";

import {
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const LoginPage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Paper
        radius="md"
        shadow="xl"
        withBorder
        p="xl"
        style={{
          background: "white",
          boxShadow:
            "0 12px 36px rgba(255, 255, 255, 0.28), 0 6px 18px rgba(255, 255, 255, 0.18)",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <Stack gap="xl" align="center">
          <Title order={1}>Log In</Title>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              form.onSubmit((values) => {
                // authenticate user here and navigate on success
                // Example: console.log(values);
                // window.location.href = '/';
              })(event);
            }}
          >
            <Stack gap="md" w={300}>
              <TextInput
                name="username"
                label="Username"
                withAsterisk
                required
                styles={{
                  input: {
                    borderColor: "#000000",
                  },
                }}
                autoComplete="off"
                placeholder="Username..."
                key={form.key("username")}
                {...form.getInputProps("username")}
              />

              <TextInput
                name="email"
                label="Email"
                withAsterisk
                required
                styles={{
                  input: {
                    borderColor: "#000000",
                  },
                }}
                autoComplete="off"
                placeholder="flownoter@gmail.com"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />

              <PasswordInput
                name="password"
                label="Password"
                withAsterisk
                required
                styles={{
                  input: {
                    borderColor: "#000000",
                  },
                }}
                autoComplete="off"
                placeholder="Password..."
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <Group justify="center" mt="lg">
                <Button type="submit" color="#309553">
                  Log In
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Paper>
      <p style={{ marginTop: "20px", color: "white"}}>
        Don&apos;t have an account? <Anchor href="/signup">Sign Up</Anchor>
      </p>
    </>
  );
};
export default LoginPage;
