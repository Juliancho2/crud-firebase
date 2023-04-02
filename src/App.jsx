import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import firebaseApp from './credentials';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(firebaseApp);


function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setLoggedUser(userFirebase)
    }
    else {
      setLoggedUser(null);
    }

  })

  return (
    <div className="App">
      {
        loggedUser ? <Home setLoggedUser={setLoggedUser} user={loggedUser.email} /> : <Login />
      }

    </div>
  )
}

export default App
