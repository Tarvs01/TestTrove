import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between px-10 py-4'>
      <h1>TestTrove</h1>

      <ul className='flex border-2 border-emerald-950 w-3/5 justify-between'>
        <li>Take Test</li>
        <li>Create Test</li>
        <li>Log in</li>
      </ul>
    </nav>
  )
}

export default Navbar