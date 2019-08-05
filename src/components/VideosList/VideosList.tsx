import React from 'react';
import './VideosList.scss';
import { IVideo } from '../../models';
import { IVideoDetails } from '../../models/IVideoDetails';

interface VideosListProps {
    videos: IVideo[];
    selectedVideo: IVideo | null;
    onVideoNameClick: (id: string) => void;
}

const VideosList: React.FC<VideosListProps> = (props: VideosListProps) => {

    const handleVideoNameClick = (id: string): void => {
        props.onVideoNameClick(id);
    }

    const getElementClassNames = (videoId: string): string => {
        const classNames = ['video_list__element'];

        if (props.selectedVideo && props.selectedVideo.id === videoId) {
            classNames.push('video_list__element--highlighted');
        }

        return classNames.join(' ');
    }
    return (
        <div className="videos-list">
            <ul className="video_list__list">
                { props.videos.map((video: IVideo) => {
                    return <li key={video.id} className={getElementClassNames(video.id)} onClick={handleVideoNameClick.bind(null, video.id)}>{ video.name }</li>
                })}
            </ul>        
        </div>
    );
}

export default VideosList;
