import * as React from "react";

import { Button } from "@mantine/core";
import { Icons } from "@/components/icons";
interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  return (
    <Button>
      <Icons.copy className="w-3 h-3" />
    </Button>
  );
};

export default CopyButton;
