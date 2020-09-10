import { expect, assert } from "chai";
import { yuan2fen, fen2yuan, toText, toCurrency } from "../src/amount";

describe("amount", () => {
  describe("#yuan2fen()", () => {
    it('should return "312" transforming 3.12 yuan to fen', () => {
      expect(yuan2fen(3.12)).to.equal("312.00");
    });
    it('should return "312" transforming "3.12"(string) yuan to fen', () => {
      expect(yuan2fen("3.12")).to.equal("312.00");
    });
  });
  describe("#fen2yuan()", () => {
    it('should return "3.12" transforming 312 fen to yuan', () => {
      expect(fen2yuan(312)).to.equal("3.12");
    });
    it('should return "3.12" transforming "312"(string) fen to yuan', () => {
      expect(fen2yuan("312")).to.equal("3.12");
    });
  });
  describe("#toText()", () => {
    it('toText(123456789)=1.23亿', () => {
      expect(toText(123456789)).to.eq('1.23亿');
    });
    it('toText(12345)=1.23万', () => {
      expect(toText(12345)).to.eq('1.23万');
    });
    it('toText(12345, 2, { baseline: 100000 })=12345.00', () => {
      expect(toText(12345, 2, { baseline: 100000 })).to.eq('12345.00');
    });
    it('toText(123456, 2, { baseline: 100000 })=12.35万', () => {
      expect(toText(123456, 2, { baseline: 100000 })).to.eq('12.35万');
    });
    it('toText(123446789, 0)=1亿', () => {
      expect(toText(123446789, 0)).to.eq('1亿');
    });
    it('toText(123446789, 3)=1.234亿', () => {
      expect(toText(123446789, 3)).to.eq('1.234亿');
    });
    it('toText(123446789, 4)=1.2345亿', () => {
      expect(toText(123446789, 4)).to.eq('1.2345亿');
    });
    it('toText(12345, 2, { unit: \'手\' })=1.23万手', () => {
      expect(toText(12345, 2, { unit: '手' })).to.eq('1.23万手');
    });
    it('toText(100000)=1.23万张', () => {
      expect(toText(12345, 2, { unit: '张' })).to.eq('1.23万张');
    });
    it('toText(100000)=10.00万', () => {
      expect(toText(100000)).to.eq('10.00万');
    });
    it('toText(100000, 2, { strip: true })=10万', () => {
      expect(toText(100000, 2, { strip: true })).to.eq('10万');
    });
    it('toText(101000, 3)=10.100万', () => {
      expect(toText(101000, 3)).to.eq('10.100万');
    });
    it('toText(101000, 3, { strip: true })=10.1万', () => {
      expect(toText(101000, 3, { strip: true })).to.eq('10.1万');
    });
    it("toText(-123456, 2, {unit:'张', level:100000})=-1.23万张, 负数测试", () => {
      expect(toText(-123456, 2, { unit: "张", baseline: 100000 })).to.equal(
        "-12.35万张"
      );
    });
  });
  describe("#toCurrency()", () => {
    it('toCurrency(1234)=1,234.00', () => {
      expect(toCurrency(1234)).to.equal("1,234.00");
    });
    it('toCurrency(1234, 3)=1,234.000', () => {
      expect(toCurrency(1234, 3)).to.equal("1,234.000");
    });
    it('toCurrency(1234.1, 3)=1,234.100', () => {
      expect(toCurrency(1234.1, 3)).to.equal("1,234.100");
    });
    it('toCurrency(12345, 3)=12,345.000', () => {
      expect(toCurrency(12345, 3)).to.equal("12,345.000");
    });
    it('toCurrency(12345.618, 1)=12,345.6', () => {
      expect(toCurrency(12345.618, 1)).to.equal("12,345.6");
    });
    it('toCurrency(12345.618, 2)=12,345.62', () => {
      expect(toCurrency(12345.618, 2)).to.equal("12,345.62");
    });
    it('toCurrency(12345, 3, true)=12,345', () => {
      expect(toCurrency(12345, 3, true)).to.equal("12,345");
    });
    it('toCurrency(12345.1, 3, true)=12,345.1', () => {
      expect(toCurrency(12345.1, 3, true)).to.equal("12,345.1");
    });
    it('toCurrency(’--‘)=--, 异常数字测试', () => {
      expect(toCurrency("--")).to.equal("--");
    });
  });
});
