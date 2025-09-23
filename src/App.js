import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import PrismaticBurst from './components/PrismaticBurst';

function App() {
  return (
    <div className="App">
      <div className="background-layer">
        <PrismaticBurst
          animationType="rotate3d"
          intensity={2}
          speed={0.5}
          distort={1.0}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={24}
          mixBlendMode="normal"
          colors={['#000000', '#333333', '#666666']}
        />
      </div>
      <div className="content-layer">
        <Header />
        <Hero />
        <Navigation />
      </div>
    </div>
  );
}

export default App;
