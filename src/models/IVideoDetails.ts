export interface IVideoDetailsWrapper {
    items: IVideoDetails[];
}

export interface IVideoDetails {
    id: string;
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            }
        }
    }
}