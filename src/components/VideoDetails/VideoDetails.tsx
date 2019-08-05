import React from 'react';
import './VideoDetails.scss';
import { IVideo } from '../../models';

interface VideoDetailsProps {
    data: IVideo | null;
}

const VideoDetails: React.FC<VideoDetailsProps> = (props: VideoDetailsProps) => {
  return (
    <div className="video-details">
        <img src={props.data ? props.data.thumbnail : ''} alt="video thumbnail" className="video-details__thumbnail" />
        <p className="video-detail__description">{ props.data ? props.data.description : ''}</p>
    </div>
  );
}

export default VideoDetails;
