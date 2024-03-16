import React from 'react'

const SearchModal = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center absolute top-0 left-0'>
      <div className='p-10 border bg-white text-black'>

        <input type="text" />
        <button>Search</button>
      </div>
    </div>
  )
}

export default SearchModal
