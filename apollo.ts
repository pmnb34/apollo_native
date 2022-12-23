import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { setTokenTime } from "./enum";
import { removeToken, setToken, userIdVar, tokenMethodVar, tokenVar } from "./store";

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
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

const REFRESH_TOKEN_MUTATION = gql`
  query RefreshToken($refreshTokenId: String!, $token: String!, $method: String!) {
    refreshToken(id: $refreshTokenId, token: $token, method: $method) {
      id
      message
      success
      token
      tokenTime
      method
    }
  }
`;
export const mutation = async () => {
  const id = userIdVar();
  const token = tokenVar();
  const method = tokenMethodVar();
  if (id && token && method) {
    await client
      .mutate({
        mutation: REFRESH_TOKEN_MUTATION,
        variables: { refreshTokenId: id, token, method: method },
      })
      .then(
        ({
          data: {
            refreshToken: { success, id, token, tokenTime, method },
          },
        }) => {
          if (success) {
            console.log("토큰 재발행 성공");
            setToken(id, token, setTokenTime(tokenTime) as any, method);
          } else {
            console.log("토큰 재발행 실패");
            removeToken();
            stopGetAccTokenInterval();
          }
        }
      );
  } else {
    console.log("로그아웃으로 인터벌 취소");
    stopGetAccTokenInterval();
  }
};

const GV = {
  fn: {},
};

export let getAccTokenInterval = () => {
  GV.fn = setInterval(async () => {
    console.log("인터벌 시작");
    await mutation();
  }, 4000);
};
export let stopGetAccTokenInterval = () => {
  console.log("인터벌 종료");
  clearInterval(GV.fn as any);
};

export const getAccToken = async (id: string, token: string, tokenTime: string, method: string) => {
  const nowTime = Math.ceil(Date.now() / 1000);
  const gap = Number(tokenTime) - Number(nowTime); //앱 켰을때, 로그인 방금 했을때 갭
  console.log(gap);
  if (gap < 10800) {
    // 3시간 (10800 s) 기준 으로 2.5시간(9000000 ms) setInerval 설정
    console.log("3시간보다 작게 남았다");
    mutation();
    getAccTokenInterval();
    // mutation(id, token, method);

    // const getAccTokenInterval = setInterval(() => {
    //   mutation(id, token, method);
    // }, 9000000);
    // const getAccTokenInterval = setInterval(()=>mutation(id,token, method), 110분);
  } else {
    console.log("3시간보다 많이 남았다");
    // getAccTokenInterval;
    getAccTokenInterval();
    // getAccTokenInterval = getAccTokenInterval(id, token, method)
    // const getAccTokenInterval = setInterval(()=>mutation(id,token, method), 110분);
  }
  ////////////////////
  // clearInterval(tokenInterval);
  // token 시간 체크 (2시간)
  // tokenTime 저장시 현재시간 + 2시간
  // 현재 시간과 tokenTime 차이가 30분일때 작동된다면  만료 110분전 일때 true
  // setInterval 은 110분 으로 반복 설정 시 30분 남겨두고 토근 가져옴,
  // if (now.Data() - tokentime < 110분 ) {
  // 토큰 새로 발금함
  // Query 작동
  // return accToken || null
  //if(null) {
  // 리프레시 토큰도 만료되어서 로그아웃
  //}
  //if(accToken) {
  //setInterval 110분 설정
  //}
  //} else {
  // 아직 시간 넉넉함 (잠깐 딴진했네?)
  // 그대로 setInterval(110분 설정)
  //}
  //
  // access token expired 확인
};
