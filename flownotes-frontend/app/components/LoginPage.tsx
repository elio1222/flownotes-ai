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
    <div
    style = {{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "300px",
    }}>
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
          maxWidth: "500px",
          justifyContent: "center"
        }}
      >
        <Stack gap="xl" align="center">
          <Title order={1}>Sign Up</Title>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              form.onSubmit(async(values) => {
                // authenticate user here and navigate on success
                // Example: console.log(values);
                try {
                  const res = await fetch("http://127.0.0.1:8000/create/user/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                    credentials: "include",
                  }
                );

                  if (res.ok) {
                    window.location.href = "/";
                  } else {
                    const data = await res.json();
                    console.error('login failed', data);
                  }
                } catch (err) {
                  console.error('error loggin in', err)
                }
              })(event);
              window.location.href = '/';
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
                  Sign Up
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Paper>
        <p style={{ marginTop: "20px", color: "white"}}>
        Already have an account? <Anchor href="/signup">Log In</Anchor>
      </p>
      </div>
    </>
  );
};
export default LoginPage;
