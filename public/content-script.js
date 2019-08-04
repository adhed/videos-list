const VIDEO_CONTAINER_SELECTOR  = '.ytd-grid-renderer';
const THUMBNAIL_SELECTOR  = '.yt-img-shadow';
const NAME_SELECTOR = '#video-title'

const getVideosIds = (selector) => {
    const nodes = document.querySelectorAll(selector);
    const urls = [];

    if (!nodes) {
        return null;
    }

    return nodes.forEach((node) => {
        const nameNode = node.querySelector(NAME_SELECTOR);
        urls.push(nameNode.href.split('=')[1]);
    });
}

window.addEventListener('load', () => {
    chrome.runtime.sendMessage({
        type: 'VIDEOS_LIST_PLUGIN_DATA', 
        foundVideos: getVideosIds(VIDEO_CONTAINER_SELECTOR)
    });
    alert('send!', getVideosIds(VIDEO_CONTAINER_SELECTOR));
}, false);
