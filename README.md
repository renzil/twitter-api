# twitter-api
Playing around with Twitter API.

Currently this implements a simple oauth authentication server to get user access/secret tokens. 

# Steps

1. Install all dependencies

```bash
npm install
```

2. In a new terminal, start an ngrok https local tunnel. This should be kept running indefinitely.

```bash
npm run ngrok
```

3. Once the ngrok https tunnel is created, you need to manually whitelist "<NGROK_HTTPS_TUNNEL_URL>/redirect-twitter" as the Callback URI / Redirect URL in Twitter developer portal. If you do not own the developer credentials, you will need to ask the owner to do this step for you.

4. Rename .env.template to .env

```bash
mv .env.template .env
```

5. Add the consumer API and secret keys in .env file. Also add the ngrok https url as CALLBACK_URL.

6. Start the node express server. Note that this is run using nodemon, so any changes to index.js will relaunch the server.

```bash
npm run start
```

7. Navigate to the http://localhost:3000 in a browser to initiate the oauth flow. The app will redirect back once you login using Twitter login credentials and should print your name.
