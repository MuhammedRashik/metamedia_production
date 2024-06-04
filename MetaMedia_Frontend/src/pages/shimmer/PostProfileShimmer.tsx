import React from 'react'

const PostProfileShimmer =React.memo( () => {
  return (
    <>
    <div className="animate-pulse bg-gray-300 rounded-md w-64 h-64"> </div>
    <div className="animate-pulse bg-gray-300 rounded-md w-64 h-64"> </div>
    <div className="animate-pulse bg-gray-300 rounded-md w-64 h-64"> </div>
    </>
  )
})

export default PostProfileShimmer