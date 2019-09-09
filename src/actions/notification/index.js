import actionType from '../actionType'

export const maskNotificationRead = (id) => {
  return {
    type: actionType.MASK_NOTIFICATION_READ,
    payload: {
      id
    }
  }
}
