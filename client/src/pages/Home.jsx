import React from 'react'
import Hero from '../componets/home/Hero'
import Biography from '../componets/home/Biography'
import Departments from '../componets/home/Departments'
import MessageForm from '../componets/home/MessageForm'

function Home() {
  return (
    <div className='bg-slate-200'>
      <Hero title={"Welcom to ZeeCare Medical institute | Your Trusted HealthCare Provider"}
            imagrUrl={"./hero.png"}      
      />
      <Biography imageUrl={'./doctor.webp'}/>
      <Departments/>
      <MessageForm/>
    </div>
  )
}

export default Home