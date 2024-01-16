import React from 'react'
import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <button onClick={() => setVisible(!visible)}>{props.buttonLabel}</button>
      <div style={{ display: visible ? '' : 'none' }}>
        {props.children}
        <button onClick={() => setVisible(!visible)} style={{marginTop: "1em"}}>{props.cancelLabel || "Cancel"}</button>
      </div>
    </>
  )
}

export default Togglable