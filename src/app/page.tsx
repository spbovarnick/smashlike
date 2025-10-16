"use client";

import ThumbLike16Regular from "./components/ThumbLike16Regular";
import SmashThatLike from "./components/SmashThatLike";

export default function Home() {
  let strobeTimeout: number | null = null;
  const partyRock = new Audio('/audio/party_rock.mp3')
  let textColor: string = "black";

  const getHue = () => Math.random() * 360;

  const neonStrobe = () => {
    const hue = getHue();
    document.body.style.backgroundColor = `hsl(${hue}, 80%, 80%)`;
    textColor = `hsl(${(hue + 180) % 360}, 20%, 20%)`
    strobeTimeout = window.setTimeout(neonStrobe, 300);
  };

  const smashLike = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    partyRock.play();
    neonStrobe();
  };

  const reset = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearTimeout(strobeTimeout);
    document.body.style.backgroundColor = "white";
    partyRock.pause();
    partyRock.currentTime = 0;
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SmashThatLike size="200" color={textColor}/>
      <button
        onTouchStart={smashLike}
        onMouseDown={smashLike}
        onMouseUp={reset}
        className="w-min cursor-pointer">
        <ThumbLike16Regular size="100"/>
      </button>
    </div>
  );
}
