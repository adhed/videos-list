/*global chrome*/

import React, { useState, useEffect } from 'react';
import './App.scss';
import { VideosList, VideoPanel } from './components';
import { IVideo } from './models';

const App: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);
  const [foundVideos, setFoundVideos] = useState<IVideo[]>([]);

  const getVideo = (id: string): IVideo | null => {
    return foundVideos.find((video: IVideo) => video.id === id) || null;
  }

  const handleVideoSelect = (id: string): void => {
    setSelectedVideo(getVideo(id));
    scrollToTop();
  }

  const handleClearClick = (): void => {
    setSelectedVideo(null);
  }
  
  const scrollToTop = (): void => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (!chrome || !chrome.storage || !chrome.storage.sync) {
      return;
    }

    chrome.storage.sync.get(['videos'], (message) => {
      if (!message.videos) {
        return;
      }

      setFoundVideos(message.videos);
    }); 
  }, []);

  return (
    <div className="app-container">
      { selectedVideo ? <VideoPanel onClearClick={handleClearClick} data={selectedVideo} /> : null }
      { foundVideos.length ? <VideosList videos={foundVideos} selectedVideo={selectedVideo} onVideoNameClick={handleVideoSelect} /> : 'Videos list is empty.' }
    </div>
  );
}

export default App;
