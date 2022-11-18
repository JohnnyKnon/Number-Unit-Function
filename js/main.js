import { DATA_OBJECT } from './test.js';
/** getData(dom, data, el) 데이터를 받는 함수
 * @param dom 도큐먼트 쿼리로 불러오는지 데이터인지 확인
 * @param data 데이터 배열,
 * @param el 데이터를 삽입할 엘리먼트 배열
 */
export function getData(dom, data, el) {
  /** 숫자 데이터 및 담는 엘리먼트 오브젝트
   * @key 상단 키 : 숫자 그룹 ex) star, viewer
   * @value data : 실제 데이터
   * @value el : 데이터를 담을 그릇
   */
  if (dom) {
    let getDomDataObject = {
      data: document.querySelectorAll(data),
      el: document.querySelectorAll(el),
    };
    return getDomDataObject;
  } else {
    let getDataObject = {
      data: data,
      el: el,
    };
    return getDataObject;
  }
}

/** Number Formatting */
// ======================================================
class NumberFormatting {
  constructor(num) {
    this.num = num;
  }
  /** GETTER */
  get num() {
    return this._num;
  }
  /** SETTER */
  set num(value) {
    if (isNaN(value)) {
      let deleteString = value.replace(',', '');
      let parsing = parseInt(deleteString);
      this._num = parsing;
      return this._num;
    } else {
      let parsing = parseInt(value);
      this._num = parsing;
      return this._num;
    }
  }
  /** 숫자 데이터를 단위로 포멧팅 */
  intToNumSymbol() {
    let suffixes = ['', 'K', 'M', 'B', 'T'];
    let suffixNum = Math.floor(('' + this._num).length / 3);
    let shortValue = parseFloat(
      (suffixNum != 0
        ? this._num / Math.pow(1000, suffixNum)
        : this._num
      ).toPrecision(2)
    );
    if (shortValue % 1 != 0) {
      shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
  }
}

/** NumberInputToElement 데이터 타입 [ ex viewer / star ] 를 엘리먼트에 삽입하는 클래스
 * @constructor type - 타입을 받아서  그 타입에 해당하는 데이터, 엘리먼트 호출
 */
// ======================================================
class NumberInputToElement {
  constructor(type) {
    this.type = type;
  }
  /** 포멧팅 후 값을 엘리먼트에 넣는 함수 */
  numFormatFunc() {
    let dataArr = [];
    for (let count of this.type.data) {
      // 실제 데이터로 받은 값
      let REAL_NUM = count.innerText;
      /** REAL NUM을 클래스에 입력 후 getter setter */
      let STAR = new NumberFormatting(REAL_NUM);
      // setter 에서 필터링된 실제 데이터 값을 함수에 대입 시켜서 값을 계산
      dataArr.push(STAR.intToNumSymbol());
    }
    // 데이터를 span에 넣기
    for (let i = 0; i < this.type.el.length; i++) {
      this.type.el[i].innerText = dataArr[i];
    }
  }
}

// 받은 오브젝트 내부에 값을 for in loop을 이용하여 객체내 전 데이터를 계산
for (const Type in DATA_OBJECT) {
  NumberFormatInput(DATA_OBJECT[Type]);
}

/** Number Input to element 클래스를 위한 함수
 * @param type 타입을 넣어서 엘리먼트에 넣는 함수
 */
// ======================================================
function NumberFormatInput(type) {
  const numberEelement = new NumberInputToElement(type);
  return numberEelement.numFormatFunc();
}
