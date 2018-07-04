import 'chai/register-expect';
import math, { add, reduce, div, mul, eq, lt, gt } from '../math';

describe('math', () => {
    describe('#add()', () => {
        it('should return 3 when 1 + 2', () => {
            expect(add(1, 2)).to.equal(3);
        });
        it('should return 0.003 when 0.001 + 0.002', () => {
            expect(add(0.001, 0.002)).to.equal(0.003);
        });
        it('should return 3.005 when 1.002 + 2.003(chain mode)', () => {
            expect(math(1.002).add(2.003).value()).to.equal(3.005);
        });
    });
    describe('#reduce()', () => {
        it('should return 1 when 3 - 2', () => {
            expect(reduce(3, 1)).to.equal(2);
        });
        it('should return 0.001 when 0.006 - 0.005', () => {
            expect(reduce(0.006, 0.005)).to.equal(0.001);
        });
        it('should return -1.006 when 1 - 2.006(chain mode)', () => {
            expect(math(1).reduce(2.006).value()).to.equal(-1.006);
        });
    });
    describe('#div()', () => {
        it('should return 2 when 4 / 2', () => {
            expect(div(4, 2)).to.equal(2);
        });
        it('should return 0.003 when 0.0006 / 0.2', () => {
            expect(div(.0006, .2)).to.equal(.003);
        });
        it('should return 0.3 when 0.06 / 0.2(chain mode)', () => {
            expect(math(.06).div(.2).value()).to.equal(.3);
        });
        it.skip('should throw error when denominator is zero', () => {
            assert.throw(div(4, 0));
        });
    });
    describe('#mul()', () => {
        it('should return 6 when 2 * 3', () => {
            expect(mul(2, 3)).to.equal(6);
        });
        it('should return 0.0000000006 when 0.002 * 0.003', () => {
            expect(mul(.002, .003)).to.equal(.000006);
        });
        it('should return 0.000006 when 0.002 * 0.003(chain mode)', () => {
            expect(math(.002).mul(.003).value()).to.equal(.000006);
        });
    });
    describe('#equal()', () => {
        it('should return true compare 2 and 2', () => {
            expect(eq(2, 2)).to.be.true;
        });
        it('should return true compare 0.002 and 0.002', () => {
            expect(eq(.002, .002)).to.be.true;
        });
        it('should return true compare 0.002 and 0.003', () => {
            expect(eq(.002, .003)).to.be.false;
        });
        it('should return true compare 0.002 and 0.002(chain mode)', () => {
            expect(math(.002).eq(.002)).to.be.true;
        });
        it('should return false compare 0.002 and 0.003(chain mode)', () => {
            expect(math(.002).eq(.003)).to.be.false;
        });
    });
    describe('#lt()', () => {
        it('expect 0.001 to be lower than 0.002', () => {
            expect(lt(.001, .002)).to.be.true;
        });
        it('expect 0.003 to be not lower than 0.002', () => {
            expect(lt(.003, .002)).to.be.false;
        });
        it('expect 0.003 to be not lower than 0.003', () => {
            expect(lt(.003, .003)).to.be.false;
        });
        it('should return true as 0.003 is lower than 0.004(chain mode)', () => {
            expect(math(.003).lt(.004)).to.be.true;
        });
        it('should return false as 0.003 is larger than 0.002(chain mode)', () => {
            expect(math(.003).lt(.002)).to.be.false;
        });
        it('should return false as 0.003 is equal to 0.003(chain mode)', () => {
            expect(math(.003).lt(.003)).to.be.false;
        });
    });
    describe('#gt()', () => {
        it('expect 0.002 to be larger than 0.001', () => {
            expect(gt(.002, .001)).to.be.true;
        });
        it('expect 0.002 to be not larger than 0.003', () => {
            expect(gt(.002, .003)).to.be.false;
        });
        it('expect 0.002 to be not larger than 0.002', () => {
            expect(gt(.002, .002)).to.be.false;
        });
        it('should return false as 0.003 is lower than 0.004(chain mode)', () => {
            expect(math(.003).gt(.004)).to.be.false;
        });
        it('should return true as 0.003 is larger than 0.002(chain mode)', () => {
            expect(math(.003).gt(.002)).to.be.true;
        });
        it('should return false as 0.003 is equal to 0.003(chain mode)', () => {
            expect(math(.003).gt(.003)).to.be.false;
        });
    });
});