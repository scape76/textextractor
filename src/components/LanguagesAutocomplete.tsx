import * as React from "react";
import { Autocomplete, AutocompleteProps } from "@mantine/core";
import { languages } from "@/lib/languages";

const data = Object.values(languages);

interface LanguagesAutocompleteProps extends Omit<AutocompleteProps, "data"> {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const LanguagesAutocomplete: React.FC<LanguagesAutocompleteProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <Autocomplete
      {...props}
      value={value}
      onChange={onChange}
      data={data}
    />
  );
};

export default LanguagesAutocomplete;
