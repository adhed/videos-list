import React, { useState, useEffect } from 'react';
import './App.scss';
import { VideosList, VideoPanel } from './components';
import { IVideo, IChromeMessage } from './models';
import { PLUGIN_DATA_MSG } from './contants';
import { YouTubeApiService } from './services/YouTubeApiService';
import { IVideoDetails } from './models/IVideoDetails';

const mockedVideos: IVideo[] = [
  { name: 'first', thumbnail: 'sss.jog', description: 'fff desc', id: 'Ks-_Mh1QhMc' },
  { name: 'sec', thumbnail: 'sss.jog', description: 'fff desdfdssc', id: 'AJlpRlQT7io' },
  { name: '233', thumbnail: 'sss.jog', description: 'fffsdsd dsdesc', id: 'KiNYeHY5hUg' },
  { name: 'dd', thumbnail: 'sss.jog', description: 'fff dsdsdesc', id: '1A3ZPUjwnoY' },
]

const App: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);
  const [foundVideos, setFoundVideos] = useState<IVideo[]>([]);

  const getVideo = (id: string): IVideo | null => {
    return foundVideos.find((video: IVideo) => video.id === id) || null;
  }

  const handleVideoSelect = (id: string): void => {
    setSelectedVideo(getVideo(id));
  }

  const handleClearClick = (): void => {
    setSelectedVideo(null);
  }

  useEffect(() => {
    (async () => {
      const videos: IVideoDetails[] = await Promise.all(
        mockedVideos.map(async (video: IVideo) => await YouTubeApiService.getVideoDetails(video.id))
      );
      const newFoundVideos = videos.map((videoDetails: IVideoDetails) => ({
        id: videoDetails.id,
        thumbnail: videoDetails.snippet.thumbnails.default.url,
        description: videoDetails.snippet.description,
        name: videoDetails.snippet.title,
      }));
  
      setFoundVideos(newFoundVideos);
    })();
  }, [])

  return (
    <div className="app-container">
      { selectedVideo ? <VideoPanel onClearClick={handleClearClick} data={selectedVideo} /> : null }
      { foundVideos.length ? <VideosList videos={foundVideos} onVideoNameClick={handleVideoSelect} /> : 'Videos list is empty.' }
    </div>
  );
}

export default App;
