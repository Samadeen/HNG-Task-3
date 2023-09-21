import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Gallery from './pages/Gallery/Gallery';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/gallery' element={<Gallery />} />
    </Routes>
  );
}

export default App;
