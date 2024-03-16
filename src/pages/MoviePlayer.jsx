import React from 'react'
import { useParams } from 'react-router-dom'
import Player from '../components/props/Player';


const MoviePlayer = () => {
const {movieid} = useParams();
  return (
    <div className=''>
      <Player id={movieid}/>
    </div>
  )
}

export default MoviePlayer
