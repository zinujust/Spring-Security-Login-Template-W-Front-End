import './App.css';
import { Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar';
import LandingPage from './component/LandingPage';
import SignIn from './component/SignIn';
import CreateAccount from './component/CreateAccount';

function App() {
  return (
    <div >
      <Navbar />


      <Routes>
        <Route exact path='/' element={<LandingPage />}></Route>
        <Route path='sign-in' element={<SignIn />}></Route>
        <Route path='create-account' element={<CreateAccount />}></Route>
      </Routes>
    </div>
  );
}

export default App;
