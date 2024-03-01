import React from 'react'
import Hero from '../components/Hero'


const Home = () => {

  const movieIds = [19995, 14564]; 
  return (
    <div>
      <Hero movieIds={movieIds} />
    </div>
  )
}

export default Home
