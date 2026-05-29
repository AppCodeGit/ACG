"use client";

import { useState, useRef, useEffect } from "react";
import "./style/VideoPlayer.css";

interface VideoPlayerProps {
  videoUrl: string;
  contentId: number;
  studentEmail: string;
  title: string;
  onProgressUpdate?: (progress: number, isCompleted: boolean) => void;
}

const VideoPlayer = ({
  videoUrl,
  contentId,
  studentEmail,
  title,
  onProgressUpdate,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [buffering, setBuffering] = useState(false);

  // ✅ FIXED ROUTE HERE
  const saveProgress = async (position: number, completed: boolean) => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const response = await fetch(`${API_URL}/api/video-progress/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: studentEmail,
          contentId,
          lastPosition: Math.floor(position),
          isCompleted: completed,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to save progress:", error);
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  // ✅ FIXED ROUTE HERE
const loadSavedProgress = async () => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(
      `${API_URL}/api/video-progress/progress/${encodeURIComponent(studentEmail)}/${contentId}`,
    );
    const data = await response.json();
    // FIX: Check if data.progress exists directly
    if (data.progress && data.progress.lastPosition !== undefined && videoRef.current) {
      videoRef.current.currentTime = data.progress.lastPosition;
      setCurrentTime(data.progress.lastPosition);
      if (data.progress.isCompleted) {
        setIsCompleted(true);
        if (onProgressUpdate) onProgressUpdate(100, true);
      }
    }
  } catch (error) {
    console.error("Error loading saved progress:", error);
  }
};

  // EVERYTHING BELOW IS 100% UNCHANGED
  const hideControls = () => {
    if (controlsTimeout) clearTimeout(controlsTimeout);
    const timeout = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
    setControlsTimeout(timeout);
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    hideControls();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 0;
      const prog = (current / dur) * 100;
      setCurrentTime(current);
      setProgress(prog);

      const completed = prog >= 90;
      if (completed && !isCompleted) {
        setIsCompleted(true);
        if (onProgressUpdate) onProgressUpdate(100, true);
      }

      if (saveTimeout) clearTimeout(saveTimeout);
      const timeout = setTimeout(() => saveProgress(current, completed), 5000);
      setSaveTimeout(timeout);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsCompleted(true);
    saveProgress(videoRef.current?.duration || 0, true);
    if (onProgressUpdate) onProgressUpdate(100, true);
    setShowControls(true);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
      showControlsTemporarily();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
      showControlsTemporarily();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
    showControlsTemporarily();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 1;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
    showControlsTemporarily();
  };

  const changePlaybackSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newRate = speeds[nextIndex];
    setPlaybackRate(newRate);
    if (videoRef.current) videoRef.current.playbackRate = newRate;
    showControlsTemporarily();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    showControlsTemporarily();
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        duration,
      );
      showControlsTemporarily();
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0,
      );
      showControlsTemporarily();
    }
  };

  useEffect(() => {
    loadSavedProgress();
    return () => {
      if (saveTimeout) clearTimeout(saveTimeout);
      if (controlsTimeout) clearTimeout(controlsTimeout);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hours > 0)
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className={`video-player-container ${isFullscreen ? "fullscreen" : ""}`}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onMouseEnter={() => setShowControls(true)}
    >
      <div className="video-wrapper">
        <video
          ref={videoRef}
          src={videoUrl}
          className="video-element"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={() => {
            setDuration(videoRef.current?.duration || 0);
            setIsLoading(false);
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onWaiting={() => setBuffering(true)}
          onCanPlay={() => setBuffering(false)}
          controlsList="nodownload"
          disablePictureInPicture
          controls={false}
          onClick={togglePlay}
        />

        {/* Buffering Overlay */}
        {buffering && (
          <div className="buffering-overlay">
            <div className="buffering-spinner"></div>
            <p>Buffering...</p>
          </div>
        )}

        {/* Custom Controls */}
        <div
          className={`video-controls ${showControls ? "visible" : "hidden"}`}
        >
          {/* Progress Bar */}
          <div className="control-bar progress-bar-container">
            <span className="time-current">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="seek-bar"
              step="0.1"
            />
            <span className="time-duration">{formatTime(duration)}</span>
          </div>

          {/* Bottom Controls */}
          <div className="control-bar bottom-controls">
            <div className="controls-left">
              <button
                className="control-btn"
                onClick={togglePlay}
                title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button
                className="control-btn"
                onClick={skipBackward}
                title="Backward 10s (←)"
              >
                ⏪ 10s
              </button>
              <button
                className="control-btn"
                onClick={skipForward}
                title="Forward 10s (→)"
              >
                10s ⏩
              </button>
              <div className="volume-control">
                <button
                  className="control-btn"
                  onClick={toggleMute}
                  title="Mute (M)"
                >
                  {isMuted ? "🔇" : volume > 0.5 ? "🔊" : "🔉"}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>
            </div>

            <div className="controls-center">
              <button
                className="playback-speed-btn"
                onClick={changePlaybackSpeed}
                title="Playback Speed"
              >
                {playbackRate}x
              </button>
            </div>

            <div className="controls-right">
              <div className="progress-badge">
                <span>{Math.round(progress)}%</span>
                {isCompleted && (
                  <span className="completed-badge">✓ Completed</span>
                )}
              </div>
              <button
                className="control-btn"
                onClick={toggleFullscreen}
                title="Fullscreen (F)"
              >
                {isFullscreen ? "🗗" : "🗖"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="video-loading">
          <div className="loading-spinner"></div>
          <p>Loading video...</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
