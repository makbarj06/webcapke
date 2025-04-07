import "./App.css";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lidya from "../src/images/lidya.png";

// Icon random ke berbagai arah dari tengah
function FlyingIcon({ icon, delay, duration }) {
  const directions = [
    { x: -200, y: -300 },
    { x: 200, y: -250 },
    { x: -150, y: 200 },
    { x: 180, y: 250 },
    { x: -100, y: -200 },
    { x: 220, y: 180 },
    { x: 0, y: -300 },
  ];
  const dir = directions[Math.floor(Math.random() * directions.length)];

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: [0, dir.x, 0],
        y: [0, dir.y, 0],
        rotate: [0, 20, -20, 0],
        scale: [1, 1.2, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration,
        delay,
        ease: "easeInOut",
      }}
      className="absolute text-4xl pointer-events-none"
      style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
    >
      {icon}
    </motion.div>
  );
}

export default function HomePage() {
  const [showText, setShowText] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const audioRef = useRef(null);

  const handleClick = () => {
    setShowBg(true);
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play();
    }
    setTimeout(() => {
      setShowText(true);
    }, 500);
  };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center bg-center relative overflow-hidden transition-all duration-1000"
      style={{
        backgroundImage: showBg ? `url('${Lidya}')` : "none",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      {showBg && (
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 z-0" />
      )}

      {/* Suara */}
      <audio ref={audioRef} src="/ngakak.mp3" preload="auto" />

      {/* Icon random terbang dari tengah */}
      {showBg && (
        <>
          <FlyingIcon icon="😹" delay={0} duration={6} />
          <FlyingIcon icon="👻" delay={0.5} duration={7} />
          <FlyingIcon icon="💩" delay={1} duration={6.5} />
          <FlyingIcon icon="🛸" delay={1.2} duration={5.8} />
          <FlyingIcon icon="🐸" delay={0.8} duration={7.3} />
          <FlyingIcon icon="🥴" delay={1.5} duration={6.1} />
          <FlyingIcon icon="🤣" delay={1.7} duration={7.2} />
        </>
      )}

      {/* Tombol dan teks */}
      <div className="z-10 flex flex-col items-center">
        {!showText && (
          <button
            onClick={handleClick}
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg text-xl mb-6 shadow-lg z-20"
          >
            Klik Aku Dong!
          </button>
        )}

        <AnimatePresence>
          {showText && (
            <motion.div
              key="prank"
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.6 }}
              className="text-4xl text-pink-300 font-extrabold text-center drop-shadow-lg"
            >
              🤣 HAHAHA NAHDA GOBLOKK !!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
