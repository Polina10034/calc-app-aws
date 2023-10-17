import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Shell from './layouts/shell';
import UploadFile from './pages/upload-files/app';



function App() {
  return (
    <>
      <Shell/> 
      <Routes>
        <Route path="/uploadfile" element={<UploadFile/>} />
      </Routes>
    </>

  );
}

export default App;
