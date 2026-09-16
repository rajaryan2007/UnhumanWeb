import React from 'react';

export default function VideoBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Placeholder for an actual background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-30"
      >
        <source src="https://cdn.pixabay.com/video/2021/08/04/83864-584742911_large.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay to ensure text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
    </div>
  );
}
