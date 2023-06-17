import * as React from "react";

import { Button, Box, BoxProps } from "@mantine/core";
import { Icons } from "@/components/Icons";

interface CopyButtonProps extends BoxProps {
  value: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, ...props }) => {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
  }

  return (
    <Box pt={"xs"} onClick={() => console.log("hello")} {...props}>
      <Button
        size="xs"
        compact
        variant="sublte"
        onKeyDown={() => copyToClipboard(value)}
        onClick={() => copyToClipboard(value)}
        {...props}
      >
        {hasCopied ? <Icons.check size={"16"} /> : <Icons.copy size={"16"} />}
      </Button>
    </Box>
  );
};

export default CopyButton;
