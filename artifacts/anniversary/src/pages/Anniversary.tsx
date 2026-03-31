import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─── The letter — rewritten to be deeply personal & emotional ─── */
const LOVE_LETTER = `To my Honey,

Happy 2nd Monthsary Hon!!! Ang bilis ng panahon noh hehe ;>

First of all hon, before I get too emotional right now, I just want to say thank you and thank you so much for accepting me as your boyfriend! You made me so happy for all our shared moments, you made me emotional for everything that we both did together, you made my heart warm despite experiencing quarrels and for all the emotions I've felt whenever I'm with you, I thank you, my honey!

I hope and I truly hope, that for all my shortcomings, my flaws, and the times I've disappointed you, I hope it will all be embraced by my warmth love that I give you every single day.

Always remember hon that I didn't chose you for a season, but I chose you with a future in mind. I'm always here to build, to fight through the difficult parts, and always stay by your side whenever you need me.

I love you my constant, my cutiepie, my ka-duo sa ML, my sometimes masungit na girlfriend, my wifey, my prettiest, hottest, most beautiful Honey… my Mary Iris ❤️

I'm so glad you're mine.
I'm so glad I get to be yours.

With everything I am, always.`;

const C = {
  bg:           "#fff0f5",
  bgMid:        "#fce4ed",
  bgDeep:       "#f9cfe0",
  text:         "#7a1f40",
  textSoft:     "#b05070",
  primary:      "#e0507a",
  primaryLight: "#f9a8c0",
};

/* ─── Stars scattered in scene 1 ─── */
const STARS = Array.from({ length: 22 }, (_, i) => ({
  x:    `${(i * 4.7 + Math.sin(i * 2.3) * 12 + 50) % 100}%`,
  y:    `${(i * 4.1 + Math.cos(i * 1.9) * 10 + 50) % 100}%`,
  size: 3 + (i % 4),
  dur:  `${2 + (i % 5) * 0.6}s`,
  del:  `${(i % 7) * 0.4}s`,
}));

/* ─── Digital Rain ─── */
const DigitalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01❤♡".split("");
    const fs = 16;
    let cols  = Math.floor(canvas.width / fs);
    let drops: number[] = Array.from({ length: cols }, () => Math.random() * -120);

    const draw = () => {
      const nc = Math.floor(canvas.width / fs);
      if (nc !== cols) { cols = nc; drops = Array.from({ length: cols }, () => Math.random() * -120); }

      ctx.fillStyle = "rgba(255,240,245,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fs}px monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x  = i * fs + fs / 2;
        const y  = drops[i] * fs;
        const a  = 0.25 + ((i * 7) % 6) * 0.09;
        ctx.fillStyle   = `rgba(190,60,100,${a})`;
        ctx.shadowBlur  = 7;
        ctx.shadowColor = "rgba(220,80,120,0.5)";
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

/* ─── Glowing particles + hearts (scene 3) ─── */
const GlowParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 32 }).map((_, i) => (
      <div key={i} className="absolute rounded-full animate-float" style={{
        left:   `${(i * 3.3 + Math.sin(i * 1.7) * 16 + 50) % 100}%`,
        bottom: "-18px",
        width:  `${4 + (i % 5) * 3}px`,
        height: `${4 + (i % 5) * 3}px`,
        background: i % 3 === 0
          ? `rgba(224,80,122,${0.3 + (i % 4) * 0.1})`
          : `rgba(249,168,192,${0.22 + (i % 3) * 0.12})`,
        boxShadow: `0 0 ${7 + (i % 4) * 5}px rgba(224,80,122,0.4)`,
        animationDuration: `${12 + (i % 8) * 1.8}s`,
        animationDelay:    `${(i % 7) * 0.9}s`,
      }} />
    ))}
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={`h${i}`} className="absolute animate-float" style={{
        left:   `${(i * 6.4 + 8) % 95}%`,
        bottom: "-28px",
        fontSize: `${10 + (i % 4) * 7}px`,
        opacity: 0.3 + (i % 4) * 0.12,
        animationDuration: `${15 + (i % 6) * 1.8}s`,
        animationDelay:    `${(i % 5) * 1.5 + 0.5}s`,
      }}>❤️</div>
    ))}
  </div>
);

/* ─── Floating hearts (ending) ─── */
const FloatingHeartsEnding = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 32 }).map((_, i) => (
      <div key={i} className="absolute animate-float" style={{
        left:   `${(i * 3.5 + Math.sin(i * 2.1) * 10 + 50) % 100}%`,
        bottom: "-50px",
        fontSize: `${10 + (i % 6) * 8}px`,
        opacity: 0.25 + (i % 5) * 0.12,
        animationDuration: `${13 + (i % 7) * 1.8}s`,
        animationDelay:    `${(i % 7) * 0.7}s`,
      }}>❤️</div>
    ))}
  </div>
);

/* ─── Drifting bokeh orb ─── */
const Orb = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute rounded-full animate-drift pointer-events-none" style={style} />
);

/* ─── Waveform bars ─── */
const Waveform = () => (
  <div className="flex items-end gap-[3px] h-9">
    {Array.from({ length: 14 }).map((_, i) => (
      <div key={i} className="w-[3px] rounded-full animate-wave" style={{
        animationDelay:    `${i * 0.07}s`,
        animationDuration: `${0.75 + (i % 4) * 0.18}s`,
        height: `${6 + (i % 5) * 6}px`,
        background: `linear-gradient(to top, rgba(224,80,122,0.9), rgba(249,168,192,0.6))`,
      }} />
    ))}
  </div>
);

type Scene = 1 | 2 | 3 | 4 | 5;

export default function Anniversary() {
  const [scene,         setScene]         = useState<Scene>(1);
  const [showMainText,  setShowMainText]  = useState(false);
  const [showSub1,      setShowSub1]      = useState(false);
  const [countdown,     setCountdown]     = useState(3);
  const [showSubtitle,  setShowSubtitle]  = useState(false);
  const [typedText,     setTypedText]     = useState("");
  const [showContinue,  setShowContinue]  = useState(false);
  const [isPlaying,     setIsPlaying]     = useState(false);
  const [showFinal,     setShowFinal]     = useState(false);

  const audioRef   = useRef<HTMLAudioElement>(null);
  const bgMusicRef = useRef<HTMLAudioElement>(null);

  /* ─── Background music: start on first scene ─── */
  useEffect(() => {
    const bg = bgMusicRef.current;
    if (!bg) return;
    bg.volume = 0.6;
    bg.loop   = true;
    // Attempt autoplay; browsers may block until user interaction
    bg.play().catch(() => {
      // If autoplay blocked, play on first click/touch
      const tryPlay = () => { bg.play().catch(() => {}); document.removeEventListener("click", tryPlay); document.removeEventListener("touchstart", tryPlay); };
      document.addEventListener("click",      tryPlay, { once: true });
      document.addEventListener("touchstart", tryPlay, { once: true });
    });
  }, []);

  /* ─── Helper: smoothly adjust bgMusic volume ─── */
  const fadeBgMusic = (targetVol: number, durationMs: number) => {
    const bg = bgMusicRef.current;
    if (!bg) return;
    const steps     = 30;
    const interval  = durationMs / steps;
    const startVol  = bg.volume;
    const delta     = (targetVol - startVol) / steps;
    let   step      = 0;
    const id = setInterval(() => {
      step++;
      bg.volume = Math.min(1, Math.max(0, startVol + delta * step));
      if (step >= steps) clearInterval(id);
    }, interval);
  };

  /* Scene 1 */
  useEffect(() => {
    if (scene !== 1) return;
    const t1 = setTimeout(() => setShowMainText(true), 1600);
    const t2 = setTimeout(() => setShowSub1(true), 3200);
    const t3 = setTimeout(() => setScene(2), 7200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
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

  /* Scene 3 — reveal */
  useEffect(() => {
    if (scene !== 3) return;
    const t1 = setTimeout(() => setShowSubtitle(true), 2400);
    const t2 = setTimeout(() => setScene(4), 7500);
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
        setTimeout(() => setShowContinue(true), 1800);
      }
    }, 42);
    return () => clearInterval(t);
  }, [scene]);

  /* Scene 5 — audio ended */
  useEffect(() => {
    if (scene !== 5 || !isPlaying) return;
    const audio = audioRef.current;
    if (audio && audio.src && audio.src !== window.location.href) {
      const onEnd = () => {
        // Fade bg music back in after voice message ends
        fadeBgMusic(0.6, 3000);
        setShowFinal(true);
      };
      audio.addEventListener("ended", onEnd);
      return () => audio.removeEventListener("ended", onEnd);
    }
    const t = setTimeout(() => {
      fadeBgMusic(0.6, 3000);
      setShowFinal(true);
    }, 9000);
    return () => clearTimeout(t);
  }, [scene, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    // Fade bg music down to a soft level so voice message is clear
    fadeBgMusic(0.18, 2000);
    const audio = audioRef.current;
    if (audio && audio.src && audio.src !== window.location.href) {
      audio.play().catch(() => {});
    }
  };

  const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 1.6 } } };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden" style={{ background: C.bg }}>

      {/* ══ Persistent rain — visible through scenes 1-3 ══ */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ opacity: scene <= 3 ? 1 : 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <DigitalRain />
      </motion.div>

      {/* ════════════════════════════════════════════
          SCENE 1 — Opening
      ════════════════════════════════════════════ */}
      {scene === 1 && (
        <motion.div key="s1" className="absolute inset-0 flex items-center justify-center z-10"
          variants={fadeIn} initial="initial" animate="animate"
        >
          {/* Twinkle stars */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {STARS.map((s, i) => (
              <div key={i} className="absolute rounded-full animate-twinkle" style={{
                left: s.x, top: s.y, width: s.size, height: s.size,
                background: "rgba(224,80,122,0.55)",
                boxShadow: `0 0 ${s.size * 3}px rgba(224,80,122,0.5)`,
                animationDuration: s.dur, animationDelay: s.del,
              }} />
            ))}
          </div>

          <div className="relative z-10 text-center px-6 max-w-2xl flex flex-col items-center gap-5">
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={showMainText
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 18, filter: "blur(8px)" }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize:   "clamp(1.8rem, 5.5vw, 3.8rem)",
                color:       C.text,
                lineHeight:  1.4,
                textShadow: `0 0 28px rgba(224,80,122,0.2)`,
              }}
            >
              Hey Honey…{" "}
              <span className="animate-heartbeat inline-block">❤️</span>
              <br />
              <span style={{ fontStyle: "italic", color: C.textSoft, fontSize: "0.88em" }}>
                I made something just for you.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={showSub1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 1.6 }}
              style={{
                fontFamily: "'Crimson Text', Georgia, serif",
                fontSize:   "clamp(0.95rem, 2.5vw, 1.25rem)",
                color:       C.textSoft,
                letterSpacing: "0.08em",
                fontStyle:   "italic",
              }}
            >
              get comfortable, this is all for you ✨
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* ════════════════════════════════════════════
          SCENE 2 — Countdown
      ════════════════════════════════════════════ */}
      {scene === 2 && (
        <motion.div key="s2" className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4"
          variants={fadeIn} initial="initial" animate="animate"
        >
          {countdown > 0 && (
            <motion.div
              key={`c${countdown}`}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.3, filter: "blur(12px)" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize:   "clamp(9rem, 28vw, 19rem)",
                color:       C.primary,
                textShadow: `0 0 30px rgba(224,80,122,0.45), 0 0 80px rgba(224,80,122,0.2)`,
                lineHeight:  1,
              }}>
                {countdown}
              </span>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                style={{
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize:   "clamp(0.9rem, 2.5vw, 1.2rem)",
                  color:       C.textSoft,
                  letterSpacing: "0.2em",
                  fontStyle:   "italic",
                  marginTop:   "-8px",
                }}
              >
                {countdown === 3 ? "something beautiful is coming…"
                  : countdown === 2 ? "just for you, Honey…"
                  : "here we go ❤️"}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ════════════════════════════════════════════
          SCENE 3 — The Reveal
      ════════════════════════════════════════════ */}
      {scene === 3 && (
        <motion.div key="s3"
          className="absolute inset-0 flex items-center justify-center overflow-hidden z-10"
          style={{ background: `linear-gradient(155deg, ${C.bg}dd 0%, ${C.bgMid}dd 50%, ${C.bgDeep}dd 100%)` }}
          variants={fadeIn} initial="initial" animate="animate"
        >
          <GlowParticles />

          {/* Drifting orbs */}
          <Orb style={{ top: "10%",  left: "8%",  width: 340, height: 340, background: "radial-gradient(circle, rgba(224,80,122,0.13) 0%, transparent 70%)", filter: "blur(55px)", animationDuration: "22s" }} />
          <Orb style={{ bottom: "8%", right: "6%", width: 280, height: 280, background: "radial-gradient(circle, rgba(249,168,192,0.22) 0%, transparent 70%)", filter: "blur(60px)", animationDuration: "26s", animationDelay: "4s" }} />
          <Orb style={{ top: "45%", left: "40%", width: 420, height: 220, background: "radial-gradient(ellipse, rgba(253,220,235,0.35) 0%, transparent 70%)", filter: "blur(45px)", animationDuration: "19s", animationDelay: "2s" }} />

          <motion.div
            className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center gap-7"
            initial={{ opacity: 0, y: 32, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 2.4, delay: 0.4, ease: "easeOut" }}
          >
            <h1
              className="animate-glow leading-snug"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize:   "clamp(2.3rem, 8vw, 5.8rem)",
                color:       C.text,
                lineHeight:  1.18,
              }}
            >
              Happy 2nd Monthsary,{" "}
              <span style={{ color: C.primary, fontStyle: "italic" }}>
                Honey ❤️
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 1.9, ease: "easeOut" }}
              style={{
                fontFamily: "'Crimson Text', Georgia, serif",
                fontSize:   "clamp(1.1rem, 3.2vw, 1.75rem)",
                color:       C.textSoft,
                maxWidth:   "560px",
                lineHeight:  1.8,
                fontStyle:  "italic",
              }}
            >
              Out of everything in my life… you'll always be the love of my life and it will always be you ;{">>"}.
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {/* ════════════════════════════════════════════
          SCENE 4 — Love Letter
      ════════════════════════════════════════════ */}
      {scene === 4 && (
        <motion.div key="s4"
          className="absolute inset-0 overflow-y-auto flex items-start justify-center z-10"
          style={{ background: "linear-gradient(160deg, #fff5f8 0%, #fde9f2 30%, #fbd2e6 65%, #f9c6de 100%)" }}
          variants={fadeIn} initial="initial" animate="animate"
        >
          {/* Background decoration */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <Orb style={{ top: "-80px",   right: "-60px", width: 520, height: 520, background: "radial-gradient(circle, rgba(249,168,192,0.5) 0%, transparent 65%)", filter: "blur(65px)", animationDuration: "24s" }} />
            <Orb style={{ bottom: "-80px",left: "-50px",  width: 440, height: 440, background: "radial-gradient(circle, rgba(224,80,122,0.2) 0%, transparent 65%)",  filter: "blur(70px)", animationDuration: "28s", animationDelay: "5s" }} />
            <Orb style={{ top: "45%",     left: "35%",    width: 640, height: 300, background: "radial-gradient(ellipse, rgba(253,220,235,0.55) 0%, transparent 70%)", filter: "blur(50px)", animationDuration: "20s", animationDelay: "2s" }} />
            {/* Sparkle dots */}
            {[
              { t: "7%",  l: "10%", s: 9 }, { t: "18%", l: "87%", s: 7  },
              { t: "52%", l: "4%",  s: 8 }, { t: "68%", l: "82%", s: 10 },
              { t: "88%", l: "42%", s: 6 }, { t: "33%", l: "94%", s: 8  },
              { t: "76%", l: "18%", s: 7 }, { t: "10%", l: "62%", s: 5  },
            ].map((d, i) => (
              <div key={i} className="absolute rounded-full animate-twinkle" style={{
                top: d.t, left: d.l, width: d.s, height: d.s,
                background: "rgba(224,80,122,0.5)",
                boxShadow:  `0 0 ${d.s * 2}px rgba(224,80,122,0.6)`,
                animationDuration:  `${2.4 + i * 0.35}s`,
                animationDelay:     `${i * 0.5}s`,
              }} />
            ))}
          </div>

          <div className="max-w-2xl w-full mx-auto relative z-10 py-14 px-5 md:px-12">
            {/* Decorative header */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2 }}
              className="flex flex-col items-center mb-8 gap-2"
            >
              <span className="text-3xl animate-heartbeat inline-block">❤️</span>
              <div className="w-40 h-px" style={{ background: `linear-gradient(to right, transparent, ${C.primaryLight}, transparent)` }} />
            </motion.div>

            {/* Glass card */}
            <div
              className="rounded-3xl px-8 py-10 md:px-14 md:py-12"
              style={{
                background:      "rgba(255,255,255,0.62)",
                backdropFilter:  "blur(16px)",
                boxShadow:       "0 10px 70px rgba(224,80,122,0.14), 0 2px 16px rgba(224,80,122,0.08)",
                border:          "1px solid rgba(249,168,192,0.4)",
              }}
            >
              <div
                className="leading-[1.95] whitespace-pre-wrap"
                style={{
                  fontFamily: "'Crimson Text', Georgia, serif",
                  color:       C.text,
                  fontSize:   "clamp(1.08rem, 2.6vw, 1.42rem)",
                }}
              >
                {typedText}
                <span
                  className="inline-block w-[2px] ml-[2px]"
                  style={{ height: "1.1em", backgroundColor: C.primary, animation: "blink 1s step-end infinite", verticalAlign: "middle" }}
                />
              </div>
            </div>

            {/* Decorative footer line */}
            {showContinue && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center mt-10 gap-3"
              >
                <div className="w-40 h-px" style={{ background: `linear-gradient(to right, transparent, ${C.primaryLight}, transparent)` }} />
              </motion.div>
            )}

            {showContinue && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.3 }}
                className="mt-6 flex justify-center"
              >
                <button
                  onClick={() => setScene(5)}
                  className="relative px-10 py-3 group"
                  style={{
                    fontFamily:    "'Crimson Text', Georgia, serif",
                    color:          C.textSoft,
                    letterSpacing: "0.22em",
                    fontSize:      "0.85rem",
                    textTransform: "uppercase",
                    background:    "transparent",
                    border:        "none",
                    cursor:        "pointer",
                    transition:    "color 0.3s",
                  }}
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

      {/* ════════════════════════════════════════════
          SCENE 5 — Voice message + crossfade ending
      ════════════════════════════════════════════ */}
      {scene === 5 && (
        <motion.div key="s5" className="absolute inset-0 z-10"
          style={{ background: `linear-gradient(140deg, ${C.bg} 0%, ${C.bgMid} 55%, ${C.bgDeep} 100%)` }}
          variants={fadeIn} initial="initial" animate="animate"
        >
          {/* Ambient orbs */}
          <Orb style={{ top: "15%",   left: "10%",  width: 300, height: 300, background: `radial-gradient(circle, rgba(224,80,122,0.11) 0%, transparent 70%)`, filter: "blur(55px)", animationDuration: "22s" }} />
          <Orb style={{ bottom: "10%",right: "8%",  width: 260, height: 260, background: `radial-gradient(circle, rgba(249,168,192,0.22) 0%, transparent 70%)`, filter: "blur(62px)", animationDuration: "25s", animationDelay: "4s" }} />

          {/* Pink warmth overlay when playing */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-[1400ms]"
            style={{ background: "rgba(249,168,192,0.18)", opacity: isPlaying && !showFinal ? 1 : 0 }}
          />

          {/* ── Audio player — fades out when showFinal ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            animate={{ opacity: showFinal ? 0 : 1 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            style={{ pointerEvents: showFinal ? "none" : "auto" }}
          >
            <div className="flex flex-col items-center text-center w-full max-w-md gap-0">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4 }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize:   "clamp(1.2rem, 4vw, 1.75rem)",
                  color:       C.textSoft,
                  lineHeight:  1.55,
                  marginBottom: "48px",
                }}
              >
                Close your eyes for a moment…
                <br />
                <span style={{ fontStyle: "italic", fontSize: "0.85em", color: C.primary }}>
                  this one is only for you.
                </span>
              </motion.p>

              <div className="relative flex items-center justify-center">
                {isPlaying && (
                  <>
                    <div className="absolute rounded-full animate-pulse-ring"
                      style={{ width: "220px", height: "220px", background: `radial-gradient(circle, rgba(224,80,122,0.18) 0%, transparent 70%)`, filter: "blur(12px)" }} />
                    <div className="absolute rounded-full"
                      style={{ width: "172px", height: "172px", border: `1px solid rgba(224,80,122,0.2)`, animation: "pulse-ring 2.5s ease-in-out infinite 0.7s" }} />
                    <div className="absolute rounded-full"
                      style={{ width: "148px", height: "148px", border: `1px solid rgba(249,168,192,0.3)`, animation: "pulse-ring 2.5s ease-in-out infinite 0.2s" }} />
                  </>
                )}
                <button
                  onClick={handlePlay}
                  disabled={isPlaying}
                  className="relative flex flex-col items-center justify-center rounded-full transition-all duration-700"
                  style={{
                    width: "136px", height: "136px",
                    border:    `2px solid ${isPlaying ? "rgba(224,80,122,0.55)" : "rgba(224,80,122,0.22)"}`,
                    background: isPlaying ? "rgba(224,80,122,0.1)" : "rgba(255,255,255,0.68)",
                    cursor:     isPlaying ? "default" : "pointer",
                    transform:  isPlaying ? "scale(1.08)" : "scale(1)",
                    boxShadow:  isPlaying ? `0 0 40px rgba(224,80,122,0.28)` : `0 4px 24px rgba(224,80,122,0.12)`,
                  }}
                >
                  {isPlaying
                    ? <Waveform />
                    : <>
                        <span style={{ fontSize: "2.2rem" }}>🎧</span>
                        <span style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "0.72rem", letterSpacing: "0.18em", color: C.primary, marginTop: "7px" }}>PLAY</span>
                      </>
                  }
                </button>
              </div>

              {/* Voice message: drop your recording as /message.mp3 in the public/ folder */}
              <audio ref={audioRef} src="/message.mp3" className="hidden" />
              {/* Background music: drop your track as /background.mp3 in the public/ folder */}
              <audio ref={bgMusicRef} src="/background.mp3" className="hidden" preload="auto" />

              {isPlaying && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.5 }}
                  className="mt-10 italic"
                  style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "1rem", color: C.textSoft, letterSpacing: "0.04em" }}
                >
                  Listening with my whole heart…
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* ── Final ending — smooth crossfade in ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            animate={{ opacity: showFinal ? 1 : 0 }}
            transition={{ duration: 2.6, ease: "easeInOut", delay: showFinal ? 0.7 : 0 }}
            style={{ pointerEvents: showFinal ? "auto" : "none" }}
          >
            <FloatingHeartsEnding />

            {/* Deep glow backdrop */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(249,168,192,0.28) 0%, transparent 70%)",
            }} />

            <div className="relative z-10 text-center max-w-xl flex flex-col items-center gap-8">
              <motion.h2
                initial={{ y: 24, filter: "blur(8px)" }}
                animate={showFinal ? { y: 0, filter: "blur(0px)" } : { y: 24, filter: "blur(8px)" }}
                transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize:   "clamp(2.2rem, 8vw, 4.8rem)",
                  color:       C.primary,
                  textShadow: `0 0 30px rgba(224,80,122,0.32)`,
                  lineHeight:  1.35,
                }}
              >
                I'd choose you.
                <br />
                <span style={{ fontSize: "0.68em", color: C.textSoft, fontStyle: "italic" }}>
                  Over and over again.
                </span>
                <br />
                <span style={{ fontSize: "0.75em", color: C.text }}>
                  In every lifetime, my honey!
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={showFinal ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 1.6, delay: 2.2, ease: "easeOut" }}
                style={{
                  fontFamily:   "'Crimson Text', Georgia, serif",
                  fontSize:     "clamp(1rem, 2.8vw, 1.3rem)",
                  color:         C.textSoft,
                  fontStyle:    "italic",
                  letterSpacing: "0.04em",
                }}
              >
                Happy 2nd Monthsary, Honey. Thank you for being mine. ❤️
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
