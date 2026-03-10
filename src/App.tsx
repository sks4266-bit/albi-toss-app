import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#6366F1',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          🚀 Albi
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          AI 취업 준비 플랫폼
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                이름을 입력해주세요
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6366F1'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <button
              type="submit"
              disabled={!name}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                background: name ? '#6366F1' : '#cbd5e1',
                border: 'none',
                borderRadius: '8px',
                cursor: name ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              시작하기
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              👋
            </div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '10px'
            }}>
              환영합니다, {name}님!
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '30px'
            }}>
              AI가 도와주는 취업 준비를<br />
              시작해보세요
            </p>
            <div style={{
              display: 'flex',
              gap: '10px',
              flexDirection: 'column'
            }}>
              <button style={{
                padding: '12px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                background: '#6366F1',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                📝 AI 면접 준비
              </button>
              <button style={{
                padding: '12px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                background: '#8b5cf6',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                💼 이력서 작성
              </button>
              <button style={{
                padding: '12px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                background: '#a855f7',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                👥 멘토 매칭
              </button>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                marginTop: '20px',
                padding: '10px',
                fontSize: '14px',
                color: '#6366F1',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              처음으로
            </button>
          </div>
        )}

        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#999'
          }}>
            ⚠️ 데모 버전입니다<br />
            실제 서비스는 https://albi.kr 에서 확인하세요
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
