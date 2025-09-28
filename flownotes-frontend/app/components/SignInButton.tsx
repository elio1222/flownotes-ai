import { Avatar, Text, Anchor } from "@mantine/core";

const SignInButton = () => {
  return (
    <Anchor href="/login">
      <Avatar size={"4rem"}>
        <Text>Sign in</Text>
      </Avatar>
    </Anchor>
  );
};
export default SignInButton;
