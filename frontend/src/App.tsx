import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Login from './components/Login/Login';
import Games from './components/Games/BrowseGames/Games';
import Register from './components/Register/Register';
import Order from './components/Games/Order/Order';
import Board from './components/Panel/Board/Board';
import AdminPanel from './components/Panel/AdminPanel/AdminPanel';
import Workspace from './components/Panel/Workspace/Workspace';
import Projects from './components/Panel/Projects/Projects';
import ManageEmployees from './components/Panel/ManageEmployees/ManageEmployees';
import EmployeePanel from './components/Panel/EmployeePanel/EmployeePanel';
import NewSchema from './components/Panel/NewSchema/NewScheme';
import './App.css';
import Profile from "./components/Personal/Profile/Profile";
import MyOrders from "./components/Personal/MyOrders/MyOrders";
import CustomOptionPanel from "./components/Panel/Custom/CustomOptionPanel";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/games' element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/order' element={<Order />} />
          <Route path='/panel/workspace/board' element={<Board />} />
          <Route path='/panel/admin' element={<AdminPanel />} />
          <Route path='/panel/custom' element={<CustomOptionPanel />} />
          <Route path='/panel/employee' element={<EmployeePanel />} />
          <Route path='/panel/workspace' element={<Workspace />} />
          <Route path='/panel/projects' element={<Projects />} />
          <Route path='/panel/manage' element={<ManageEmployees />} />
          <Route path='/panel/scheme' element={<NewSchema />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
