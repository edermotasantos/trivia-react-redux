import md5 from 'crypto-js/md5';

const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const URL_TRIVIA = 'https://opentdb.com/api.php?amount=5&token=';
const URL_GRAVATAR = 'https://www.gravatar.com/avatar/';

export async function getToken() {
  return fetch(URL_TOKEN)
    .then((response) => response.json());
}

export async function getQuestions(token) {
  return fetch(`${URL_TRIVIA}${token}`)
    .then((response) => response.json());
}

export function getGravatar(email) {
  const emailHash = md5(email).toString();
  const gravatarLink = `${URL_GRAVATAR}${emailHash}`;
  return gravatarLink;
}
