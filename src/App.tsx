import React from 'react';

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'sans-serif'
    }}>
      <iframe
        src="https://albi.kr"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        allow="camera; microphone; geolocation; payment"
        title="Albi"
      />
    </div>
  );
}

export default App;
