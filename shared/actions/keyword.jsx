import axios from 'axios';

export const GET_KEYWORD = 'GET_KEYWORD';
export const GET_CORRELATIONINFO = 'GET_CORRELATIONINFO';
export const RESET_CORRELATIONINFO = 'RESET_CORRELATIONINFO';

export function getKeyword(keyword) {
  //add in the logic for getting  the return
  //from the db.getkeyword function (keyword and data)
  // in /api/ route then pass that as the payload
  // //this will require a redux-promise
  const url = '/api/keywordInfo';
  const request = axios.get(`${url}/${keyword}`);
  // const tempData = {Keyword: keyword,
  //             data: [{"Feb2014":0},{"Mar2014":1},{"Apr2014":2},{"May2014":3},{"Jun2014":4},{"Jul2014":5},{"Aug2014":6},{"Sep2014":7},{"Oct2014":8},{"Nov2014":9},{"Dec2014":10},{"Jan2015":11},{"Feb2015":12},{"Mar2015":13},{"Apr2015":14},{"May2015":15},{"Jun2015":16},{"Jul2015":17},{"Aug2015":18},{"Sep2015":19},{"Oct2015":20},{"Nov2015":21},{"Dec2015":22},{"Jan2016":23}]
  //           };
  return {
    type: GET_KEYWORD,
    payload: request
  };
};

export function getCorrelationInfo(keyword) {
  const url = '/api/correlationInfo';
  const request = axios.post(url,keyword);
  // const tempData = [{
  //   Keyword: 'AAPL',
  //   corr: .88,
  //   data: [{"Feb2014":0},{"Mar2014":1},{"Apr2014":2},{"May2014":3},{"Jun2014":4},{"Jul2014":5},{"Aug2014":6},{"Sep2014":7},{"Oct2014":8},{"Nov2014":9},{"Dec2014":10},{"Jan2015":11},{"Feb2015":12},{"Mar2015":13},{"Apr2015":14},{"May2015":15},{"Jun2015":16},{"Jul2015":17},{"Aug2015":18},{"Sep2015":19},{"Oct2015":20},{"Nov2015":21},{"Dec2015":22},{"Jan2016":23}]
  // }];
return {
    type: GET_CORRELATIONINFO,
    payload: request
  };
};

export function resetCorrelationinfo(){
  return {
    type:RESET_CORRELATIONINFO,
    payload: []
  }
}

export function getValidationInfo(keyword,listItem) {
  const data = {
    keyword: keyword,
    listItem: listItem
  };
  const url = '/api/validationInfo';
  const request = axios.post(url,data);

  return {
    type: GET_VALIDATIONINFO,
    payload: request
  };
};
