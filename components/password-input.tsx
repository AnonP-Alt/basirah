"use client";

import {
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  useState,
} from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "$/ui/input-group";
import { Eye, EyeOff } from "lucide-react";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function PasswordInput({ type, ...props }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput
        type={isVisible ? "text" : "password"}
        {...props}
      />
      <InputGroupAddon>
        <InputGroupButton
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? <Eye /> : <EyeOff />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
