/*global chrome*/

import React, { useState, useEffect } from 'react';
import './App.scss';
import { VideosList, VideoPanel } from './components';
import { IVideo } from './models';
import { YouTubeApiService } from './services/YouTubeApiService';
import { IVideoDetails } from './models/IVideoDetails';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);
  const [foundVideos, setFoundVideos] = useState<IVideo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  
  const fetchVideoDetails = async (videosIds: string[]): Promise<void> => {
    const videos: IVideoDetails[] = await Promise.all(
      videosIds.map(async (id: string) => await YouTubeApiService.getVideoDetails(id))
    );
    const newFoundVideos = videos.map((videoDetails: IVideoDetails) => ({
      id: videoDetails.id,
      thumbnail: videoDetails.snippet.thumbnails.default.url,
      description: videoDetails.snippet.description,
      name: videoDetails.snippet.title,
    }));

    setFoundVideos(newFoundVideos);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!chrome || !chrome.storage || !chrome.storage.sync) {
      return;
    }

    chrome.storage.sync.get(['videosIds'], (message) => {
      setIsLoading(true);
      const videosIds: string[] = message.videosIds.urls;

      (async () => {
        try {
          fetchVideoDetails(videosIds);
        } catch(e) {
          alert('There is an error with the request for videos details, sorry.');
        }
      })();
    }); 
  }, [])

  return (
    <div className="app-container">
      { selectedVideo ? <VideoPanel onClearClick={handleClearClick} data={selectedVideo} /> : null }
      { isLoading ? 'Videos list is loading...' : foundVideos.length ? <VideosList videos={foundVideos} selectedVideo={selectedVideo} onVideoNameClick={handleVideoSelect} /> : 'Videos list is empty.' }
    </div>
  );
}

export default App;
