import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <button onClick={() => setVisible(!visible)}>{props.buttonLabel}</button>
      <div style={{ display: visible ? '' : 'none' }}>
        {props.children}
        <button onClick={() => setVisible(!visible)} style={{marginTop: '1em'}}>{props.cancelLabel || 'Cancel'}</button>
      </div>
    </>
  )
}

Togglable.propTyes = {
  buttonLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string,
}

export default Togglable