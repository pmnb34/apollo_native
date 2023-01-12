import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { setTokenTime } from "./enum";
import { removeToken, setToken, userIdVar, tokenMethodVar, tokenVar } from "./store";
import { onError } from "@apollo/client/link/error";
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
      token_method: tokenMethodVar(),
    },
  };
});
const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

export const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

const REFRESH_TOKEN_MUTATION = gql`
  query RefreshToken($userId: String!, $token: String!, $method: String!) {
    refreshToken(id: $userId, token: $token, method: $method) {
      id
      message
      success
      token
      tokenTime
      method
    }
  }
`;

const mutation = async () => {
  const userId = userIdVar();
  const token = tokenVar();
  const method = tokenMethodVar();
  if (userId && token && method) {
    await client
      .mutate({
        mutation: REFRESH_TOKEN_MUTATION,
        variables: { userId, token, method },
      })
      .then(
        ({
          data: {
            refreshToken: { success, message, id, token, tokenTime, method },
          },
        }) => {
          console.log(
            success + "  -  " + message + "  -  " + id + "  -  " + token + "  -  " + tokenTime + "  -  " + method
          );
          if (success) {
            setToken(id, token, setTokenTime(tokenTime) as any, method);
          } else {
            removeToken();
            stopGetAccTokenInterval();
          }
        }
      );
  } else {
    stopGetAccTokenInterval();
  }
};

const TOKEN_INTERVAL = {
  fn: {},
};

let getAccTokenInterval = () => {
  TOKEN_INTERVAL.fn = setInterval(async () => {
    await mutation();
  }, 9000000);
};
let stopGetAccTokenInterval = () => {
  clearInterval(TOKEN_INTERVAL.fn as any);
};

export const getAccToken = async (tokenTime: string) => {
  const nowTime = Math.ceil(Date.now() / 1000);
  const gap = Number(tokenTime) - Number(nowTime);
  // const gap = Number(1672677960) - Number(nowTime);
  console.log(nowTime);
  console.log(gap);
  if (gap < 10800) {
    // 3시간 (10800 s) 기준 으로 2.5시간(9000000 ms) setInerval 설정
    mutation();
    getAccTokenInterval();
    // console.log("3시간보다 적음");
  } else {
    getAccTokenInterval();
    // console.log("3시간보다 많음");
  }
};
