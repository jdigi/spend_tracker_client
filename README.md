# Spend Tracker

## How To Run

Create the file `project/server/config.env` with your Atlas URI and the server port:

```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/
PORT=5050
⚠️ Step not needed for this testing repo. private .env included for testing. Please do not share.
```

Start server:

```
cd project/server
npm install
npm start
```

Start Web server

```
cd project/client
npm install
npm run dev
```
