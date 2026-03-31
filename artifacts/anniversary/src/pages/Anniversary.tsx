import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LOVE_LETTER = `My love,

Every single day I wake up feeling incredibly lucky that you are in my life. Time passes differently when we're together—hours feel like seconds, yet in those moments, I feel like I've known you for a lifetime.

You have become my favorite place to be. With you, I have found a sense of home that I never knew I was looking for. Your laugh is my favorite sound, and your smile is the brightest part of my day.

Through all the highs and the quiet moments in between, you are my rock, my joy, and my greatest adventure. I promise to keep loving you more with every passing day—to cherish every single moment we have, and to always hold your hand through whatever comes next.

Forever yours, ❤️`;

const C = {
  bg:           "#fff0f5",
  bgMid:        "#fce4ed",
  bgDeep:       "#f9cfe0",
  bgLetter:     "#fdf5f8",
  text:         "#7a1f40",
  textSoft:     "#b05070",
  primary:      "#e0507a",
  primaryLight: "#f9a8c0",
};

/* ─── Digital Rain ─── */
const DigitalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars   = "01❤♡".split("");
    const fontSize = 16;
    let columns    = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array.from({ length: columns }, () => Math.random() * -120);

    const draw = () => {
      const cols = Math.floor(canvas.width / fontSize);
      if (cols !== columns) {
        columns = cols;
        drops   = Array.from({ length: columns }, () => Math.random() * -120);
      }

      ctx.fillStyle = "rgba(255, 240, 245, 0.16)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font      = `${fontSize}px monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const ch    = chars[Math.floor(Math.random() * chars.length)];
        const x     = i * fontSize + fontSize / 2;
        const y     = drops[i] * fontSize;
        const alpha = 0.28 + ((i * 7) % 5) * 0.1;

        ctx.fillStyle   = `rgba(190, 60, 100, ${alpha})`;
        ctx.shadowBlur  = 7;
        ctx.shadowColor = "rgba(220, 80, 120, 0.45)";
        ctx.fillText(ch, x, y);
        ctx.shadowBlur  = 0;

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const id = setInterval(draw, 55);
    return () => { clearInterval(id); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

/* ─── Glowing particles + hearts for scene 3 ─── */
const GlowParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 28 }).map((_, i) => (
      <div key={i} className="absolute rounded-full animate-float" style={{
        left:   `${(i * 3.6 + Math.sin(i * 1.8) * 18 + 50) % 100}%`,
        bottom: "-18px",
        width:  `${4 + (i % 5) * 3}px`,
        height: `${4 + (i % 5) * 3}px`,
        background: i % 3 === 0
          ? `rgba(224,80,122,${0.28 + (i % 4) * 0.1})`
          : `rgba(249,168,192,${0.22 + (i % 3) * 0.1})`,
        boxShadow: `0 0 ${6 + (i % 4) * 4}px rgba(224,80,122,0.38)`,
        animationDuration: `${11 + (i % 8) * 2}s`,
        animationDelay:    `${(i % 6) * 1.0}s`,
      }} />
    ))}
    {Array.from({ length: 14 }).map((_, i) => (
      <div key={`h${i}`} className="absolute animate-float" style={{
        left:   `${(i * 7.4 + 8) % 96}%`,
        bottom: "-28px",
        fontSize: `${12 + (i % 4) * 7}px`,
        opacity: 0.32 + (i % 4) * 0.1,
        animationDuration: `${14 + (i % 6) * 2}s`,
        animationDelay:    `${(i % 5) * 1.4 + 0.5}s`,
      }}>❤️</div>
    ))}
  </div>
);

/* ─── Floating hearts for the ending ─── */
const FloatingHeartsEnding = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 28 }).map((_, i) => (
      <div key={i} className="absolute animate-float" style={{
        left:   `${(i * 3.7 + Math.sin(i * 1.9) * 10 + 50) % 100}%`,
        bottom: "-50px",
        fontSize: `${10 + (i % 6) * 8}px`,
        opacity: 0.28 + (i % 5) * 0.1,
        animationDuration: `${12 + (i % 7) * 2}s`,
        animationDelay:    `${(i % 6) * 0.8}s`,
      }}>❤️</div>
    ))}
  </div>
);

/* ─── Audio waveform bars ─── */
const Waveform = () => (
  <div className="flex items-end gap-[3px] h-8">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="w-[3px] rounded-full animate-wave" style={{
        animationDelay:    `${i * 0.08}s`,
        animationDuration: `${0.8 + (i % 3) * 0.2}s`,
        height:            `${8 + (i % 4) * 6}px`,
        backgroundColor:   C.primary,
      }} />
    ))}
  </div>
);

type Scene = 1 | 2 | 3 | 4 | 5;

export default function Anniversary() {
  const [scene,          setScene]          = useState<Scene>(1);
  const [showScene1Text, setShowScene1Text] = useState(false);
  const [countdown,      setCountdown]      = useState(3);
  const [showSubtitle,   setShowSubtitle]   = useState(false);
  const [typedText,      setTypedText]      = useState("");
  const [showContinue,   setShowContinue]   = useState(false);
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [showFinal,      setShowFinal]      = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  /* Scene 1 — opening message */
  useEffect(() => {
    if (scene !== 1) return;
    const t1 = setTimeout(() => setShowScene1Text(true), 2000);
    const t2 = setTimeout(() => setScene(2), 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [scene]);

  /* Scene 2 — countdown */
  useEffect(() => {
    if (scene !== 2) return;
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setScene(3), 900);
    return () => clearTimeout(t);
  }, [scene, countdown]);

  /* Scene 3 — reveal, subtitle then letter */
  useEffect(() => {
    if (scene !== 3) return;
    const t1 = setTimeout(() => setShowSubtitle(true), 2400);
    const t2 = setTimeout(() => setScene(4), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [scene]);

  /* Scene 4 — typewriter */
  useEffect(() => {
    if (scene !== 4) return;
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
  }, [scene]);

  /* Scene 5 — wire audio ended → showFinal */
  useEffect(() => {
    if (scene !== 5 || !isPlaying) return;
    const audio = audioRef.current;
    if (audio && audio.src && audio.src !== window.location.href) {
      const onEnd = () => setShowFinal(true);
      audio.addEventListener("ended", onEnd);
      return () => audio.removeEventListener("ended", onEnd);
    }
    // No real file yet — simulate 8 s
    const t = setTimeout(() => setShowFinal(true), 8000);
    return () => clearTimeout(t);
  }, [scene, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    const audio = audioRef.current;
    if (audio && audio.src && audio.src !== window.location.href) {
      audio.play().catch(() => {});
    }
  };

  const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 1.5 } } };

  /* ─────────────────────────── render ─────────────────────────── */
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden" style={{ background: C.bg }}>

      {/* ════ PERSISTENT RAIN — visible through scenes 1, 2, 3 ════ */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ opacity: scene <= 3 ? 1 : 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <DigitalRain />
      </motion.div>

      {/* ════ Scene 1 — opening ════ */}
      {scene === 1 && (
        <motion.div
          key="s1"
          className="absolute inset-0 flex items-center justify-center z-10"
          variants={fadeIn} initial="initial" animate="animate"
        >
          <motion.div
            className="text-center px-6 max-w-2xl"
            initial={{ opacity: 0, y: 14 }}
            animate={showScene1Text ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize:   "clamp(1.7rem, 5vw, 3.5rem)",
              color:       C.text,
              textShadow: `0 0 24px rgba(224,80,122,0.25)`,
              lineHeight:  1.45,
            }}>
              Hey love… I made something for you ❤️
            </h1>
          </motion.div>
        </motion.div>
      )}

      {/* ════ Scene 2 — countdown ════ */}
      {scene === 2 && (
        <motion.div
          key="s2"
          className="absolute inset-0 flex items-center justify-center z-10"
          variants={fadeIn} initial="initial" animate="animate"
        >
          {countdown > 0 && (
            <motion.div
              key={`c${countdown}`}
              initial={{ opacity: 0, scale: 0.6, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize:   "clamp(8rem, 26vw, 18rem)",
                color:       C.primary,
                textShadow: `0 0 30px rgba(224,80,122,0.4), 0 0 70px rgba(224,80,122,0.18)`,
                lineHeight:  1,
              }}
            >
              {countdown}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ════ Scene 3 — reveal ════ */}
      {scene === 3 && (
        <motion.div
          key="s3"
          className="absolute inset-0 flex items-center justify-center overflow-hidden z-10"
          style={{ background: `linear-gradient(160deg, ${C.bg}cc 0%, ${C.bgMid}cc 55%, ${C.bgDeep}cc 100%)` }}
          variants={fadeIn} initial="initial" animate="animate"
        >
          <GlowParticles />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(224,80,122,0.14) 0%, transparent 70%)", filter: "blur(55px)" }} />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(249,168,192,0.22) 0%, transparent 70%)", filter: "blur(65px)" }} />
          </div>

          <motion.div
            className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 2.2, delay: 0.5, ease: "easeOut" }}
          >
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.2rem, 7.5vw, 5.5rem)", color: C.text, textShadow: `0 2px 16px rgba(224,80,122,0.22)`, lineHeight: 1.2 }}>
              Happy Anniversary,{" "}
              <span style={{ color: C.primary, fontStyle: "italic", textShadow: `0 0 20px rgba(224,80,122,0.38)` }}>
                my Honey ❤️
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 1.7, ease: "easeOut" }}
              style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "clamp(1.1rem, 3vw, 1.65rem)", color: C.textSoft, maxWidth: "560px", lineHeight: 1.75, fontStyle: "italic" }}
            >
              Out of everything in my life… you'll always be the love of my life and it will always be you ;{">>"}.
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {/* ════ Scene 4 — love letter (rain fades out, rich background) ════ */}
      {scene === 4 && (
        <motion.div
          key="s4"
          className="absolute inset-0 overflow-y-auto flex items-start justify-center z-10"
          style={{ background: `linear-gradient(155deg, #fff5f8 0%, #fde8f1 35%, #fbd0e4 70%, #f9c4dc 100%)` }}
          variants={fadeIn} initial="initial" animate="animate"
        >
          {/* Decorative bokeh / petal blobs */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Large orbs */}
            <div className="absolute -top-24 -right-16 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(249,168,192,0.55) 0%, transparent 65%)", filter: "blur(60px)" }} />
            <div className="absolute -bottom-24 -left-16 w-[420px] h-[420px] rounded-full" style={{ background: "radial-gradient(circle, rgba(224,80,122,0.22) 0%, transparent 65%)", filter: "blur(70px)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(253,224,236,0.6) 0%, transparent 70%)", filter: "blur(40px)" }} />
            {/* Small sparkle dots */}
            {[
              { t: "8%",  l: "12%", s: 10 }, { t: "22%", l: "88%", s: 8  },
              { t: "55%", l: "5%",  s: 7  }, { t: "70%", l: "80%", s: 9  },
              { t: "90%", l: "40%", s: 6  }, { t: "35%", l: "95%", s: 11 },
            ].map((d, i) => (
              <div key={i} className="absolute rounded-full" style={{
                top: d.t, left: d.l, width: d.s, height: d.s,
                background: "rgba(224,80,122,0.35)",
                boxShadow: `0 0 ${d.s * 2}px rgba(224,80,122,0.5)`,
                animation: `blink ${2 + i * 0.4}s ease-in-out infinite`,
              }} />
            ))}
          </div>

          {/* Paper card effect */}
          <div className="max-w-2xl w-full mx-auto relative z-10 py-16 px-6 md:px-14">
            <div
              className="rounded-3xl px-8 py-10 md:px-14 md:py-12"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 60px rgba(224,80,122,0.12), 0 2px 12px rgba(224,80,122,0.08)",
                border: "1px solid rgba(249,168,192,0.35)",
              }}
            >
              <div
                className="leading-loose whitespace-pre-wrap"
                style={{ fontFamily: "'Crimson Text', Georgia, serif", color: C.text, fontSize: "clamp(1.05rem, 2.5vw, 1.4rem)" }}
              >
                {typedText}
                <span
                  className="inline-block w-[2px] ml-[2px]"
                  style={{ height: "1.1em", backgroundColor: C.primary, animation: "blink 1s step-end infinite", verticalAlign: "middle" }}
                />
              </div>
            </div>

            {showContinue && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="mt-14 flex justify-center"
              >
                <button
                  onClick={() => setScene(5)}
                  className="relative px-8 py-3"
                  style={{ fontFamily: "'Crimson Text', Georgia, serif", color: C.textSoft, letterSpacing: "0.2em", fontSize: "0.85rem", textTransform: "uppercase", background: "transparent", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.primary)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.textSoft)}
                >
                  Continue
                  <span className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${C.primaryLight}, transparent)` }} />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ════ Scene 5 — voice message + ending (crossfade, no jump) ════ */}
      {scene === 5 && (
        <motion.div
          key="s5"
          className="absolute inset-0 z-10"
          style={{ background: `linear-gradient(135deg, ${C.bg} 0%, ${C.bgMid} 60%, ${C.bgDeep} 100%)` }}
          variants={fadeIn} initial="initial" animate="animate"
        >
          {/* Ambient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full" style={{ background: `radial-gradient(circle, rgba(224,80,122,0.1) 0%, transparent 70%)`, filter: "blur(50px)" }} />
            <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full" style={{ background: `radial-gradient(circle, rgba(249,168,192,0.2) 0%, transparent 70%)`, filter: "blur(60px)" }} />
          </div>

          {/* Dim overlay when playing */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-[1200ms]"
            style={{ background: "rgba(249,168,192,0.2)", opacity: isPlaying && !showFinal ? 1 : 0 }}
          />

          {/* ── Audio player — fades out when showFinal ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            animate={{ opacity: showFinal ? 0 : 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ pointerEvents: showFinal ? "none" : "auto" }}
          >
            <div className="flex flex-col items-center text-center w-full max-w-md">
              <p className="mb-12" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.15rem, 4vw, 1.6rem)", color: C.textSoft }}>
                I also recorded something for you...
              </p>

              <div className="relative flex items-center justify-center">
                {isPlaying && (
                  <>
                    <div className="absolute rounded-full animate-pulse-ring" style={{ width: "200px", height: "200px", background: `radial-gradient(circle, rgba(224,80,122,0.2) 0%, transparent 70%)`, filter: "blur(10px)" }} />
                    <div className="absolute rounded-full" style={{ width: "162px", height: "162px", border: `1px solid rgba(224,80,122,0.22)`, animation: "pulse-ring 2.2s ease-in-out infinite 0.6s" }} />
                  </>
                )}
                <button
                  onClick={handlePlay}
                  disabled={isPlaying}
                  className="relative flex flex-col items-center justify-center rounded-full transition-all duration-700"
                  style={{
                    width: "128px", height: "128px",
                    border:    `2px solid ${isPlaying ? "rgba(224,80,122,0.5)" : "rgba(224,80,122,0.25)"}`,
                    background: isPlaying ? "rgba(224,80,122,0.1)" : "rgba(255,255,255,0.6)",
                    cursor:     isPlaying ? "default" : "pointer",
                    transform:  isPlaying ? "scale(1.06)" : "scale(1)",
                    boxShadow:  isPlaying ? `0 0 36px rgba(224,80,122,0.28)` : "none",
                  }}
                >
                  {isPlaying
                    ? <Waveform />
                    : <>
                        <span style={{ fontSize: "2rem" }}>🎧</span>
                        <span style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "0.75rem", letterSpacing: "0.15em", color: C.primary, marginTop: "6px" }}>PLAY</span>
                      </>
                  }
                </button>
              </div>

              {/* TODO: place your recording in the public folder, e.g. /message.mp3, then set src="/message.mp3" */}
              <audio ref={audioRef} className="hidden" />

              {isPlaying && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
                  className="mt-8 italic"
                  style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "0.95rem", color: C.textSoft }}
                >
                  Listening...
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* ── Final ending — fades IN when showFinal (no jump, smooth crossfade) ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            animate={{ opacity: showFinal ? 1 : 0 }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: showFinal ? 0.6 : 0 }}
            style={{ pointerEvents: showFinal ? "auto" : "none" }}
          >
            <FloatingHeartsEnding />
            <div className="relative z-10 text-center max-w-lg">
              <motion.h2
                initial={{ y: 20 }}
                animate={showFinal ? { y: 0 } : { y: 20 }}
                transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }}
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 7.5vw, 4.2rem)", color: C.primary, textShadow: `0 0 28px rgba(224,80,122,0.3)`, lineHeight: 1.4 }}
              >
                I'd choose you.
                <br />
                <span style={{ fontSize: "0.72em", color: C.textSoft, fontStyle: "italic" }}>
                  Over and over again.
                </span>
                <br />
                <span style={{ fontSize: "0.78em", color: C.text }}>
                  In every lifetime, my honey!
                </span>
              </motion.h2>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
