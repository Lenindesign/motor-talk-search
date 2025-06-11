import React from 'react';

/**
 * Extremely basic design system page with no dependencies
 * This should load without any issues
 */
const DesignSystemBasic = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Design System</h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: '#666' }}>
        A basic version of the design system with no dependencies
      </p>
      
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Colors</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#D81E05', borderRadius: '4px' }}></div>
            <p style={{ marginTop: '0.5rem' }}>MotorTrend Red</p>
          </div>
          <div>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#1A1A1A', borderRadius: '4px' }}></div>
            <p style={{ marginTop: '0.5rem' }}>MotorTrend Dark</p>
          </div>
          <div>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#F5F5F5', borderRadius: '4px', border: '1px solid #eee' }}></div>
            <p style={{ marginTop: '0.5rem' }}>MotorTrend Gray</p>
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Typography</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Heading 1</h1>
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Heading 2</h2>
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Heading 3</h3>
          </div>
          <div>
            <p style={{ fontSize: '1rem' }}>Body Text</p>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem' }}>Small Text</p>
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Buttons</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{ 
            backgroundColor: '#D81E05', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Primary Button
          </button>
          <button style={{ 
            backgroundColor: '#1A1A1A', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Secondary Button
          </button>
          <button style={{ 
            backgroundColor: 'transparent', 
            color: '#1A1A1A', 
            padding: '0.5rem 1rem', 
            border: '1px solid #1A1A1A', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Outline Button
          </button>
        </div>
      </div>
      
      <div>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          <div style={{ 
            border: '1px solid #eee', 
            borderRadius: '8px', 
            padding: '1.5rem', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Card Title</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Card description goes here</p>
            <p>This is the content of the card. It can contain various elements and information.</p>
          </div>
          <div style={{ 
            border: '1px solid #eee', 
            borderRadius: '8px', 
            padding: '1.5rem', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Card Title</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Card description goes here</p>
            <p>This is the content of the card. It can contain various elements and information.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemBasic;
