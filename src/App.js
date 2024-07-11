import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Register/Signup";
import NoMatch from "./screens/NoMatch/NoMatch";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Dashboard from "./screens/Dashboard/Dashboard";
import Transaction from "./screens/Transaction/Transaction";
import Budget from "./screens/Budget/Budget";
import Profile from "./screens/Profile/Profile";
import About from "./screens/About/About";
import Overview from "./screens/Overview/Overview";
import "../src/App.scss";
import CreateTransaction from "./components/CreateTransaction/CreateTransaction";
import { SkeletonTheme } from "react-loading-skeleton";
//temporary import
import Chat from "./components/Chat/Chat";



function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
      <BrowserRouter>
        <Toaster position='top-right' />
        <Routes>
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/' />}
          />
          <Route
            path='/signup'
            element={!user ? <Signup /> : <Navigate to='/' />}
          />
          <Route
            path='/'
            element={user ? <Dashboard /> : <Navigate to='/login' />}
          />
          <Route
            path='/transaction'
            element={user ? <Transaction /> : <Navigate to='/login' />}
          />
          <Route
            path='/budget'
            element={user ? <Budget /> : <Navigate to='/login' />}
          />
          <Route
            path='/overview'
            element={user ? <Overview /> : <Navigate to='/login' />}
          />
          <Route
            path='/profile'
            element={user ? <Profile /> : <Navigate to='/login' />}
          />
          <Route path='/nomatch' element={<NoMatch />} />
          <Route path='/about' element={<About />} />
          <Route path='/budget/transaction/:id' element={<Transaction />} />
          <Route path='/create' element={<CreateTransaction />} />
          <Route
            path='/chat'
            element={user ? <Chat userId={user.uid} /> : <Navigate to='/login' />}
          />
          {/* <Route
            path='*'
            element={
              !user ? <Navigate to='/login' /> : <Navigate to='/nomatch' />
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
