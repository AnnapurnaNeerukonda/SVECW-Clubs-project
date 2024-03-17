import React from 'react';
import SignUpPage from './SignUpPage';
import Home from './Home'
import LoginPage from './Login';
import { Route,Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Clubs from './Clubs';
import Appa from './CreatePost';
import Postdisplay from './Postdisplay';
import MacBookProPostForm from './CreatePost';
function App(){
  return(
    <div>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signuppage" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage />} /> 
        <Route path='/clubs' element ={<Clubs/>}/>
        <Route path='/displaypost' element={<Postdisplay/>}/>
        <Route path='/post' element={< Appa/>}/>        
      </Routes>
    </div>
  )
}

export default App;