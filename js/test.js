import { getData } from './main.js';

/** 데이터 오브젝트
 * @key 타입을 명시
 */
export const DATA_OBJECT = {
  star: getData(true, '.star_hidden_cnt', '.star_cnt'),
  viewer: getData(true, '.view_hidden_cnt', '.view_cnt'),
};
