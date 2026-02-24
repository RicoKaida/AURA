/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import GeneratorPage from './pages/GeneratorPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="generator" element={<GeneratorPage />} />
          <Route path="calculator" element={<GeneratorPage />} /> {/* Alias */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
