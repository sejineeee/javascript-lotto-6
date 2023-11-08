import { MissionUtils } from '@woowacourse/mission-utils';
import App from '../src/App';

describe('로또 클래스 테스트', () => {
  beforeEach(() => {});

  test.each([NaN, 0, 7900])(
    '구매 금액이 숫자가 아니거나 0 또는 1000원 단위가 아니면 예외가 발생한다.',
    (input) => {
      const app = new App();
      expect(() => {
        app.validateAskPurchaseAmount(input);
      }).toThrow('[ERROR]');
    }
  );

  test('createMyLottoList', () => {
    const app = new App();
    const purchaseAmount = 8000;

    const Lotto = jest.fn().mockImplementation(() => ({
      getNumbers: () => [1, 2, 3, 4, 5, 6],
    }));

    app.createLottoNumbers = jest.fn().mockReturnValue([1, 2, 3, 4, 5, 6]);

    const myLottoList = app.createMyLottoList(purchaseAmount);

    expect(myLottoList.length).toBe(8);

    myLottoList.forEach((lotto) => {
      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  test('구매 개수와 당첨결과를 받아 총 수익률을 반환한다.', () => {
    const app = new App([1, 2, 3, 4, 5, 6]);

    const purchaseCount = 8;
    const winningResult = {
      first: [],
      second: [],
      third: [],
      fourth: [],
      fifth: [[1, 2, 3, 4, 5, 6]],
    };

    const result = app.getLottoROI(purchaseCount, winningResult);

    expect(result).toBe(62.5);
  });
});
