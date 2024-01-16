import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  return notification === null
    ? ''
    : (
      <span className={"notification " + notification.type}>{notification.message}</span>
    )
}

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  })
}

export default Notification