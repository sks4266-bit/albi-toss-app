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
    
    // 뒤로가기 이벤트 처리
    const handleBackButton = (e: PopStateEvent) => {
      if (step === 'welcome') {
        // 최초 화면에서 뒤로가기 시 종료
        if (window.confirm('Albi를 종료하시겠습니까?')) {
          window.history.back();
        } else {
          e.preventDefault();
        }
      }
    };
    
    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, [step]);

  return (
    <div style={{
      minHeight: '100vh',
      maxHeight: '100vh',
      overflow: 'auto',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Pretendard", sans-serif',
      position: 'relative',
      colorScheme: 'light', // 라이트 모드 명시
      boxSizing: 'border-box'
    }}>
      {/* 배경 애니메이션 요소 */}
      <BackgroundStars />
      
      <AnimatePresence mode="wait">
        {step === 'welcome' && <WelcomeScreen text={showText} onNext={nextStep} userName={userName} setUserName={setUserName} />}
        {step === 'intro' && <IntroScreen onNext={nextStep} userName={userName} />}
        {step === 'aptitude' && <AptitudeScreen onNext={nextStep} />}
        {step === 'interview-intro' && <InterviewIntroScreen onNext={nextStep} userName={userName} />}
        {step === 'interview' && <InterviewScreen onNext={nextStep} />}
        {step === 'result' && <ResultScreen onNext={nextStep} userName={userName} />}
        {step === 'subscribe' && <SubscribeScreen />}
      </AnimatePresence>
    </div>
  );
}

// 배경 별 애니메이션 (성능 최적화: 20개 → 8개)
function BackgroundStars() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -100]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
            zIndex: 0
          }}
        />
      ))}
    </>
  );
}

// 알비 캐릭터 컴포넌트 (3D 느낌)
function AlbiCharacter({ emotion = 'happy' }: { emotion?: 'happy' | 'excited' | 'thinking' }) {
  const animations = {
    happy: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    },
    excited: {
      y: [0, -30, 0],
      scale: [1, 1.15, 1],
      rotate: [0, 10, -10, 0],
    },
    thinking: {
      y: [0, -10, 0],
      rotate: [-3, 3, -3],
    }
  };

  const emojis = {
    happy: 'https://www.genspark.ai/api/files/s/vN4MCd5h', // 알비 캐릭터 이미지
    excited: 'https://www.genspark.ai/api/files/s/vN4MCd5h',
    thinking: 'https://www.genspark.ai/api/files/s/vN4MCd5h'
  };

  return (
    <motion.div
      animate={animations[emotion]}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        width: '160px',
        height: '160px',
        marginBottom: '30px',
        position: 'relative',
        zIndex: 1
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
        boxShadow: '0 20px 60px rgba(102, 126, 234, 0.6), 0 0 40px rgba(118, 75, 162, 0.4)',
        position: 'relative',
        overflow: 'hidden',
        border: '4px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* 홀로그램 효과 */}
        <motion.div
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
            transform: 'skewX(-20deg)'
          }}
        />
        
        {/* 알비 캐릭터 이미지 */}
        <motion.img
          src={emojis[emotion]}
          alt="Albi Character"
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: '120px',
            height: '120px',
            zIndex: 1,
            filter: 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3))',
            objectFit: 'contain'
          }}
        />

        {/* 외곽 빛나는 링 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '3px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.6)'
          }}
        />
      </div>
    </motion.div>
  );
}

// 말풍선 컴포넌트
function SpeechBubble({ text, children }: { text?: string; children?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        background: 'rgba(255, 255, 255, 0.98)',
        borderRadius: '25px',
        padding: '20px 25px',
        maxWidth: '90%',
        width: '100%',
        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.25), 0 5px 15px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(15px)',
        border: '2px solid rgba(255, 255, 255, 0.5)',
        position: 'relative',
        marginTop: '15px',
        zIndex: 1,
        boxSizing: 'border-box'
      }}
    >
      {/* 말풍선 꼬리 */}
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0',
        height: '0',
        borderLeft: '12px solid transparent',
        borderRight: '12px solid transparent',
        borderBottom: '12px solid rgba(255, 255, 255, 0.98)',
        filter: 'drop-shadow(0 -2px 3px rgba(0, 0, 0, 0.1))'
      }} />
      
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: '17px',
            color: '#333',
            margin: 0,
            lineHeight: '1.7',
            textAlign: 'center',
            fontWeight: '500'
          }}
        >
          {text}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
}

// 버튼 컴포넌트
function GradientButton({ onClick, children, variant = 'primary', disabled = false }: any) {
  const variants = {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    success: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    secondary: 'rgba(255, 255, 255, 0.2)'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{
        background: disabled ? '#ccc' : variants[variant],
        color: 'white',
        border: 'none',
        borderRadius: '15px',
        padding: '18px 45px',
        fontSize: '17px',
        fontWeight: '700',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : '0 10px 35px rgba(102, 126, 234, 0.4)',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      {/* 버튼 광택 효과 */}
      {!disabled && (
        <motion.div
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
            transform: 'skewX(-20deg)'
          }}
        />
      )}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.button>
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
      style={{ textAlign: 'center', zIndex: 1 }}
    >
      <AlbiCharacter emotion="happy" />
      
      <SpeechBubble text={text} />

      {showInput && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: '35px' }}
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="이름을 입력해주세요"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '320px',
              padding: '18px 20px',
              fontSize: '16px',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '15px',
              outline: 'none',
              background: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: '500',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
            }}
          />
          <GradientButton onClick={onNext} disabled={!userName}>
            다음 단계로 →
          </GradientButton>
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
      style={{ textAlign: 'center', zIndex: 1 }}
    >
      <AlbiCharacter emotion="excited" />
      
      <SpeechBubble>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p style={{ fontSize: '20px', fontWeight: '700', color: '#333', marginBottom: '12px' }}>
            {userName}님, 반가워요! 👋
          </p>
          <p style={{ fontSize: '15px', color: '#666', margin: '12px 0', lineHeight: '1.6' }}>
            취업 준비가 막막하시죠?<br />
            제가 단계별로 도와드릴게요!
          </p>
        </motion.div>
      </SpeechBubble>

      <div style={{ marginTop: '35px' }}>
        <GradientButton onClick={onNext}>
          시작하기 ✨
        </GradientButton>
      </div>
    </motion.div>
  );
}

// Step 3: 적성검사 화면
function AptitudeScreen({ onNext }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ textAlign: 'center', width: '100%', maxWidth: '400px', zIndex: 1 }}
    >
      <AlbiCharacter emotion="thinking" />
      
      <SpeechBubble>
        <p style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '12px' }}>
          먼저 적성검사를 해볼까요? 🎯
        </p>
        <p style={{ fontSize: '15px', color: '#666', margin: '12px 0' }}>
          5분이면 끝나요!<br />
          당신의 강점을 찾아드릴게요 ✨
        </p>
      </SpeechBubble>

      <div style={{ marginTop: '35px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
        <GradientButton onClick={() => window.location.href = 'https://albi.kr/job-test'}>
          적성검사 시작하기 📝
        </GradientButton>

        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '12px 25px',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.9)',
            background: 'transparent',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          다음에 할게요
        </motion.button>
      </div>
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
      style={{ textAlign: 'center', zIndex: 1 }}
    >
      <AlbiCharacter emotion="excited" />
      
      <SpeechBubble>
        <p style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '12px' }}>
          {userName}님, 잘하고 계세요! 🎉
        </p>
        <p style={{ fontSize: '15px', color: '#666', margin: '12px 0' }}>
          이제 AI 면접 시뮬레이션으로<br />
          실전 연습을 해볼까요?
        </p>
      </SpeechBubble>

      <div style={{ marginTop: '35px' }}>
        <GradientButton onClick={onNext}>
          면접 연습하기 💼
        </GradientButton>
      </div>
    </motion.div>
  );
}

// Step 5: 면접 화면
function InterviewScreen({ onNext }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ textAlign: 'center', width: '100%', maxWidth: '400px', zIndex: 1 }}
    >
      <AlbiCharacter emotion="thinking" />
      
      <SpeechBubble>
        <p style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '12px' }}>
          실전처럼 연습해봐요! 🎤
        </p>
        <p style={{ fontSize: '15px', color: '#666', margin: '12px 0' }}>
          AI가 실시간으로 피드백을<br />
          제공해드릴게요
        </p>
      </SpeechBubble>

      <div style={{ marginTop: '35px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
        <GradientButton onClick={() => window.location.href = 'https://albi.kr/chat'}>
          면접 시작하기 🚀
        </GradientButton>

        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '12px 25px',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.9)',
            background: 'transparent',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          다음에 할게요
        </motion.button>
      </div>
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
      style={{ textAlign: 'center', zIndex: 1 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 0.6,
        }}
      >
        <AlbiCharacter emotion="excited" />
      </motion.div>
      
      <SpeechBubble>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p style={{ fontSize: '22px', fontWeight: '700', color: '#333', marginBottom: '18px' }}>
            🎉 수고하셨어요, {userName}님!
          </p>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '15px',
            margin: '18px 0',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
          }}>
            <p style={{ fontSize: '14px', margin: '5px 0', opacity: 0.9 }}>종합 평가</p>
            <p style={{ fontSize: '42px', fontWeight: '700', margin: '8px 0', textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}>A+</p>
            <p style={{ fontSize: '15px', margin: '5px 0', opacity: 0.9 }}>상위 15%</p>
          </div>
          <p style={{ fontSize: '15px', color: '#666', margin: '15px 0' }}>
            더 깊이 있는 멘토링을 원하시나요?
          </p>
        </motion.div>
      </SpeechBubble>

      <div style={{ marginTop: '30px' }}>
        <GradientButton onClick={onNext} variant="success">
          프리미엄 보기 ✨
        </GradientButton>
      </div>
    </motion.div>
  );
}

// Step 7: 구독 화면
function SubscribeScreen() {
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
      style={{ textAlign: 'center', width: '100%', maxWidth: '400px', zIndex: 1 }}
    >
      <AlbiCharacter emotion="excited" />
      
      <SpeechBubble>
        <p style={{ fontSize: '20px', fontWeight: '700', color: '#333', marginBottom: '15px' }}>
          AI 멘토와 함께<br />미래를 설계해보세요! ✨
        </p>
      </SpeechBubble>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '25px',
          padding: '30px 25px',
          marginTop: '25px',
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)'
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '18px 15px',
              marginBottom: index < features.length - 1 ? '12px' : 0,
              borderBottom: index < features.length - 1 ? '2px solid #f0f0f0' : 'none',
              borderRadius: '12px',
              transition: 'all 0.3s'
            }}
          >
            <div style={{ fontSize: '40px', marginRight: '18px' }}>
              {feature.icon}
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontSize: '17px', fontWeight: '700', color: '#333', margin: '0 0 4px 0' }}>
                {feature.title}
              </p>
              <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
        <GradientButton onClick={() => window.location.href = 'https://albi.kr'} variant="success">
          14일 무료 체험 시작 🎁
        </GradientButton>

        <motion.button
          onClick={() => window.location.href = 'https://albi.kr'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '12px 25px',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.9)',
            background: 'transparent',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          먼저 둘러볼게요
        </motion.button>
      </div>
    </motion.div>
  );
}

// WebView 화면
function WebViewScreen({ url, title, onBack }: { url: string; title: string; onBack: () => void }) {
  const [loading, setLoading] = useState(true);

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
        background: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000
      }}
    >
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '15px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
      }}>
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 16px',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '15px',
            fontWeight: '600',
            backdropFilter: 'blur(10px)'
          }}
        >
          ← 뒤로
        </motion.button>
        <h2 style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: '700',
          color: 'white',
          flex: 1
        }}>
          {title}
        </h2>
      </div>

      {/* 로딩 인디케이터 */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10
        }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              width: '50px',
              height: '50px',
              border: '4px solid rgba(102, 126, 234, 0.2)',
              borderTop: '4px solid #667eea',
              borderRadius: '50%'
            }}
          />
        </div>
      )}

      {/* iframe */}
      <iframe
        src={url}
        onLoad={() => setLoading(false)}
        style={{
          flex: 1,
          border: 'none',
          width: '100%',
          background: 'white'
        }}
        allow="camera; microphone; geolocation; payment"
      />
    </motion.div>
  );
}

export default App;
