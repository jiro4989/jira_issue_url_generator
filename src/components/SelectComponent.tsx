import React from 'react'

export default function SelectComponent<T extends number>({
  value,
  setValue,
  optionValues,
  converter,
  label,
}: {
  value: T
  setValue: React.Dispatch<React.SetStateAction<T>>
  optionValues: T[]
  converter: (value: T) => string
  label: string
}) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <select
        id={label}
        name={label}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value) as T)}
      >
        {optionValues.map((e, i) => (
          <option key={i} value={e}>
            {converter(e)}
          </option>
        ))}
      </select>
    </div>
  )
}
