import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

const App = () => {

  const pageSize = 5;

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar />

        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
        />

        <Routes>
          <Route
            path="/"
            element={<News setProgress={setProgress} key="general" pageSize={pageSize} country="us" category="general" />}
          />

          <Route
            path="/Business"
            element={<News setProgress={setProgress} key="business" pageSize={pageSize} country="us" category="business" />}
          />

          <Route
            path="/Entertainment"
            element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />}
          />

          <Route
            path="/Health"
            element={<News setProgress={setProgress} key="health" pageSize={pageSize} country="us" category="health" />}
          />

          <Route
            path="/Science"
            element={<News setProgress={setProgress} key="science" pageSize={pageSize} country="us" category="science" />}
          />

          <Route
            path="/Sports"
            element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country="us" category="sports" />}
          />

          <Route
            path="/Technology"
            element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country="us" category="technology" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
