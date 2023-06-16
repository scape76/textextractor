import * as React from "react";

import { Button, Box } from "@mantine/core";
import { Icons } from "@/components/icons";

interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}


const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  className,
  ...props
}) => {
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
    <Box pt={"xs"} onClick={() => console.log("hello")}>
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
