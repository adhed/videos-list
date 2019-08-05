import React, { useState, useEffect } from 'react';
import './VideoPanel.scss';
import { IVideo, IVideoDetails } from '../../models';
import { YouTubeApiService } from '../../services/YouTubeApiService';
import { VideoDetails } from '../VideoDetails';

interface VideoPanelProps {
    data: IVideo;
    onClearClick: () => void;
}

const VideoPanel: React.FC<VideoPanelProps> = (props: VideoPanelProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoDetails, setVideoDetails] = useState<IVideo | null>(null);

  const handleClearClick = (): void => {
    props.onClearClick();
  }

  const fetchVideoDetails = async (): Promise<void> => {
    setIsLoading(true);

    const videoDetails: IVideoDetails = await YouTubeApiService.getVideoDetails(props.data.id);

    setVideoDetails({
      thumbnail: videoDetails.snippet.thumbnails.default.url,
      description: videoDetails.snippet.description,
      id: props.data.id,
      name: props.data.name
    })
    setIsLoading(false);
  }

  useEffect(() => {

    (async () => {
      try {
        await fetchVideoDetails();
      } catch(e) {
        alert('There is an error with the request for videos details, sorry.');
        setIsLoading(false);
      }
    })();
  });

  return (
    <div className="video-panel">
        <h2 className="video-panel__title">{ props.data.name } details:</h2>
        <span className="video-panel__clear-icon" title="clear selected video" onClick={handleClearClick}>x</span>
        { isLoading ? `Video's details are loading...` : <VideoDetails data={videoDetails} />}
    </div>
  );
}

export default VideoPanel;
