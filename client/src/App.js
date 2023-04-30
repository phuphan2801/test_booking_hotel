import Navbar from './components/Navbar';
import {Routes , Route} from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import './App.css';
import Bookingscreen from './screens/Bookingscreen';
import Register from './screens/Register';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">    
      <Navbar/>      
      <Routes>
          <Route path="/home" exact element={<Homescreen/>}/>
          <Route path="/book/:roomid/:fromdate/:todate" exact element={<Bookingscreen/>}/>
          <Route path="/register" exact element={<Register/>}/>
          <Route path="/login" exact element={<Loginscreen/>}/>
          <Route path="/profile" exact element={<Profilescreen/>}/>
          <Route path="/admin" exact element={<Adminscreen/>}/>
          <Route path="/" exact element={<Landingscreen/>}/>
      </Routes>                      
    </div> 
  );
}

export default App;
