import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthGuard from './AuthGuard'
const Projects = lazy(() => import('../components/Projects/Projects'));
const HistoryList = lazy(() => import('../components/History/HistoryList'));

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/history" element={<AuthGuard>
            <HistoryList />
            </AuthGuard>} />
         <Route path="/" element={<AuthGuard>
            <Projects />
            </AuthGuard>} />
          <Route
            path="*"
            element={<div>Page not found. Please check the URL.</div>}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
