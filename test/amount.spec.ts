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
    it("should return 1.23亿 from toText(123456789)", () => {
      expect(toText(123456789)).to.equal("1.23亿");
    });
    it("decimal test, should return 1.2346亿 from toText(123456789, 4)", () => {
      expect(toText(123456789, 4)).to.equal("1.2346亿");
    });
    it("unit test, should return 1.2346亿手 from toText(123456789, 4, { unit: '手'})", () => {
      expect(toText(123456789, 4, { unit: "手" })).to.equal("1.2346亿手");
    });
    it("default level test, should return 1234 from toText(1234)", () => {
      expect(toText(1234)).to.equal("1234");
    });
    it("default level test, should return 1234.00 from toText(1234, 2, { strip: false })", () => {
      expect(toText(1234, 2, { strip: false })).to.equal("1234.00");
    });
    it("level test, should return 10万 from toText(100000)", () => {
      expect(toText(100000)).to.equal("10万");
    });
    it("level test, should return 1.2345万张 from toText(12345, 4, {unit:'张', level:10000})", () => {
      expect(toText(12345, 4, { unit: "张", level: 10000 })).to.equal(
        "1.2345万张"
      );
    });
    it("level test, should return 12345.0000张 from toText(12345, 4, {unit:'张', level:10000, strip: false})", () => {
      expect(
        toText(12345, 4, { unit: "张", level: 100000, strip: false })
      ).to.equal("12345.0000张");
    });
    it("level test, should return 1.23万张 from toText(123456, 2, {unit:'张', level:100000})", () => {
      expect(toText(123456, 2, { unit: "张", level: 100000 })).to.equal(
        "12.35万张"
      );
    });
    it("negative number test, should return -1.23万张 from toText(-123456, 2, {unit:'张', level:100000})", () => {
      expect(toText(-123456, 2, { unit: "张", level: 100000 })).to.equal(
        "-12.35万张"
      );
    });
  });
  describe("#toCurrency()", () => {
    it('toCurrency(1234)=1,234', () => {
      expect(toCurrency(1234)).to.equal("1,234");
    });
    it('toCurrency(1234, 2, false)=1,234.00, strip tail zero test', () => {
      expect(toCurrency(1234, 2, false)).to.equal("1,234.00");
    });
    it('toCurrency(1234, 3, false)=1,234.000, decimal test', () => {
      expect(toCurrency(1234, 3, false)).to.equal("1,234.000");
    });
    it('toCurrency(123)=123, low number test', () => {
      expect(toCurrency(123)).to.equal("123");
    });
    it('toCurrency(--)=--, exception test', () => {
      expect(toCurrency("--")).to.equal("--");
    });
  });
});
