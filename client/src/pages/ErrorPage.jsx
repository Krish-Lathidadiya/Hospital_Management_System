import React from 'react'
import { NavLink } from 'react-router-dom'

function ErrorPage() {
  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="container mx-auto text-center">
      <h1 className="text-6xl md:text-8xl text-red-500 font-bold mb-4">404</h1>
      <h4 className="text-2xl md:text-3xl font-semibold mb-2">Sorry! Page Not Found</h4>
      <p className="text-lg text-gray-700 mb-6">
        Oops! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quidem quisquam omnis molestiae reiciendis quaerat minus consequuntur possimus non. Dicta, aliquid? Quidem doloribus necessitatibus dolor quia dicta eaque officia sed!
      </p>
      <div className="flex justify-center space-x-4">
        <NavLink to='/' className='btn btn-primary'>Return Home</NavLink>
        <NavLink to='/contact' className='btn btn-primary'>Report Problem</NavLink>
      </div>
    </div>
  </section>
  )
}

export default ErrorPage
