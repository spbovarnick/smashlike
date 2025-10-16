"use client";

import ThumbLike16Regular from "./components/ThumbLike16Regular";
import SmashThatLike from "./components/SmashThatLike";
import { useRef } from "react";

export default function Home() {
  let strobeTimeout: number | string;
  const partyRock = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio('/audio/party_rock.mp3') : undefined
  );
  let textColor: string = "black";
  const smashRef = useRef<SVGSVGElement>(null);
  let pulseAnimation: Animation | null = null;

  const getHue = () => Math.random() * 360;

  const neonStrobe = () => {
    const hue = getHue();
    document.body.style.backgroundColor = `hsl(${hue}, 80%, 80%)`;
    textColor = `hsl(${(hue + 180) % 360}, 20%, 20%)`
    strobeTimeout = window.setTimeout(neonStrobe, 300);
  };

  const smashLike = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    partyRock.current?.play();
    neonStrobe();
    if (smashRef.current) {
      pulseAnimation = smashRef.current.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(.8)"},
          { transform: "scale(1)" }
        ],
        { duration: 400, iterations: Infinity, easing: "ease-out" }
      );
    }
  };

  const reset = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    clearTimeout(strobeTimeout);
    document.body.style.backgroundColor = "white";
    partyRock.current?.pause();
    if (partyRock.current) partyRock.current.currentTime = 0;
    pulseAnimation?.cancel();
    pulseAnimation = null;
  }




  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SmashThatLike ref={smashRef} size="400" color={textColor}/>
      <button
        onTouchStart={smashLike}
        onMouseDown={smashLike}
        onMouseUp={reset}
        onMouseLeave={reset}
        className="thumb-btn w-min cursor-pointer thumb transition-transform duration-300 hover:scale-110 active:scale-80">
        <ThumbLike16Regular size="100"/>
      </button>
    </div>
  );
}
