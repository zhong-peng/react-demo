import actionType from '../../actions/actionType'

const initState = {
  content: [
    {
      id: 1,
      title: 'asdfasdfasd',
      hasRead: true
    },
    {
      id: 2,
      title: 'asdfasdfasd',
      hasRead: false
    },
    {
      id: 3,
      title: 'asdfasdfasd',
      hasRead: false
    }
  ]
}

export default (state = initState, action) => {
  switch(action.type) {
    case actionType.MASK_NOTIFICATION_READ:
      return {
        ...state,
        content: state.content.map( item => {
          if ( item.id === action.payload.id ) {
            item.hasRead = true
          }
          return item;
        })
      }
    default:
      return state
  }
}