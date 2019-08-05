const VIDEO_CONTAINER_SELECTOR  = 'ytd-grid-video-renderer';
const THUMBNAIL_SELECTOR  = '.yt-img-shadow';
const NAME_SELECTOR = '#video-title'
const LOCAL_STORAGE_KEY = 'videos';

const getVideos = (selector) => {
    const nodes = document.querySelectorAll(selector);
    const videos = [];

    if (!nodes) {
        return null;
    }

    nodes.forEach((node) => {
        const nameNode = node.querySelector(NAME_SELECTOR);
        if (nameNode) {
            videos.push({
                id: nameNode.href.split('=')[1],
                name: nameNode.title
            });
        }
    });
    return videos;
}

const setCurrentVideos = () => {
    chrome.storage.sync.set({'videos': getVideos(VIDEO_CONTAINER_SELECTOR)});
}

window.addEventListener('load', () => {
    setCurrentVideos();
}, false);

window.addEventListener('scroll', () => {
    setCurrentVideos();
}, false);

