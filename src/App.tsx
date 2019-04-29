import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { Station } from "./Station";
import StationList from "./StationList";
import Marquee from "./Marquee";

enum LoadingState {
  Ready,
  Loading,
  Success,
  Error
}

const App: React.FC = () => {
  const [currentStation, setCurrentStation] = useState<Station | undefined>(
    undefined
  );
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.Ready
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  // player source loading states
  useEffect(() => {
    const onLoadStart = (e: Event) => setLoadingState(LoadingState.Loading);
    const onCanPlay = (e: Event) => setLoadingState(LoadingState.Success);
    const onError = (e: Event) => setLoadingState(LoadingState.Error);

    if (audioRef.current) {
      audioRef.current.addEventListener("loadstart", onLoadStart);
      audioRef.current.addEventListener("canplay", onCanPlay);
      audioRef.current.addEventListener("error", onError);
    }

    return function() {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadstart", onLoadStart);
        audioRef.current.removeEventListener("canplay", onCanPlay);
        audioRef.current.removeEventListener("error", onError);
      }
    };
  }, []);

  // autoplay selected station
  useEffect(() => {
    if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [currentStation]);

  // playback control
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying === true) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  function togglePlay() {
    setIsPlaying(isPlaying ? false : true);
  }

  return (
    <div className="App">
      <StationList
        currentStation={currentStation}
        setCurrentStation={setCurrentStation}
      />

      <audio
        src={currentStation ? currentStation.streams[0].url : undefined}
        ref={audioRef}
      />

      <div style={{ padding: 8 }}>
        <div style={{ border: "2px #fff solid", display: "flex" }}>
          <button
            onClick={togglePlay}
            style={{
              borderRight: "3px #ccc solid",
              padding: 8,
              width: 96,
              textAlign: "center",
              backgroundColor: "#111",
              color: "#fff",
              fontSize: 16
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <div style={{ padding: 8 }}>
            <div
              style={{
                color: "#888",
                textTransform: "uppercase",
                fontSize: 12,
                letterSpacing: "0.075rem"
              }}
            >
              Now Playing
            </div>
            <Marquee>
              {(() => {
                switch (loadingState) {
                  case LoadingState.Loading:
                    return <div>...</div>;
                  case LoadingState.Ready:
                    return <div />;
                  case LoadingState.Success:
                    return (
                      <div>{currentStation ? currentStation.name : ""}</div>
                    );
                  case LoadingState.Error:
                    return <div>An error occurred</div>;
                }
              })()}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
