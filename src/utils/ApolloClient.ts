import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import {LocalStorageWrapper, persistCache} from 'apollo3-cache-persist';
import {setContext} from '@apollo/client/link/context';

const cache = new InMemoryCache();

if (process.env.NEXT_PUBLIC_PERSIST_CACHE === 'true' && typeof window !== 'undefined') {
    persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage)
    }).then(() => {
        // Continue setting up Apollo Client as usual.
    });
}

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL
});

const authLink = setContext((_, {headers}) => {
    const localSettingsData = localStorage.getItem('token');
    const localSettings = localSettingsData ? JSON.parse(localSettingsData) : {};
    const token = localSettings?.state?.token;
    console.log('ApolloClient token:', token);
    if (token) {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
                clientHeader: 'Ngzs6kZr345Yr46HWQpt9AdY2UpUsi48LaQm3DB5fSCqUpM9aSd6z6MbGpqoRc7a'
            }
        };
    } else {
        return {
            headers: {
                ...headers,
                clientHeader: 'Ngzs6kZr345Yr46HWQpt9AdY2UpUsi48LaQm3DB5fSCqUpM9aSd6z6MbGpqoRc7a'
            }
        };
    }

});


export const getApolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    connectToDevTools: process.env.NEXT_PUBLIC_DEBUG === 'true'
});
