import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LOVE_LETTER = `My love,

Every single day I wake up feeling incredibly lucky that you are in my life. Time passes differently when we're together—hours feel like seconds, yet in those moments, I feel like I've known you for a lifetime.

You have become my favorite place to be. With you, I have found a sense of home that I never knew I was looking for. Your laugh is my favorite sound, and your smile is the brightest part of my day.

Through all the highs and the quiet moments in between, you are my rock, my joy, and my greatest adventure. I promise to keep loving you more with every passing day—to cherish every single moment we have, and to always hold your hand through whatever comes next.

Forever yours, ❤️`;

// Soft pink tones
const C = {
  bg:         "#fff0f5",   // very light blush
  bgMid:      "#fce4ed",   // soft mid-pink
  bgDeep:     "#f9cfe0",   // deeper blush
  text:       "#7a1f40",   // deep rose for readability
  textSoft:   "#b05070",   // muted rose
  primary:    "#e0507a",   // vivid rose pink
  primaryLight:"#f9a8c0",  // light rose
  white:      "#fffafc",
};

const DigitalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const characters = "01❤♡".split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -120);

    const draw = () => {
      // Light pink fade trail
      ctx.fillStyle = "rgba(255, 240, 245, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;

        // Vary opacity per column for depth
        const alpha = 0.3 + ((i * 7) % 5) * 0.1;
        ctx.fillStyle = `rgba(190, 60, 100, ${alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(220, 80, 120, 0.4)";
        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 55);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const FloatingHearts = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 22 }).map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          left: `${(i * 4.7 + Math.sin(i * 1.8) * 12 + 50) % 100}%`,
          bottom: `-60px`,
          animationDuration: `${13 + (i % 7) * 2}s`,
          animationDelay: `${(i % 6) * 1.1}s`,
          fontSize: `${12 + (i % 5) * 9}px`,
          opacity: 0.35 + (i % 4) * 0.12,
        }}
      >
        ❤️
      </div>
    ))}
  </div>
);

const Waveform = () => (
  <div className="flex items-end gap-[3px] h-8">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="w-[3px] rounded-full animate-wave"
        style={{
          animationDelay: `${i * 0.08}s`,
          animationDuration: `${0.8 + (i % 3) * 0.2}s`,
          height: `${8 + (i % 4) * 6}px`,
          backgroundColor: C.primary,
        }}
      />
    ))}
  </div>
);

type Scene = 1 | 2 | 3 | 4 | 5;

export default function Anniversary() {
  const [scene, setScene] = useState<Scene>(1);
  const [showScene1Text, setShowScene1Text] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [typedText, setTypedText] = useState("");
  const [showContinue, setShowContinue] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (scene === 1) {
      const t1 = setTimeout(() => setShowScene1Text(true), 2000);
      const t2 = setTimeout(() => setScene(2), 6500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [scene]);

  useEffect(() => {
    if (scene === 2) {
      if (countdown > 0) {
        const t = setTimeout(() => setCountdown(c => c - 1), 1500);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setScene(3), 1000);
        return () => clearTimeout(t);
      }
    }
  }, [scene, countdown]);

  useEffect(() => {
    if (scene === 3) {
      const t = setTimeout(() => setScene(4), 5000);
      return () => clearTimeout(t);
    }
  }, [scene]);

  useEffect(() => {
    if (scene === 4) {
      let i = 0;
      const t = setInterval(() => {
        i++;
        setTypedText(LOVE_LETTER.slice(0, i));
        if (i >= LOVE_LETTER.length) {
          clearInterval(t);
          setTimeout(() => setShowContinue(true), 1500);
        }
      }, 45);
      return () => clearInterval(t);
    }
  }, [scene]);

  useEffect(() => {
    if (scene === 5 && isPlaying) {
      const t = setTimeout(() => setShowFinal(true), 8000);
      return () => clearTimeout(t);
    }
  }, [scene, isPlaying]);

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden" style={{ background: C.bg, color: C.text }}>

      {/* ── Scene 1: Digital Rain ── */}
      {scene === 1 && (
        <motion.div
          key="scene1"
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: C.bg }}
          variants={fadeIn} initial="initial" animate="animate"
        >
          <DigitalRain />
          <motion.div
            className="relative z-10 text-center px-6 max-w-2xl"
            initial={{ opacity: 0, y: 14 }}
            animate={showScene1Text ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.7rem, 5vw, 3.5rem)",
                color: C.text,
                textShadow: `0 0 24px rgba(224,80,122,0.25)`,
                lineHeight: 1.45,
              }}
            >
              Hey love… I made something for you ❤️
            </h1>
          </motion.div>
        </motion.div>
      )}

      {/* ── Scene 2: Countdown ── */}
      {scene === 2 && (
        <motion.div
          key="scene2"
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: C.bg }}
          variants={fadeIn} initial="initial" animate="animate"
        >
          {countdown > 0 && (
            <motion.div
              key={`count-${countdown}`}
              initial={{ opacity: 0, scale: 0.65, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(8rem, 26vw, 18rem)",
                color: C.primary,
                textShadow: `0 0 30px rgba(224,80,122,0.35), 0 0 70px rgba(224,80,122,0.15)`,
                lineHeight: 1,
              }}
            >
              {countdown}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ── Scene 3: Main Reveal ── */}
      {scene === 3 && (
        <motion.div
          key="scene3"
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(160deg, ${C.bg} 0%, ${C.bgMid} 50%, ${C.bgDeep} 100%)` }}
          variants={fadeIn} initial="initial" animate="animate"
        >
          <FloatingHearts />
          {/* Soft glow orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(224,80,122,0.12) 0%, transparent 70%)", filter: "blur(50px)" }} />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(249,168,192,0.18) 0%, transparent 70%)", filter: "blur(60px)" }} />
          </div>
          <motion.div
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0, y: 26, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 2.2, delay: 0.5, ease: "easeOut" }}
          >
            <h1
              className="leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.4rem, 8vw, 6rem)",
                color: C.text,
                textShadow: `0 2px 16px rgba(224,80,122,0.18)`,
              }}
            >
              Happy Anniversary,
              <br />
              <span style={{ color: C.primary, fontStyle: "italic", textShadow: `0 0 20px rgba(224,80,122,0.3)` }}>
                my love ❤️
              </span>
            </h1>
          </motion.div>
        </motion.div>
      )}

      {/* ── Scene 4: Love Letter ── */}
      {scene === 4 && (
        <motion.div
          key="scene4"
          className="absolute inset-0 overflow-y-auto flex items-start justify-center"
          style={{ background: `linear-gradient(180deg, ${C.bgMid} 0%, ${C.bgDeep} 100%)` }}
          variants={fadeIn} initial="initial" animate="animate"
        >
          {/* Subtle petal blobs */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-40" style={{ background: "radial-gradient(circle, rgba(249,168,192,0.5) 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(224,80,122,0.25) 0%, transparent 70%)", filter: "blur(70px)" }} />
          </div>

          <div className="max-w-2xl w-full mx-auto relative z-10 py-16 px-6 md:px-12">
            <div
              className="leading-loose whitespace-pre-wrap"
              style={{
                fontFamily: "'Crimson Text', Georgia, serif",
                color: C.text,
                fontSize: "clamp(1.05rem, 2.5vw, 1.4rem)",
              }}
            >
              {typedText}
              <span
                className="inline-block w-[2px] ml-[2px]"
                style={{
                  height: "1.1em",
                  backgroundColor: C.primary,
                  animation: "blink 1s step-end infinite",
                  verticalAlign: "middle",
                }}
              />
            </div>

            {showContinue && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="mt-16 flex justify-center"
              >
                <button
                  onClick={() => setScene(5)}
                  className="relative px-8 py-3 transition-colors duration-400"
                  style={{
                    fontFamily: "'Crimson Text', Georgia, serif",
                    color: C.textSoft,
                    letterSpacing: "0.2em",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.primary)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.textSoft)}
                >
                  Continue
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[1px]"
                    style={{ background: `linear-gradient(to right, transparent, ${C.primaryLight}, transparent)` }}
                  />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── Scene 5: Voice Message ── */}
      {scene === 5 && (
        <motion.div
          key="scene5"
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${C.bg} 0%, ${C.bgMid} 60%, ${C.bgDeep} 100%)` }}
          variants={fadeIn} initial="initial" animate="animate"
        >
          {/* Ambient soft orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full" style={{ background: `radial-gradient(circle, rgba(224,80,122,0.1) 0%, transparent 70%)`, filter: "blur(50px)" }} />
            <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full" style={{ background: `radial-gradient(circle, rgba(249,168,192,0.2) 0%, transparent 70%)`, filter: "blur(60px)" }} />
          </div>

          <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center px-6">
            {!showFinal ? (
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3 }}
                className="flex flex-col items-center w-full"
              >
                <p
                  className="mb-12"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.15rem, 4vw, 1.6rem)",
                    color: C.textSoft,
                  }}
                >
                  I also recorded something for you...
                </p>

                <div className="relative flex items-center justify-center">
                  {isPlaying && (
                    <div
                      className="absolute rounded-full animate-pulse-ring"
                      style={{
                        width: "190px",
                        height: "190px",
                        background: `radial-gradient(circle, rgba(224,80,122,0.18) 0%, transparent 70%)`,
                        filter: "blur(10px)",
                      }}
                    />
                  )}
                  <button
                    onClick={() => setIsPlaying(true)}
                    disabled={isPlaying}
                    className="relative flex flex-col items-center justify-center rounded-full transition-all duration-700"
                    style={{
                      width: "128px",
                      height: "128px",
                      border: `2px solid ${isPlaying ? "rgba(224,80,122,0.5)" : "rgba(224,80,122,0.25)"}`,
                      background: isPlaying ? "rgba(224,80,122,0.08)" : "rgba(255,255,255,0.5)",
                      cursor: isPlaying ? "default" : "pointer",
                      transform: isPlaying ? "scale(1.06)" : "scale(1)",
                      boxShadow: isPlaying ? `0 0 30px rgba(224,80,122,0.18)` : "none",
                    }}
                  >
                    {isPlaying ? (
                      <Waveform />
                    ) : (
                      <>
                        <span style={{ fontSize: "2rem" }}>🎧</span>
                        <span
                          style={{
                            fontFamily: "'Crimson Text', Georgia, serif",
                            fontSize: "0.75rem",
                            letterSpacing: "0.15em",
                            color: C.primary,
                            marginTop: "6px",
                          }}
                        >
                          PLAY
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* TODO: Replace with real audio file path */}
                <audio id="love-message" className="hidden" src="" />

                {isPlaying && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mt-8 italic"
                    style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "0.95rem", color: C.textSoft }}
                  >
                    Listening...
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <h2
                  className="leading-snug"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(2.2rem, 8vw, 4.5rem)",
                    color: C.primary,
                    textShadow: `0 0 24px rgba(224,80,122,0.25)`,
                  }}
                >
                  Thank you<br />for being mine. ❤️
                </h2>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
