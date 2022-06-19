# shopify-demo
import data to shopify  store from csv/excel

### start
1.  config the .env at the project root folder with your shopify account info like
```
SHOP={dev store url}            # Your test store URL
API_KEY={api key}               # Your API key
API_SECRET_KEY={api secret key} # Your API secret key
SCOPES={scopes}                 # Your app's required scopes
HOST={your app's host}          # Your app's host, without the protocol prefix (in this case we used an `ngrok` tunnel to provide a secure connection to our localhost)
HOST_SCHEME={your app's URI scheme} # Either http or https. Note http is intended for local development with localhost.
```
2.  
```
yarn instal
yarn run build
yarn run start
```

3.  in browser open http://localhost:3000/login
4. in same browser open http://localhost:3000/product





