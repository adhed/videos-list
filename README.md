
## About this app

It' s simple, my first, Chrome's extension to load list of available YouTube's videos from the homepage and checking it's details. When we're clicking on an element from the list, then the video's description and a thumbnail will be loaded.

## How to run

1) Clone the repository
2) Run 'yarn' in the console
3) Run 'yarn build' in the console
4) Go to chrome://extensions/ and turn on the Developer Mode
5) Go to https://www.youtube.com
6) Open the extension's popup (V icon)
7) List of videos will be loaded.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## How it's done

1) /public/content-script.js contains a code which has an access to the website's DOM (YouTube) and it's looking for video's elements and fetching those ids and names. Currently it's using Chrome's storage to set these data and give an access to them to our React's app. Videos elements are updated on load and scroll events, but it could be improved to be more effecient.

2) /public/background.js contains a code which is working in the background and it enables and disables our extension to allow to use it only on YouTube service.

3) /src/ contains our React's app which controls our extension. It's looking for videos elements in the Chrome's storage and when it's available - list of those videos is rendered. When we're clicking on an element from the list, then we're using YouTube's API to fetch video's details. It was required to get video's description because it's not available on the homepage. We're also displaying a thumbnail from details.
