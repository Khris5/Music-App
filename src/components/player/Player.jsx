import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
} from "lucide-react";

const Player = ({ tracks, currentTrackIndex, setCurrentTrackIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // Refs
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  // Current track data
  const currentTrack = tracks[currentTrackIndex];

  // Play/Pause handler
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Next track handler
  const nextTrack = () => {
    if (isShuffle) {
      const remainingIndices = Array.from(Array(tracks.length).keys()).filter(
        (index) => index !== currentTrackIndex
      );
      console.log(remainingIndices);

      const randomIndex =
        remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
      setCurrentTrackIndex(randomIndex);
    } else {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      setCurrentTrackIndex(nextIndex);
    }
    setIsPlaying(true);
  };

  // Previous track handler
  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    console.log(prevIndex);
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  // Progress update handler
  const updateProgress = (e) => {
    const { currentTime, duration } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    setProgress(progressPercent);
  };

  // Seek handler
  const handleSeek = (e) => {
    const { left, width } = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - left;
    const percentage = clickPosition / width;
    const time = percentage * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setProgress(percentage * 100);
  };

  // Volume handler
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    console.log(audioRef.current.volume);
    audioRef.current.volume = newVolume;
  };

  // Track end handler
  const handleTrackEnd = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (isShuffle) {
      const remainingIndices = Array.from(Array(tracks.length).keys()).filter(
        (index) => index !== currentTrackIndex
      );
      const randomIndex =
        remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
      setCurrentTrackIndex(randomIndex);
    } else {
      nextTrack();
    }
  };

  // Format time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleShuffle = () => {
    setIsShuffle((prev) => !prev);
    setIsRepeat(false);
  };
  const handleRepeat = () => {
    setIsRepeat((prev) => !prev);
    setIsShuffle(false);
  };
  // Effects
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-md mx-auto ">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={currentTrack?.songImg}
          alt="Album Artwork"
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div>
          <h3 className="text-white font-bold text-lg">
            {currentTrack?.songName}
          </h3>
          <p className="text-gray-400 text-sm">{currentTrack?.artistName}</p>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack?.songUrl}
        onTimeUpdate={updateProgress}
        onEnded={handleTrackEnd}
      />

      {/* Controls */}
      <div className="flex flex-col space-y-4">
        {/* Main Controls */}
        <div className="flex justify-center items-center space-x-6">
          {/* Prev Button */}
          <button
            onClick={prevTrack}
            className="text-white hover:text-blue-400 transition"
          >
            <SkipBack size={24} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* Next Button */}
          <button
            onClick={nextTrack}
            className="text-white hover:text-blue-400 transition"
          >
            <SkipForward size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">
            {formatTime(audioRef.current?.currentTime || 0)}
          </span>
          <div
            ref={progressBarRef}
            className="flex-grow bg-gray-700 rounded-full h-1 cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="bg-blue-500 h-1 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">
            {formatTime(audioRef.current?.duration || 0)}
          </span>
        </div>

        {/* Additional Controls */}
        <div className="flex justify-between items-center">
          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
              className="text-white hover:text-blue-400"
            >
              {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-700 appearance-none rounded-full"
            />
          </div>

          {/* Shuffle and Repeat */}
          <div className="flex space-x-3">
            <button
              onClick={handleShuffle}
              className={`text-white ${
                isShuffle ? "text-blue-400" : "hover:text-blue-400"
              }`}
            >
              <Shuffle size={20} />
            </button>
            <button
              onClick={handleRepeat}
              className={`text-white ${
                isRepeat ? "text-blue-400" : "hover:text-blue-400"
              }`}
            >
              <Repeat size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage

export default Player;
