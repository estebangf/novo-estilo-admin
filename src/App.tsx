import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import CircularProgress from './Components/Loading/CircularProgress';
import Layout from './Layout';
import LogIn from './Pages/Auth/LogIn';
import RequireAuth from './Pages/Auth/RequireAuth';
import SignIn from './Pages/Auth/SignIn';
import { Account } from './Pages/Account/Account';
import { useApp } from './Tools/Hooks';
import AuthProvider from './Auth/AuthProvider';
import TurnsList from './Pages/Turns';
import TurnsToDay from './Pages/Turns/TurnsToDay';
import TurnsOfMont from './Pages/Turns/TurnsOfMont';

function App() {
  const app = useApp()

  return (
    <AuthProvider>
      {!app.isReady ?
        <CircularProgress loading={!app.isReady} />
        :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RequireAuth required={true}><Layout /></RequireAuth>}>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />
              {/* <Route path="/admin" element={<RequireAuth required={true}><Layout /></RequireAuth>}> */}
              <Route path="/turns/list" element={<TurnsList />} />
              <Route path="/turns/today" element={<TurnsToDay />} />
              <Route path="/turns/month" element={<TurnsOfMont />} />
              {/* </Route> */}
            </Route>
            <Route path="/about" element={<About />} />

            <Route path="/login" element={<RequireAuth required={false} exclud={true}><LogIn /></RequireAuth>} />
            <Route path="/signin" element={<RequireAuth required={false} exclud={true}><SignIn /></RequireAuth>} />


            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      }
      <CircularProgress loading={app.loading} />
    </AuthProvider >
  );
}


export default App;
