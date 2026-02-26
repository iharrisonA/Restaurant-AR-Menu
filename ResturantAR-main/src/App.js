import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ItemDetails from './components/ItemDetails';
import Login from './components/Login';
import PostReview from './components/PostReview';
import Register from './components/Register';
import Reviews from './components/Reviews';
import ScanPage from './components/ScanPage';
import UserProfile from './components/UserProfile';
import { useAuthState } from './Context/context';
function App() {

  const userDetails = useAuthState();
  
  return (
    <BrowserRouter>
      <Routes>  
       
        <Route exact index path="/" element={!userDetails ? (<Navigate to="/Login"/>) :<Home/>} />
        <Route exact path="Login" element={<Login />} />
        <Route exact path="Register" element={<Register />} />
        <Route exact path="UserProfile" element={<UserProfile />} />
        <Route exact path="Scan" element={<ScanPage />} />
        <Route exact path="ItemDetails/:itemId" element={<ItemDetails />} />
        <Route exact path="Reviews/:itemId" element={<Reviews />} />
        <Route exact path="PostReview/:itemId" element={<PostReview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
