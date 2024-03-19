import React from 'react';
import SignUpPage from './SignUpPage';
import Home from './Home'
import LoginPage from './Login';
import { Route,Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Clubs from './Clubs';
// import Appa from './CreatePost';
import Postdisplay from './Postdisplay';
import CreatePost from './CreatePost';
import UserProfile from './uploadprofilepicture';
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
        <Route path='/userProfile' element={<UserProfile/>}   /> 
        <Route path='/create-post' element={<CreatePost/>}   /> 
      </Routes>
    </div>
  )
}

export default App;