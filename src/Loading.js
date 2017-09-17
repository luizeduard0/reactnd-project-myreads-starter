import React from 'react'

const Loading = props => {
  return props.show ? <div className="loader"><div>Loading...</div></div> : null
}

export default Loading
