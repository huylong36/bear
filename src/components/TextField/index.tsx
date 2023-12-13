import { InputBase, InputBaseProps } from '@mui/material';
import React, { forwardRef, PropsWithoutRef } from 'react';

const InputField = forwardRef((props: PropsWithoutRef<InputBaseProps>, ref) => {
  const { ...textFieldProps } = props;
  return (
    <InputBase
      {...(textFieldProps) as InputBaseProps}
      inputRef={ref}
      inputProps={{
        ...textFieldProps.inputProps,
      }}
      sx={{
        ...textFieldProps.sx,
        fontFamily: "inherit"
      }}
    />
  )
})

export default InputField;