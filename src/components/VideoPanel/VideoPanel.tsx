import React from 'react';
import './VideoPanel.scss';
import { IVideo } from '../../models';

interface VideoPanelProps {
    data: IVideo;
    onClearClick: () => void;
}

const VideoPanel: React.FC<VideoPanelProps> = (props: VideoPanelProps) => {

  const handleClearClick = (): void => {
    props.onClearClick();
  }
  return (
    <div className="video-panel">
        <h2 className="video-panel__title">{ props.data.name } details:</h2>
        <span className="video-panel__clear-icon" title="clear selected video" onClick={handleClearClick}>x</span>
        <div className="video-panel__info">
          <img src={props.data.thumbnail} alt="video thumbnail" className="video-panel__thumbnail" />
          <p className="video-panel__description">{ props.data.description }</p>
        </div>
    </div>
  );
}

export default VideoPanel;
