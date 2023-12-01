import React from 'react'

const Notification = ({ notification }) => {
  return notification === null
    ? ''
    : (
      <span className={"notification " + notification.type}>{notification.message}</span>
    )
}

export default Notification