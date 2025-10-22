"use client";
import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children, variant, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending || props.disabled} variant={
      variant
    } aria-busy={pending}>
      {pending ? <span>Submitting...</span> : children}
    </Button>
  );
};

export default SubmitButton;
