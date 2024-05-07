import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Register/Signup";
import NoMatch from "./screens/NoMatch/NoMatch";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Dashboard from "./screens/Dashboard/Dashboard";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/dashboard' />}
        />
        <Route
          path='/signup'
          element={!user ? <Signup /> : <Navigate to='/dashboard' />}
        />
        <Route
          path='/dashboard'
          element={user ? <Dashboard /> : <Navigate to='/login' />}
        />
        <Route path='/nomatch' element={<NoMatch />} />
        <Route
          path='*'
          element={
            !user ? <Navigate to='/login' /> : <Navigate to='/nomatch' />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
