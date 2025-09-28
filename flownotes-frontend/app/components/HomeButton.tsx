import { Anchor, Image } from "@mantine/core";

const HomeButton = () => {
  return (
    <Anchor className="hovered-component" href="/">
      <Image src={'/FlowGoLogo.svg'} alt="Flownotes AI Logo" w={300} />
    </Anchor>
  );
};
export default HomeButton;
