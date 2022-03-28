import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Form from './components/FormComponent';
import FormList from "./components/FormList";
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/form" element={<Form />}></Route>
      <Route path="/formList" element={<FormList />}></Route>  
      </Routes>
     </div>
  );
}

export default App;
