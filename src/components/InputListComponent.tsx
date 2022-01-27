import React from 'react'

export default function InputListComponent({
  values,
  setValues,
  label,
}: {
  values: string[]
  setValues: React.Dispatch<React.SetStateAction<string[]>>
  label: string
}) {
  function addValue() {
    setValues([...values, ''])
  }

  function deleteValue(index: number) {
    values.splice(index, 1)
    setValues([...values])
  }

  function changeValue(index: number, value: string) {
    values[index] = value
    setValues([...values])
  }

  const labelsElement = values.map((e, i) => (
    <li key={i}>
      <input
        className="Input ShortWidth"
        type="text"
        value={e}
        onChange={(v) => changeValue(i, v.target.value)}
      />
      <button className="VeryShortWidth" onClick={(e) => deleteValue(i)}>
        Delete
      </button>
    </li>
  ))

  return (
    <div>
      <p>{label}</p>
      <p>
        <button className="VeryShortWidth" onClick={(e) => addValue()}>
          Add
        </button>
      </p>
      <ul>{labelsElement}</ul>
    </div>
  )
}
