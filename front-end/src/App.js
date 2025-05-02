import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateConponent';
import Login from './components/Login';
import AddTask from './components/AddTask';
import UpdateProduct from './components/UpdateProduct';
import UpdateProject from './components/UpdateProject';
import CreateProject from './components/CreateProject';
import ViewProject from './components/ViewProject';
import ViewTask from './components/ViewTask';
import UpdateTask from './components/UpdateTask';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}>
            {/* //<Route path='/add' element={<AddTask />} /> */}
            <Route path='/' element={<ViewProject />} />
            <Route path='/add-project' element={<CreateProject />}/>
            <Route path= "/update-project/:projectId"element={<UpdateProject />} />
            <Route path="/view-task/:projectId" element={<ViewTask />} />
            <Route path="/add-task/:projectId" element={<AddTask />}  />
            <Route path="/update-task/:taskId" element={<UpdateTask />} />
            <Route path='/logout' element={<h1>Log out Page Component</h1>} />
            <Route path='/profile' element={<h1>Profile Page Component</h1>} />
          </Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login/>} />
        </Routes>
        
      </BrowserRouter>
      
    </div>
  );
}

export default App;
