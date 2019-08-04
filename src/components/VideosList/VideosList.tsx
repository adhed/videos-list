import React from 'react';
import './VideosList.scss';
import { IVideo } from '../../models';

interface VideosListProps {
    videos: IVideo[];
    onVideoNameClick: (id: string) => void;
}

const VideosList: React.FC<VideosListProps> = (props: VideosListProps) => {

    const handleVideoNameClick = (id: string): void => {
        props.onVideoNameClick(id);
    }
    return (
        <div className="videos-list">
            <ul className="video_list__list">
                { props.videos.map((video: IVideo) => {
                    return <li key={video.id} className="video_list__element" onClick={handleVideoNameClick.bind(null, video.id)}>{ video.name }</li>
                })}
            </ul>        
        </div>
    );
}

export default VideosList;
