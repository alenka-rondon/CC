import logo from './Images/logo.png';
import './App.css';

// importing necessary components for routing
import {Home} from './Home';
import {Compare} from './Compare';
import {Calculator} from './Calculator';

// importing necessary modules for routing
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div>
      <div className='horizontal-div'>
        <Link to='/home'><img src={logo} alt="carbon compare logo" width="130" height="130"/></Link>
        <h1 className='title'>Carbon Compare</h1>
      </div>

      <div className='nav-bar'>
        <Link to='/compare'>Compare</Link>
        <Link to='/calculator'>Calculator</Link>
      </div>


      <Routes>
      <Route exact path='/' element={<Home/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/compare' element={<Compare/>}/>
        <Route exact path='/calculator' element={<Calculator/>}/>
      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;
