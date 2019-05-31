import $ from 'jquery';
const BASE_URL = `https://books-by-suyashkale.herokuapp.com/APIs`;
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNiIsImlhdCI6MTU1NjUyOTg2N30.o-bB1kPspMVeEq96sPcgbhGzNCW7TeZJxSi4-VzITBc';
export default ({ type, contentType, dataType, url, data, postUrl }) => {

  url = BASE_URL + url;

  if (type === 'POST' || type === 'PUT') {
    if (!data) { data = {}; }
    data.token = TOKEN;
  } else if (type === 'GET') { // GET
    if (postUrl && postUrl !== undefined) {
      url = url + `?token=${TOKEN}` + postUrl;
    } else {
      url = url + `?token=${TOKEN}`;
    }
  } else if (type === 'DELETE') {//Deleting
    url = url + postUrl + `?&token=${TOKEN}`;
  }

  let ajax = $.ajax({
    type: (type || 'GET'),
    contentType: (contentType || 'application/json'),
    dataType: (dataType || 'json'),
    url: url,
    data: (data ? JSON.stringify(data) : undefined)
  });

  ajax.then(({ m }) => {
    this.setState({ message: m, show1: !this.state.show1 })
  })

  // ajax.then(({ m }) => {
  //   if (m && m.length) {
  //     alert(m.join(', '));
  //     // <SucessMessage m/>
  //   }
  // });

  return ajax;
};