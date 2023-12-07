# YouLoader
Web application for users who need to download videos from YouTube. Just you path YouTube video link and select the quality you need then the video start downloading.

## Technologies and Main NPM packages

### Node.js
  - ytdl-core: Attempts to download a video from the given url. Returns a ``` readable stream ```. options can have the following, in addition to any ``` getInfo() ``` option and ``` chooseFormat() ``` option.
  - Socket.io: To enables ``` real-time ``` bidirectional ``` event-based ``` communication. Used to tracks the progress of the video download rate.
  - CORS: Is a node.js package for providing a ``` Connect/Express ``` middleware that can be used to enable CORS with various options.

### React.js
  - Axios: Used to make requests from ``` clientSide ```.
  - Socket.io-client: Allows you to incorporate ``` real-time ``` features in your server-side applications. Used to show progress of downloading on the progress bar in client.
  - Important NPMs
    + react-icons
    + react-dotenv

## How to use

  #### 1 - Install server side dependencies
  ``` 
  npm install
```
  ##### Run server side 
  ``` 
  npm start
```
  ###### Note: .env file is required with server-url -> SERVER_BASE_URL= ---
  #### 2 - Install client side dependencies
  ```
  cd client
  npm install
  ```
  ##### Run client side 
  ``` 
  npm start
  ```
## Deploy
You can use <a href="https://render.com/">Render</a> to deploy your full application client&server
- Deployment link: <a href="https://youloader-client.onrender.com/">https://youloader-client.onrender.com/</a>

![YouLoaderApp](https://github.com/SheriefMohamed/YouLoader/assets/78177060/006bdb17-3cec-4a38-91ea-38e5396c33f9)
