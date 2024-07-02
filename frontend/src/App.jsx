import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin ? <login /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
      </div>
    </>
  )
}

export default App