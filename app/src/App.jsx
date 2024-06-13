import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Countries from './pages/Countries'
import Content from './pages/Content'
import Error from './pages/Error'
import NavMenu from './components/NavMenu'
import Footer from './components/Footer'
import SignIn from './components/SignIn'

/**
 * App
 *
 * This will handles each component on the page and the routes to each page.
 *  
 * @author Pik Sum Siu
 */
function App() {

  const [signedIn, setSignedIn] = useState(false)
  const [save, setSave] = useState([])


  return (
    <>
      <div className="bg-gray-800">
        <SignIn
          signedIn={signedIn} setSignedIn={setSignedIn}
          save={save} setSave={setSave}
        />
        <NavMenu />
      </div>

      <div className="App">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/content" element={<Content
            signedIn={signedIn}
            save={save}
            setSave={setSave}
          />
          }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer className="inset-x-0 bottom-0" />
    </>
  )
}

export default App;
