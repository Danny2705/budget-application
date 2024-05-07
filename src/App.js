import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Register/Signup";
import Layout from "./screens/Layout/Layout";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/' />}
        />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='*'
          element={user ? <Layout /> : <Navigate to='/login' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
