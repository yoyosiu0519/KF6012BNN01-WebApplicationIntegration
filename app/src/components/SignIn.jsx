import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
/**
 * Sign in component
 * 
 * This mainly handles the sign in functionality of the system.
 * It takes the Token endpoint and the Save endpoint to get the token and save data.
 * 
 * @author Pik Sum Siu
 */

function SignIn(props) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [signInError, setSignInError] = useState(false)

  useEffect(
    () => {
      const token = localStorage.getItem('token')
      if (token) {
        props.setSignedIn(true);
        getSave(token)
      }
    }
    , []
  )

  const getSave = (token) => {
    fetch('https://w20012367.nuwebspace.co.uk/kf6012/coursework/api/save',
      {
        method: 'GET',
        headers: new Headers({ "Authorization": "Bearer " + token })
      })
      .then(response => response.json())
      .then(data => {
        const flattenedData = data.map((content) => content.content_id)

        props.setSave(flattenedData)

      })
      .catch(error => console.log(error))
  }

  const signIn = () => {
    const encodedString = btoa(username + ':' + password)

    fetch('https://w20012367.nuwebspace.co.uk/kf6012/coursework/api/token',
      {
        method: 'GET',
        headers: new Headers({ "Authorization": "Basic " + encodedString })
      })
      .then(response => {
        if (response.status === 401) {
          props.setSignedIn(false);
          toast.error('Please try sign in again.');
          return;
        }
        if (response.status === 200) {
          props.setSignedIn(true);
          setSignInError(false);
          toast.success('Signed in successfully!');
        } else {
          setSignInError(true);
          toast.error('Sign-in error occurred!');
        }
        return response.json()
      })
      .then(data => {

        if (data.token) {
          localStorage.setItem('token', data.token)
        }
        getSave(data.token)
      })
      .catch(error => console.log(error))

  }
  const signOut = () => {
    props.setSignedIn(false);
    localStorage.removeItem('token');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    toast.success('Signed out successfully!');
  }

  const handleUsername = (event) => { setUsername(event.target.value) }
  const handlePassword = (event) => { setPassword(event.target.value) }

  const bgColour = (signInError) ? " bg-red-200" : " bg-slate-100"

  return (
    <div className='p-2 text-md text-right text-black'>
      <Toaster />
      {!props.signedIn && <div>
        <input
          type="text"
          placeholder='username'
          className={'p-1 mx-2 rounded-md' + bgColour}
          value={username}
          onChange={handleUsername}
        />
        <input
          type="password"
          placeholder='password'
          className={'p-1 mx-2 rounded-md' + bgColour}
          value={password}
          onChange={handlePassword}
        />
        <input
          type="submit"
          value='Sign In'
          className='py-1 px-2 mx-2 bg-gray-300 hover:bg-gray-500 rounded-md'
          onClick={signIn}
        />
      </div>
      }
      {props.signedIn && <div>
        <input
          type="submit"
          value='Sign Out'
          className='py-1 px-2 mx-2 bg-gray-300 hover:bg-gray-500 rounded-md'
          onClick={signOut}
        />
      </div>
      }
      <div className='text-white'>
        {signInError && <p>Invalid username or password</p>}
      </div>


    </div>

  )
}

export default SignIn