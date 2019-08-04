import { IVideoDetails, IVideoDetailsWrapper } from "../models/IVideoDetails";
import { YT_API, YT_API_KEY } from "../contants";

export const YouTubeApiService = {
    getVideoDetails: (id: string): Promise<IVideoDetails> => {
        return fetch(`${YT_API}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${YT_API_KEY}`)
            .then((response: Response) => {
                if (!response.ok) {
                throw new Error(response.statusText)
                }
                return response.json()
            })
            .then((data: IVideoDetailsWrapper) => {
                return data.items[0];
            });
    }
}