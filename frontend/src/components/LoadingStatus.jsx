import React from 'react'

function LoadingStatus({theme}) {
  return (
    <div className='loading-container'>
        <h2>Generating Your {theme} Story</h2>

        <div className='loading-animation'>
            <div className="spinner"></div>
        </div>

        <p className='loading-info'>
            Please wait while we create a unique and engaging story just for you.
        </p>
    </div>
  )
}

export default LoadingStatus