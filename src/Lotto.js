const MAX_NUMBER = 45;
const MIN_NUMBER = 1;

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.validateNumbers(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  }

  validateNumbers(numbers) {
    numbers.forEach((number) => {
      if (Number.isNaN(Number(number))) {
        throw new Error('[ERROR] 숫자를 입력해주세요.');
      }

      if (Number(number) < MIN_NUMBER || Number(number) > MAX_NUMBER) {
        throw new Error('[ERROR] 1부터 45 사이의 숫자를 입력해주세요.');
      }

      if (numbers.indexOf(number) !== numbers.lastIndexOf(number)) {
        throw new Error('[ERROR] 중복된 숫자가 있는지 확인해주세요.');
      }
    });
  }

  validateBonusNumber(bonusNumber) {
    if (bonusNumber === 0 || Number.isNaN(bonusNumber)) {
      throw new Error('[ERROR] 입력된 값을 확인해주세요.');
    }

    if (
      !Number.isInteger(bonusNumber) ||
      bonusNumber < MIN_NUMBER ||
      bonusNumber > MAX_NUMBER
    ) {
      throw new Error('[ERROR] 1부터 45 사이의 정수를 입력해주세요.');
    }
  }

  getWinningList(myLottoList, bonusNumber) {
    const list = {
      first: [],
      second: [],
      third: [],
      fourth: [],
      fifth: [],
    };

    myLottoList.forEach((lotto) => {
      let count = 0;

      this.#numbers.forEach((number) => {
        if (lotto.includes(Number(number))) {
          count += 1;
        }
      });

      if (count === 3) {
        list.fifth.push(lotto);
      }

      if (count === 4) {
        list.fourth.push(lotto);
      }

      if (count === 5) {
        if (lotto.includes(bonusNumber)) {
          list.second.push(lotto);
        } else {
          list.third.push(lotto);
        }
      }

      if (count === 6) {
        list.first.push(lotto);
      }
    });

    return list;
  }
}
export default Lotto;
