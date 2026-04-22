import React from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        Welcome to Your React Website
      </h1>
      <p style={{
        fontSize: '1.2rem',
        marginBottom: '40px',
        maxWidth: '600px',
        lineHeight: '1.6'
      }}>
        Edit this file and see changes instantly without saving! Vite provides hot module replacement for seamless development.
      </p>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '30px',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        maxWidth: '500px'
      }}>
        <h2 style={{
          marginBottom: '20px',
          color: '#ffd700'
        }}>
          Features
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          <li style={{
            margin: '10px 0',
            padding: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px'
          }}>
            Hot Module Replacement (HMR)
          </li>
          <li style={{
            margin: '10px 0',
            padding: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px'
          }}>
            Fast development server
          </li>
          <li style={{
            margin: '10px 0',
            padding: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px'
          }}>
            Instant refresh on changes hehehhe
          </li>
        </ul>
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
