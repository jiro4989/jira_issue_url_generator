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
      <label>{label}</label>
      <textarea onChange={(e) => setValue(e.target.value)} value={value} />
    </div>
  )
}
