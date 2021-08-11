import md5 from 'crypto-js/md5';

const URL_GRAVATAR = 'https://www.gravatar.com/avatar/';
const URL = 'https://opentdb.com/api_token.php?command=request';

export const fethApi = async () => {
  const response = await fetch(URL);
  const responseJson = await response.json();
  const data = responseJson.token;
  localStorage.token = data;
  const reqPergunta = await fetch(`https://opentdb.com/api.php?amount=5&token=${data}`);
  const responsePergunta = await reqPergunta.json();
  const result = responsePergunta.results;
  return result;
};

export function getGravatar(email) {
  const emailHash = md5(email).toString();
  const gravatarLink = `${URL_GRAVATAR}${emailHash}`;
  return gravatarLink;
}
