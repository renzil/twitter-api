require('dotenv').config()
const express = require('express');
const { TwitterApi } = require('twitter-api-v2');

const app = express();
const port = 3000;

const oauth_token_map = {};

app.get('/', async (req, res) => {
    const client = new TwitterApi({ appKey: process.env.CONSUMER_KEY, appSecret: process.env.CONSUMER_SECRET });
    const authLink = await client.generateAuthLink(process.env.CALLBACK_URL, { linkMode: 'authorize' });
    oauth_token_map[authLink.oauth_token] = authLink.oauth_token_secret;
    res.redirect(authLink.url);
})

app.get('/redirect-twitter', (req, res) => {
    // Extract tokens from query string
    const { oauth_token, oauth_verifier } = req.query;

    if (!oauth_token || !oauth_verifier) {
        return res.status(400).send('You denied the app or your session expired!');
    }

    // Get the saved oauth_token_secret from oauth_token_map
    const oauth_token_secret = oauth_token_map[oauth_token];

    if (!oauth_token_secret) {
        return res.status(400).send('You denied the app or your session expired!');
    }

    // Obtain the persistent tokens
    // Create a client from temporary tokens
    const client = new TwitterApi({
        appKey: process.env.CONSUMER_KEY,
        appSecret: process.env.CONSUMER_SECRET,
        accessToken: oauth_token,
        accessSecret: oauth_token_secret,
    });

    client.login(oauth_verifier)
        .then(async ({ client: loggedClient, accessToken, accessSecret }) => {
            // loggedClient is an authenticated client in behalf of some user

            const user = await loggedClient.v2.me();
            res.send(`Hello ${user['data']['name']}!`);
            // Store accessToken & accessSecret somewhere
        })
        .catch(() => res.status(403).send('Invalid verifier or access tokens!'));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})