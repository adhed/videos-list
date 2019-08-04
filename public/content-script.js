const VIDEO_CONTAINER_SELECTOR  = '.ytd-grid-renderer';
const THUMBNAIL_SELECTOR  = '.yt-img-shadow';
const NAME_SELECTOR = '#video-title'

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
    return urls;
}

window.addEventListener('load', () => {
    chrome.runtime.sendMessage({
        type: 'VIDEOS_LIST_PLUGIN_DATA', 
        foundVideos: getVideosIds(VIDEO_CONTAINER_SELECTOR)
    });
}, false);
