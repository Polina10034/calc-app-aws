import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Shell from './layouts/shell';
import UploadFile from './pages/upload-files/app';
import Breadcrumbs from './components/breadcrumbs';
import UploadFiles3 from './components/uploadfiles3';
import ResultsTable from './components/resultsTable';


function App() {
  return (
    <> 
      {/* <Shell/>  */}
      <Routes>
        <Route path="/" element={
        <Shell 
          breadcrumbs={<Breadcrumbs active={{ text: 'Upload CUR File', href: '/' }} />}
          children={<UploadFiles3/>}
        />} />
        <Route path="/Results" element={
          <Shell
          contentType="table"
          breadcrumbs={<Breadcrumbs active={{ text: 'Analysis Results', href: '/Results'  }} />}
          children={<ResultsTable/>}
          />
         } />
        {/* <Route path="/uploadfile" element={<UploadFile/>} /> */}
      </Routes>
    </>

  );
}

export default App;
