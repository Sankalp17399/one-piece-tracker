"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

const OceanAmbience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleSound = () => {
    if (isPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Create pink/white noise for ocean waves effect
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Filter to shape into gentle wave sounds
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, ctx.currentTime);

        // LFO for wave swelling movement
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.12; // slow wave rhythm
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 250;

        lfo.connect(filter.frequency);
        lfo.start();

        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0.08, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(mainGain);
        mainGain.connect(ctx.destination);

        whiteNoise.start();
        noiseNodeRef.current = whiteNoise;
        gainNodeRef.current = mainGain;
      } else {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-sans text-xs font-bold transition-all shadow-md ${
        isPlaying 
          ? 'bg-[#8b5a2b] text-[#f2e3c6] ring-2 ring-[#f2e3c6] animate-pulse' 
          : 'bg-[#dfcbb5] text-[#3e2723] hover:bg-[#8b5a2b] hover:text-[#f2e3c6]'
      }`}
      title="Toggle gentle ocean ambient sound"
    >
      {isPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
      <span>{isPlaying ? 'Waves Sounding' : 'Ocean Ambience'}</span>
    </button>
  );
};

export default OceanAmbience;