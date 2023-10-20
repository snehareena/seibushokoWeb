import { NumberInput, Select, TextInput } from '@mantine/core';
import React from 'react'

const FormInput = (props) => {
    const {type,label,name,form}= props;
  return (
    <div key={name}>
    {type === "number" && <NumberInput min={0} label={label} {...props} {...form.getInputProps(name)} removeTrailingZeros/>}

      {type === "text"&& (
        <TextInput label={label} {...props} {...form.getInputProps(name)} />
      )}
      {type === "select" && <Select label={label} {...props} {...form.getInputProps(name)} />}
    </div>
  )
}

export default FormInput