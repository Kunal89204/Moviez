import React from 'react'
import ShowPlayer from '../components/props/ShowPlayer'
import { useParams } from 'react-router-dom'


const TvPlayer = () => {
    const {showid} = useParams()
  return (
    <div >
     <ShowPlayer id = {showid} />
    </div>
  )
}

export default TvPlayer
