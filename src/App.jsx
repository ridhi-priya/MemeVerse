import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from '../src/components/Layout';
import Home from '../src/components/Home';
import Explorer from '../src/components/Explorer';
import Upload from '../src/components//Upload';
import MemeDetails from '../src/components//MemeDetails';
import Profile from '../src/components/Profile';
import Leaderboard from '../src/components/Leaderboard';
import NotFound from '../src/components/NotFound';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explorer />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/meme/:id" element={<MemeDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;