import { debug } from 'console';
import axios from '../../src';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch((e) => {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message);
  }
});

setTimeout(() => {
  source.cancel('Operation canceled by the user');

  setTimeout(() => {
    axios.post('/cancel/post', {a: 1}, {
      cancelToken: source.token,
    }).catch((e) => {
      if (axios.isCancel(e)) {
        console.log(e.message);
      }
    });
  }, 100);
}, 100);

let cancel: any;

axios.get('/cancel/get', {
  cancelToken: new CancelToken((c) => {
    cancel = c;
  })
}).catch((e) => {
  if (axios.isCancel(e)) {
    console.log(e.message);
  }
});

setTimeout(() => {
  cancel('request canceled');
}, 500);