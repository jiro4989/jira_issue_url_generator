import React from 'react'

export default function TextareaComponent({
  value,
  setValue,
  label,
}: {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  label: string
}) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <textarea
        id={label}
        className="Input FullWidth"
        name={label}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  )
}
