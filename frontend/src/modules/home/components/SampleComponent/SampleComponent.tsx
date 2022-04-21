import { Button } from "@mui/material";
import { Container } from "./SampleComponent.styles";
import { useMultipliedNum } from "./SampleComponent.utils";

interface SampleComponentProps {
  initialNum: number;
}

const SampleComponent = ({ initialNum }: SampleComponentProps) => {
  const { num, handleClick } = useMultipliedNum(initialNum);
  return (
    <>
      {" "}
      <Container>{num} </Container>
      <Button onClick={handleClick}>Increment!</Button>
    </>
  );
};

export default SampleComponent;
