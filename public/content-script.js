const VIDEO_CONTAINER_SELECTOR  = '.ytd-grid-renderer';
const THUMBNAIL_SELECTOR  = '.yt-img-shadow';
const NAME_SELECTOR = '#video-title'
const LOCAL_STORAGE_KEY = 'videos';

const getVideosIds = (selector) => {
    const nodes = document.querySelectorAll(selector);
    const urls = [];

    if (!nodes) {
        return null;
    }

    nodes.forEach((node) => {
        const nameNode = node.querySelector(NAME_SELECTOR);
        if (nameNode) {
            urls.push(nameNode.href.split('=')[1]);
        }
    });
    return { urls };
}

window.addEventListener('load', () => {
    chrome.storage.sync.set({'videosIds': getVideosIds(VIDEO_CONTAINER_SELECTOR)});
}, false);
