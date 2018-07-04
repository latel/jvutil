import 'chai/register-expect';
import math, { add, reduce, div, mul, eq, lt, gt } from '../math';

describe('math', () => {
    describe('#add()', () => {
        it('should return 3 when 1 + 2', () => {
            expect(add(1, 2)).to.equal(3);
        });
        it('should return 0.3 when 0.1 + 0.2', () => {
            expect(add(0.1, 0.2)).to.equal(0.3);
        });
        it('should return 3.1 when 1.1 + 2(chain mode)', () => {
            expect(math(1.1).add(2).value()).to.equal(3.1);
        });
    });
    describe('#reduce()', () => {
        it('should return 1 when 3 - 2', () => {
            expect(reduce(3, 1)).to.equal(2);
        });
        it('should return 0.2 when 0.3 - 0.1', () => {
            expect(reduce(0.3, 0.1)).to.equal(0.2);
        });
        it('should return -1.1 when 1 - 2.1(chain mode)', () => {
            expect(math(1).reduce(2.1).value()).to.equal(-1.1);
        });
    });
    describe('#div()', () => {
        it('should return 2 when 4 / 2', () => {
            expect(div(4, 2)).to.equal(2);
        });
        it('should return 0.3 when 0.06 / 0.2', () => {
            expect(div(.06, .2)).to.equal(.3);
        });
        it.skip('should throw error when denominator is zero', () => {
            assert.throw(div(4, 0));
        });
        it('should return 0.3 when 0.06 / 0.2(chain mode)', () => {
            expect(math(.06).div(.2).value()).to.equal(.3);
        });
    });
    describe('#mul()', () => {
        it('should return 6 when 2 * 3', () => {
            expect(mul(2, 3)).to.equal(6);
        });
        it('should return 0.06 when 0.2 * 0.3', () => {
            expect(mul(.2, .3)).to.equal(.06);
        });
        it('should return 0.06 when 0.2 * 0.3(chain mode)', () => {
            expect(math(.2).mul(.3).value()).to.equal(.06);
        });
    });
    describe('#equal()', () => {
        it('should return true compare 2 and 2', () => {
            expect(eq(2, 2)).to.be.true;
        });
        it('should return true compare 0.2 and 0.2', () => {
            expect(eq(.2, .2)).to.be.true;
        });
        it('should return true compare 0.2 and 0.3', () => {
            expect(eq(.2, .3)).to.be.false;
        });
        it('should return true compare 0.2 and 0.2(chain mode)', () => {
            expect(math(.2).eq(.2)).to.be.true;
        });
        it('should return false compare 0.2 and 0.3(chain mode)', () => {
            expect(math(.2).eq(.3)).to.be.false;
        });
    });
    describe('#lt()', () => {
        it('expect 0.1 to be lower than 0.2', () => {
            expect(lt(.1, .2)).to.be.true;
        });
        it('expect 0.3 to be not lower than 0.2', () => {
            expect(lt(.3, .2)).to.be.false;
        });
        it('expect 0.3 to be not lower than 0.3', () => {
            expect(lt(.3, .3)).to.be.false;
        });
        it('should return true as 0.3 is lower than 0.4(chain mode)', () => {
            expect(math(.3).lt(.4)).to.be.true;
        });
        it('should return false as 0.3 is larger than 0.2(chain mode)', () => {
            expect(math(.3).lt(.2)).to.be.false;
        });
        it('should return false as 0.3 is equal to 0.3(chain mode)', () => {
            expect(math(.3).lt(.3)).to.be.false;
        });
    });
    describe('#gt()', () => {
        it('expect 0.2 to be larger than 0.1', () => {
            expect(gt(.2, .1)).to.be.true;
        });
        it('expect 0.2 to be not larger than 0.3', () => {
            expect(gt(.2, .3)).to.be.false;
        });
        it('expect 0.2 to be not larger than 0.2', () => {
            expect(gt(.2, .2)).to.be.false;
        });
        it('should return false as 0.3 is lower than 0.4(chain mode)', () => {
            expect(math(.3).gt(.4)).to.be.false;
        });
        it('should return true as 0.3 is larger than 0.2(chain mode)', () => {
            expect(math(.3).gt(.2)).to.be.true;
        });
        it('should return false as 0.3 is equal to 0.3(chain mode)', () => {
            expect(math(.3).gt(.3)).to.be.false;
        });
    });
});