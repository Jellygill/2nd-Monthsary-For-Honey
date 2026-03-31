import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LOVE_LETTER = `My love,

Every single day I wake up feeling incredibly lucky that you are in my life. Time passes differently when we're together—hours feel like seconds, yet in those moments, I feel like I've known you for a lifetime.

You have become my favorite place to be. With you, I have found a sense of home that I never knew I was looking for. Your laugh is my favorite sound, and your smile is the brightest part of my day.

Through all the highs and the quiet moments in between, you are my rock, my joy, and my greatest adventure. I promise to keep loving you more with every passing day—to cherish every single moment we have, and to always hold your hand through whatever comes next.

Forever yours, ❤️`;

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

    const characters = "01❤".split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 10, 20, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255, 160, 190, 0.65)";
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;

        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255, 160, 190, 0.9)";
        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />;
};

const FloatingHearts = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          left: `${(i * 5.2 + Math.sin(i * 2.3) * 15 + 50) % 100}%`,
          bottom: `-60px`,
          animationDuration: `${12 + (i % 7) * 2}s`,
          animationDelay: `${(i % 5) * 1.2}s`,
          fontSize: `${14 + (i % 5) * 8}px`,
          opacity: 0.4 + (i % 4) * 0.1,
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
        className="w-[3px] bg-primary rounded-full animate-wave"
        style={{
          animationDelay: `${i * 0.08}s`,
          animationDuration: `${0.8 + (i % 3) * 0.2}s`,
          height: `${8 + (i % 4) * 6}px`,
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

  const sceneVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } },
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050a14] text-[#ffe8f0]">

      {/* Scene 1: Digital Rain */}
      {scene === 1 && (
        <motion.div
          key="scene1"
          className="absolute inset-0 flex items-center justify-center"
          variants={sceneVariants}
          initial="initial"
          animate="animate"
        >
          <DigitalRain />
          <motion.div
            className="relative z-10 text-center px-6"
            initial={{ opacity: 0, y: 12 }}
            animate={showScene1Text ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <h1
              className="text-3xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#ffe0ec",
                textShadow: "0 0 30px rgba(255,160,190,0.6), 0 0 60px rgba(255,100,150,0.3)",
                lineHeight: 1.4,
              }}
            >
              Hey love… I made something for you ❤️
            </h1>
          </motion.div>
        </motion.div>
      )}

      {/* Scene 2: Countdown */}
      {scene === 2 && (
        <motion.div
          key="scene2"
          className="absolute inset-0 flex items-center justify-center bg-[#050a14]"
          variants={sceneVariants}
          initial="initial"
          animate="animate"
        >
          {countdown > 0 && (
            <motion.div
              key={`count-${countdown}`}
              initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(8rem, 25vw, 18rem)",
                color: "#ff8ab0",
                textShadow: "0 0 40px rgba(255,138,176,0.9), 0 0 80px rgba(255,100,150,0.5)",
                lineHeight: 1,
              }}
            >
              {countdown}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Scene 3: Main Reveal */}
      {scene === 3 && (
        <motion.div
          key="scene3"
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #050a14 0%, #1a0a12 50%, #0d0510 100%)" }}
          variants={sceneVariants}
          initial="initial"
          animate="animate"
        >
          <FloatingHearts />
          <motion.div
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 2.2, delay: 0.6, ease: "easeOut" }}
          >
            <h1
              className="leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                color: "#ffe8f0",
                textShadow: "0 0 40px rgba(255,160,190,0.4)",
              }}
            >
              Happy Anniversary,
              <br />
              <span style={{ color: "#ff8ab0", fontStyle: "italic", textShadow: "0 0 30px rgba(255,138,176,0.7)" }}>
                my love ❤️
              </span>
            </h1>
          </motion.div>
        </motion.div>
      )}

      {/* Scene 4: Love Letter */}
      {scene === 4 && (
        <motion.div
          key="scene4"
          className="absolute inset-0 overflow-y-auto flex items-start justify-center"
          style={{ background: "linear-gradient(180deg, #0f0810 0%, #180c14 100%)" }}
          variants={sceneVariants}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-2xl w-full mx-auto relative z-10 py-16 px-6 md:px-10">
            <div
              className="text-lg md:text-xl leading-loose whitespace-pre-wrap"
              style={{
                fontFamily: "'Crimson Text', Georgia, serif",
                color: "#f0d0dc",
                fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
              }}
            >
              {typedText}
              <span
                className="inline-block w-[2px] h-[1.1em] ml-[2px] translate-y-[2px]"
                style={{
                  backgroundColor: "#ff8ab0",
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
                  className="group relative px-8 py-3 transition-all duration-500"
                  style={{
                    fontFamily: "'Crimson Text', Georgia, serif",
                    color: "rgba(255,138,176,0.7)",
                    letterSpacing: "0.2em",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,138,176,1)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,138,176,0.7)")}
                >
                  Continue
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[1px]"
                    style={{ background: "linear-gradient(to right, transparent, rgba(255,138,176,0.5), transparent)" }}
                  />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Scene 5: Voice Message */}
      {scene === 5 && (
        <motion.div
          key="scene5"
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "#050a14" }}
          variants={sceneVariants}
          initial="initial"
          animate="animate"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,100,150,0.08) 0%, transparent 70%)", filter: "blur(40px)" }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(180,80,200,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
            />
          </div>

          <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center px-6">
            {!showFinal ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="flex flex-col items-center w-full"
              >
                <p
                  className="mb-12"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                    color: "rgba(240,208,220,0.85)",
                  }}
                >
                  I also recorded something for you...
                </p>

                <div className="relative flex items-center justify-center">
                  {isPlaying && (
                    <div
                      className="absolute rounded-full animate-pulse-ring"
                      style={{
                        width: "180px",
                        height: "180px",
                        background: "radial-gradient(circle, rgba(255,138,176,0.2) 0%, transparent 70%)",
                        filter: "blur(8px)",
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
                      border: `2px solid ${isPlaying ? "rgba(255,138,176,0.5)" : "rgba(255,138,176,0.25)"}`,
                      background: isPlaying ? "rgba(255,138,176,0.08)" : "transparent",
                      cursor: isPlaying ? "default" : "pointer",
                      transform: isPlaying ? "scale(1.05)" : "scale(1)",
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
                            color: "rgba(255,138,176,0.8)",
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
                    style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "0.95rem", color: "rgba(255,138,176,0.55)" }}
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
                    color: "#ff8ab0",
                    textShadow: "0 0 30px rgba(255,138,176,0.5), 0 0 80px rgba(255,100,150,0.2)",
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
