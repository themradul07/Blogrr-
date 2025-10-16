"use client"
import React from 'react'

import { Button, ButtonProps } from './ui/button'
import { useFormState, useFormStatus } from 'react-dom'

const SubmitButton = ({children, ...props}: ButtonProps) => {
    const {pending} = useFormStatus();
  return (
    <Button {...props}>
    {pending ? <span className="">Submitting</span>: children}
    </Button>
  )
}

export default SubmitButton