# twitter-api
Playing around with Twitter API.

Currently this implements a simple oauth authentication server to get user access/secret tokens. 

# Steps

1. Install all dependencies

```bash
npm install
```

2. Rename .env.template to .env

```bash
mv .env.template .env
```

3. Add the consumer API and secret keys in the .env file. Add http://localhost:3000/twitter-redirect as the Callback URI / Redirect URL in your Twitter developer account.

4. Start the node express server. Note that this is run using nodemon, so any changes to index.js will relaunch the server.

```bash
npm run start
```

5. Navigate to the http://localhost:3000 in a browser to initiate the oauth flow. The app will redirect back once you login using Twitter login credentials and should print your name.
