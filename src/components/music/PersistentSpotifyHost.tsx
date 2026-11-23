"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMusicStore } from "@/store/use-music-store";
import { toSpotifyEmbedUrl, toSpotifyUri } from "@/content/data/music";

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
    SpotifyIframeApi?: any;
  }
}

export function PersistentSpotifyHost() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { currentTrack, setController, setIsPlaying, setIsReady, setPlaybackProgress, isPanelOpen } =
    useMusicStore();
  const [apiFailed, setApiFailed] = useState(false);
  const controllerInitialized = useRef(false);

  useEffect(() => {
    // If Spotify Iframe API is already available or initialized
    if (typeof window === "undefined" || controllerInitialized.current) return;

    const initController = (IFrameAPI: any) => {
      if (!containerRef.current || controllerInitialized.current) return;

      try {
        const options = {
          uri: toSpotifyUri(currentTrack.spotifyUrl),
          width: "100%",
          height: 152,
        };

        IFrameAPI.createController(containerRef.current, options, (EmbedController: any) => {
          controllerInitialized.current = true;
          setController(EmbedController);
          setIsReady(true);

          EmbedController.addListener("playback_update", (e: any) => {
            if (e && e.data) {
              const isPaused = Boolean(e.data.isPaused);
              const hasStarted = (e.data.position || 0) > 0 || !isPaused;
              setIsPlaying(!isPaused && hasStarted);
              setPlaybackProgress(e.data.position || 0, e.data.duration || 0);
            }
          });

          EmbedController.addListener("ready", () => {
            setIsReady(true);
          });
        });
      } catch (err) {
        setApiFailed(true);
      }
    };

    if (window.SpotifyIframeApi) {
      initController(window.SpotifyIframeApi);
      return;
    }

    // Set callback
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      window.SpotifyIframeApi = IFrameAPI;
      initController(IFrameAPI);
    };

    // Load Spotify IFrame API script
    const existingScript = document.getElementById("spotify-iframe-api");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "spotify-iframe-api";
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.onerror = () => setApiFailed(true);
      document.body.appendChild(script);
    }
  }, [currentTrack, setController, setIsPlaying, setIsReady, setPlaybackProgress]);

  return (
    <>
      {/* 
        Persistent Host:
        When the panel is open, the embed is visibly positioned in the expanded modal via CSS.
        When the panel is closed, it remains permanently mounted in a hidden portal container 
        (opacity-0, pointer-events-none, fixed offscreen) so the audio stream NEVER dies or resets.
      */}
      <div
        className={`transition-all duration-300 ${
          isPanelOpen
            ? "fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:top-auto sm:translate-y-0 sm:bottom-auto z-[60] sm:relative"
            : "fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none w-[300px] h-[152px] z-[-1]"
        }`}
        id="persistent-spotify-container"
      >
        <div ref={containerRef} className="w-full h-[152px] rounded-xl overflow-hidden shadow-md" />

        {/* Fallback standard iframe if Spotify JS API fails to initialize */}
        {apiFailed && (
          <iframe
            src={toSpotifyEmbedUrl(currentTrack.spotifyUrl)}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl w-full"
            title={`Spotify Stream: ${currentTrack.title}`}
          />
        )}
      </div>
    </>
  );
}
