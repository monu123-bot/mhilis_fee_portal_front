import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import StudentLogin from './component/StudentLogin';
import AdminLogin from './component/AdminLogin';

function App() {
  return (
    <>
     
      <div className=" outerbox">
      <Router>
        <Routes>
          <Route path='/'  Component={StudentLogin}   exact/>
          <Route   path='/admin' Component={AdminLogin}    />
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
