import React from 'react'

export type InputValue = string | number

function requiredValue(value: InputValue, enable: boolean): string {
  if (enable) {
    switch (typeof value) {
      case 'string':
        return value.trim() !== '' ? 'StateOK' : 'StateNG'
      case 'number':
        return 0 < value ? 'StateOK' : 'StateNG'
    }
  }
  return ''
}

export default function InputComponent({
  value,
  setValue,
  type,
  label,
  isRequired,
  placeholder,
}: {
  value: InputValue
  setValue: React.Dispatch<React.SetStateAction<InputValue>>
  type: string
  label: string
  isRequired: boolean
  placeholder: string
}) {
  function wrapSetValue(value: string) {
    switch (typeof value) {
      case 'string':
        return setValue(value)
      case 'number':
        return setValue(parseInt(value))
    }
  }

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        name={label}
        className={requiredValue(value, isRequired)}
        type={type}
        onChange={(e) => wrapSetValue(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  )
}
