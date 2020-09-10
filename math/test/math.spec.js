import { expect } from 'chai';
import { add, reduce, div, mul, modulo } from '../dist/';

describe('math', () => {
    describe('#add()', () => {
        it('should return 3 when 1 + 2', () => {
            expect(add(1, 2)).to.equal(3);
        });
        it('should return 0.003 when 0.001 + 0.002', () => {
            expect(add(0.001, 0.002)).to.equal(0.003);
        });
    });
    describe('#reduce()', () => {
        it('should return 1 when 3 - 2', () => {
            expect(reduce(3, 1)).to.equal(2);
        });
        it('should return 0.001 when 0.006 - 0.005', () => {
            expect(reduce(0.006, 0.005)).to.equal(0.001);
        });
    });
    describe('#div()', () => {
        it('should return 2 when 4 / 2', () => {
            expect(div(4, 2)).to.equal(2);
        });
        it('should return 0.003 when 0.0006 / 0.2', () => {
            expect(div(.0006, .2)).to.equal(.003);
        });
    });
    describe('#mul()', () => {
        it('should return 6 when 2 * 3', () => {
            expect(mul(2, 3)).to.equal(6);
        });
        it('should return 0.0000000006 when 0.002 * 0.003', () => {
            expect(mul(.002, .003)).to.equal(.000006);
        });
    });
    describe("#modulo()", () => {
      it('module(4, 2) = 0', () => {
        expect(modulo(4, 2)).to.equal(0);
      });
      it('module(5, 2) = 0', () => {
        expect(modulo(5, 2)).to.equal(1);
      });
      it('module(4.9, 0.1) = 0', () => {
        expect(modulo(4.9, 0.1)).to.equal(0);
      });
      it('module(4.9, 0.01) = 0', () => {
        expect(modulo(4.9, 0.01)).to.equal(0);
      });
    });
});
