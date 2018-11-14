import { expect, assert } from 'chai';
import { yuan2fen, fen2yuan, toText, toCurrency } from '../src/amount';

describe('amount', () => {
  describe('#yuan2fen()', () => {
    it('should return "312" transforming 3.12 yuan to fen', () => {
      expect(yuan2fen(3.12)).to.equal('312.00');
    });
    it('should return "312" transforming "3.12"(string) yuan to fen', () => {
      expect(yuan2fen('3.12')).to.equal('312.00');
    });
  });
  describe('#fen2yuan()', () => {
    it('should return "3.12" transforming 312 fen to yuan', () => {
      expect(fen2yuan(312)).to.equal('3.12');
    });
    it('should return "3.12" transforming "312"(string) fen to yuan', () => {
      expect(fen2yuan('312')).to.equal('3.12');
    });
  });
  describe('#toText()', () => {
    it('should return 1.23亿 from toText(123456789)', () => {
      expect(toText(123456789)).to.equal('1.23亿');
    });
    it('decimal test, should return 1.2346亿 from toText(123456789, 4)', () => {
      expect(toText(123456789, 4)).to.equal('1.2346亿');
    });
    it('unit test, should return 1.2346亿手 from toText(123456789, 4, \'手\')', () => {
      expect(toText(123456789, 4, '手')).to.equal('1.2346亿手');
    });
    it('default level test, should return 1234 from toText(1234)', () => {
      expect(toText(1234)).to.equal('1234.00');
    });
    it('level test, should return 12345.0000张 from toText(12345, 4, \'张\', 10000)', () => {
      expect(toText(12345, 4, '张', 100000)).to.equal('12345.0000张');
    });
    it('level test, should return 1.23万张 from toText(123456, 2, \'张\', 100000)', () => {
      expect(toText(123456, 2, '张', 100000)).to.equal('12.35万张');
    });
    it('negative number test, should return -1.23万张 from toText(-123456, 2, \'张\', 100000)', () => {
      expect(toText(-123456, 2, '张', 100000)).to.equal('-12.35万张');
    });
  });
  describe('#toCurrency()', () => {
    it('should return "1,234.00" from toCurrency(1234)', () => {
      expect(toCurrency(1234)).to.equal('1,234.00');
    });
    it('low number test, should return "123.00" from toCurrency(123)', () => {
      expect(toCurrency(123)).to.equal('123.00');
    });
    it('decimal test, should return "1,234,567.000" from toCurrency(1234567, 3)', () => {
      expect(toCurrency(1234567, 3)).to.equal('1,234,567.000');
    });
    it('decimal test, should return "1,234,567" from toCurrency(1234567, 0)', () => {
      expect(toCurrency(1234567, 0)).to.equal('1,234,567');
    });
  });
});
