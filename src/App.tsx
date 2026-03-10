import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'welcome' | 'intro' | 'aptitude' | 'interview-intro' | 'interview' | 'result' | 'subscribe' | 'webview';

interface WebViewState {
  url: string;
  title: string;
}

function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [userName, setUserName] = useState('');
  const [showText, setShowText] = useState('');
  const [webViewState, setWebViewState] = useState<WebViewState>({ url: '', title: '' });

  const nextStep = () => {
    const steps: Step[] = ['welcome', 'intro', 'aptitude', 'interview-intro', 'interview', 'result', 'subscribe', 'webview'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const openWebView = (url: string, title: string) => {
    setWebViewState({ url, title });
    setStep('webview');
  };

  // 타이핑 효과
  const typeText = (text: string, speed: number = 50) => {
    let i = 0;
    setShowText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setShowText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  };

  useEffect(() => {
    if (step === 'welcome') {
      typeText('안녕하세요! 저는 AI 취업 도우미 알비예요 🚀');
    }
  }, [step]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <AnimatePresence mode="wait">
        {step === 'welcome' && <WelcomeScreen text={showText} onNext={nextStep} userName={userName} setUserName={setUserName} />}
        {step === 'intro' && <IntroScreen onNext={nextStep} userName={userName} />}
        {step === 'aptitude' && <AptitudeScreen onNext={nextStep} openWebView={openWebView} />}
        {step === 'interview-intro' && <InterviewIntroScreen onNext={nextStep} userName={userName} />}
        {step === 'interview' && <InterviewScreen onNext={nextStep} openWebView={openWebView} />}
        {step === 'result' && <ResultScreen onNext={nextStep} userName={userName} />}
        {step === 'subscribe' && <SubscribeScreen openWebView={openWebView} />}
        {step === 'webview' && <WebViewScreen url={webViewState.url} title={webViewState.title} onBack={() => setStep('subscribe')} />}
      </AnimatePresence>
    </div>
  );
}

// 캐릭터 컴포넌트
function AlbiCharacter({ emotion = 'happy' }: { emotion?: 'happy' | 'excited' | 'thinking' }) {
  // 감정별 애니메이션 설정
  const animations = {
    happy: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
    },
    excited: {
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
    },
    thinking: {
      y: [0, -10, 0],
      rotate: [-5, 5, -5],
    }
  };

  return (
    <motion.div
      animate={animations[emotion]}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        width: '140px',
        height: '140px',
        marginBottom: '20px'
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 홀로그램 효과 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
          animation: 'shimmer 3s infinite'
        }} />
        
        {/* 알비 얼굴 */}
        <div style={{
          fontSize: '80px',
          zIndex: 1
        }}>
          {emotion === 'excited' ? '🚀' : emotion === 'thinking' ? '🤔' : '😊'}
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.div>
  );
}

// 말풍선 컴포넌트
function SpeechBubble({ text, children }: { text?: string; children?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '20px 25px',
        maxWidth: '320px',
        width: '100%',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        position: 'relative',
        marginTop: '10px'
      }}
    >
      {/* 말풍선 꼬리 */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0',
        height: '0',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid rgba(255, 255, 255, 0.95)',
      }} />
      
      {text && (
        <p style={{
          fontSize: '16px',
          color: '#333',
          margin: 0,
          lineHeight: '1.6',
          textAlign: 'center'
        }}>
          {text}
        </p>
      )}
      {children}
    </motion.div>
  );
}

// Step 1: 환영 화면
function WelcomeScreen({ text, onNext, userName, setUserName }: any) {
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowInput(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ textAlign: 'center' }}
    >
      <AlbiCharacter emotion="happy" />
      
      <SpeechBubble text={text} />

      {showInput && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '30px' }}
        >
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '15px',
              fontSize: '16px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              outline: 'none',
              background: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '15px'
            }}
          />
          <button
            onClick={onNext}
            disabled={!userName}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '15px',
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              background: userName ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#ccc',
              border: 'none',
              borderRadius: '12px',
              cursor: userName ? 'pointer' : 'not-allowed',
              boxShadow: userName ? '0 10px 30px rgba(102, 126, 234, 0.4)' : 'none',
              transition: 'all 0.3s'
            }}
          >
            다음
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// Step 2: 소개 화면
function IntroScreen({ onNext, userName }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ textAlign: 'center' }}
    >
      <AlbiCharacter emotion="excited" />
      
      <SpeechBubble>
        <p style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
          {userName}님, 반가워요! 👋
        </p>
        <p style={{ fontSize: '15px', color: '#666', margin: '10px 0' }}>
          취업 준비가 막막하시죠?<br />
          제가 단계별로 도와드릴게요!
        </p>
      </SpeechBubble>

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: '30px',
          padding: '15px 40px',
          fontSize: '16px',
          fontWeight: '600',
          color: 'white',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
        }}
      >
        시작하기 ✨
      </motion.button>
    </motion.div>
  );
}

// Step 3: 적성검사 화면
function AptitudeScreen({ onNext, openWebView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}
    >
      <AlbiCharacter emotion="thinking" />
      
      <SpeechBubble>
        <p style={{ fontSize: '17px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
          먼저 적성검사를 해볼까요? 🎯
        </p>
        <p style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>
          5분이면 끝나요!<br />
          당신의 강점을 찾아드릴게요 ✨
        </p>
      </SpeechBubble>

      <motion.button
        onClick={() => openWebView('https://albi.kr/job-test', '적성검사')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: '30px',
          padding: '18px 50px',
          fontSize: '18px',
          fontWeight: '600',
          color: 'white',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '15px',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
        }}
      >
        적성검사 시작하기 📝
      </motion.button>

      <button
        onClick={onNext}
        style={{
          marginTop: '15px',
          padding: '10px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        다음에 할게요
      </button>
    </motion.div>
  );
}

// Step 4: 면접 소개
function InterviewIntroScreen({ onNext, userName }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ textAlign: 'center' }}
    >
      <AlbiCharacter emotion="excited" />
      
      <SpeechBubble>
        <p style={{ fontSize: '17px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
          {userName}님, 잘하고 계세요! 🎉
        </p>
        <p style={{ fontSize: '15px', color: '#666', margin: '10px 0' }}>
          이제 AI 면접 시뮬레이션으로<br />
          실전 연습을 해볼까요?
        </p>
      </SpeechBubble>

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: '30px',
          padding: '15px 40px',
          fontSize: '16px',
          fontWeight: '600',
          color: 'white',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
        }}
      >
        면접 연습하기 💼
      </motion.button>
    </motion.div>
  );
}

// Step 5: 면접 화면
function InterviewScreen({ onNext, openWebView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}
    >
      <AlbiCharacter emotion="thinking" />
      
      <SpeechBubble>
        <p style={{ fontSize: '17px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
          실전처럼 연습해봐요! 🎤
        </p>
        <p style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>
          AI가 실시간으로 피드백을<br />
          제공해드릴게요
        </p>
      </SpeechBubble>

      <motion.button
        onClick={() => openWebView('https://albi.kr/chat', '면접 시뮬레이션')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: '30px',
          padding: '18px 50px',
          fontSize: '18px',
          fontWeight: '600',
          color: 'white',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '15px',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
        }}
      >
        면접 시작하기 🚀
      </motion.button>

      <button
        onClick={onNext}
        style={{
          marginTop: '15px',
          padding: '10px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        다음에 할게요
      </button>
    </motion.div>
  );
}

// Step 6: 결과 화면
function ResultScreen({ onNext, userName }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ textAlign: 'center' }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <AlbiCharacter emotion="excited" />
      </motion.div>
      
      <SpeechBubble>
        <p style={{ fontSize: '20px', fontWeight: '700', color: '#333', marginBottom: '15px' }}>
          🎉 수고하셨어요, {userName}님!
        </p>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '15px',
          borderRadius: '12px',
          margin: '15px 0'
        }}>
          <p style={{ fontSize: '14px', margin: '5px 0' }}>종합 평가</p>
          <p style={{ fontSize: '32px', fontWeight: '700', margin: '5px 0' }}>A+</p>
          <p style={{ fontSize: '14px', margin: '5px 0' }}>상위 15%</p>
        </div>
        <p style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>
          더 깊이 있는 멘토링을 원하시나요?
        </p>
      </SpeechBubble>

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: '20px',
          padding: '15px 40px',
          fontSize: '16px',
          fontWeight: '600',
          color: 'white',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
        }}
      >
        프리미엄 보기 ✨
      </motion.button>
    </motion.div>
  );
}

// Step 7: 구독 화면
function SubscribeScreen({ openWebView }: any) {
  const features = [
    { icon: '🤖', title: '1:1 AI 멘토링', desc: '24시간 무제한' },
    { icon: '🗺️', title: '맞춤 로드맵', desc: '당신만의 학습 경로' },
    { icon: '🎯', title: '실전 모의면접', desc: '20회 무료 제공' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}
    >
      <AlbiCharacter emotion="excited" />
      
      <SpeechBubble>
        <p style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '15px' }}>
          AI 멘토와 함께<br />미래를 설계해보세요! ✨
        </p>
      </SpeechBubble>

      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '25px',
        marginTop: '20px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
      }}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              marginBottom: index < features.length - 1 ? '10px' : 0,
              borderBottom: index < features.length - 1 ? '1px solid #eee' : 'none'
            }}
          >
            <div style={{ fontSize: '32px', marginRight: '15px' }}>
              {feature.icon}
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: '0 0 3px 0' }}>
                {feature.title}
              </p>
              <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => openWebView('https://albi.kr', 'Albi')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: '25px',
          padding: '18px 50px',
          fontSize: '18px',
          fontWeight: '700',
          color: 'white',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          border: 'none',
          borderRadius: '15px',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(240, 147, 251, 0.4)',
          width: '100%'
        }}
      >
        14일 무료 체험 시작 🎁
      </motion.button>

      <button
        onClick={() => openWebView('https://albi.kr', 'Albi')}
        style={{
          marginTop: '12px',
          padding: '10px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.8)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        먼저 둘러볼게요
      </button>
    </motion.div>
  );
}

// WebView 화면
function WebViewScreen({ url, title, onBack }: { url: string; title: string; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'white'
      }}
    >
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '15px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '15px'
          }}
        >
          ← 뒤로
        </button>
        <h2 style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: '600',
          color: 'white',
          flex: 1
        }}>
          {title}
        </h2>
      </div>

      {/* iframe */}
      <iframe
        src={url}
        style={{
          flex: 1,
          border: 'none',
          width: '100%'
        }}
        allow="camera; microphone; geolocation; payment"
      />
    </motion.div>
  );
}

export default App;
