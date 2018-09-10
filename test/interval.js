import {
    makeInterval, intervalLength,
    moveInterval, belongsInterval,
    insideInterval,
    zoomInInterval, zoomOutInterval,
    intervalCenter, embraceIntervals,
    intervalPointAtPercent} from '../client/model/interval'

import {expect} from 'chai'
import wu, {zip} from 'wu'
import R from 'ramda'
import {rnd, range, testCount, eps} from './common'


describe('Interval', () => {
    const intervals = () => wu(
                              zip(rnd(), rnd())
                            )
                        .map(([minValue, length]) => ({min: minValue, max: minValue + length}))
                        .take(testCount);

  describe('makeInterval', () => {
    it('should construct interval', () => {
      expect(makeInterval(0, 10))
        .to.deep.equal(makeInterval(0, 10))
    })

  })
  describe('intervalLength', () => {
    it('should calculate intervalLength', () => {
      expect(intervalLength({min: 0, max: 10}))
        .to.be.equal(10);
      expect(intervalLength({min: -10, max: 0}))
        .to.be.equal(10);
      expect(intervalLength({min: -10, max: 10}))
        .to.be.equal(20);
    })

    it('should calculate 0 length', () => {
      wu(rnd())
        .take(testCount)
        .forEach(min => {
          expect(intervalLength({min, max: min}))
            .to.be.equal(0)
        })
    })
  });

    describe('moveInterval', () => {
      it('should fit points', () => {
        expect(moveInterval({min: 0, max: 10}, 10))
          .to.deep.equal({
            min: 10,
            max: 20
          });

        expect(moveInterval({min: 10, max: 20}, -10))
          .to.deep.equal({
            min: 0,
            max: 10
          });
      })

      it('should keep lenght of interval', () => {
        zip(intervals(), rnd())
          .forEach(([interval, offset]) => {
            expect(intervalLength(
                      moveInterval(interval, offset)
                    ))
              .to.be.closeTo(intervalLength(interval),eps)
          })
      })
    })

    describe('zoomInInterval', () => {
      it('should fit exact points', () => {
        expect(zoomInInterval({min: 0, max: 1}))
          .to.deep.equal({
            min: 0.25,
            max: 0.75
          })

        expect(zoomInInterval({min: -2, max: 2}))
          .to.deep.equal({
            min: -1,
            max: 1
          })
      })

      it('should decrease length of interval in 0.5 times', () => {
          intervals()
          .forEach(interval =>
              expect(intervalLength(zoomInInterval(interval)))
                .to.be.closeTo(0.5 * intervalLength(interval), eps)
          )
      })

      it('should keep interval center', () => {
        intervals()
          .forEach(interval => {
            expect(R.pipe(zoomInInterval, intervalCenter)(interval))
              .to.be.closeTo(intervalCenter(interval), eps)
          })
      })
    })

    describe('zoomOutInterval', () => {
      it('should fit points', () => {
        expect(zoomOutInterval({min:-1, max: 1}))
          .to.deep.equal({
            min: -2,
            max: 2
        })

        expect(zoomOutInterval({min: -2, max: 2}))
          .to.deep.equal({
            min: -4,
            max: 4
          })
      })

      it('should increase lenght in 2 times', () => {
        intervals()
            .forEach(interval => {
            expect(intervalLength(zoomOutInterval(interval)))
              .to.be.closeTo(2 * intervalLength(interval),eps)
          })
      })

      it('should keep interval center', () => {
        intervals()
          .forEach(interval => {
            expect(R.pipe(zoomOutInterval, intervalCenter)(interval))
              .to.be.closeTo(intervalCenter(interval), eps)
          })
      })
    })

    describe('intervalCenter', () => {
      it('should fit points', () => {
        expect(intervalCenter({min: -10, max: 10}))
          .to.be.equal(0)

        expect(intervalCenter({min: 0, max: 20}))
          .to.be.equal(10)
      })
    })
    describe('zoomInInterval/zoomOutInterval', () => {
      it('should keep lenght after zoomIn then zoomOut', () => {
        intervals()
          .forEach(interval => {
            expect(R.pipe(zoomInInterval, zoomOutInterval, intervalLength)(interval))
              .to.be.closeTo(intervalLength(interval), eps)
          })

      })


      it('should keep lenght after zoomOut then zoomIn', () => {
        intervals()
          .forEach(interval => {
            expect(R.pipe(zoomOutInterval, zoomInInterval, intervalLength)(interval))
              .to.be.closeTo(intervalLength(interval),eps)
          })

      })
    })

    describe('embraceIntervals', () => {
      it('should make interval with min point to be either a.min or b.min', () => {
          zip(intervals(), intervals())
            .forEach(([a, b]) => {
              const embraceInterval = embraceIntervals(a, b);
              expect(embraceInterval.min)
                .to.be.equal(Math.min(a.min, b.min))
            })
      })

      it('should make interval with max point to be either b.max or a.max', () => {
        zip(intervals(), intervals())
          .forEach(([a, b]) => {
            const embraceInterval = embraceIntervals(a, b);
            expect(embraceInterval.max)
              .to.be.equal(Math.max(a.max, b.max))
          })
      })
    })

    describe('belongsInterval', () => {
      it('should fit points', () => {
        const interval = makeInterval(0, 10)
        expect(belongsInterval(interval, 4))
          .to.be.true
      })


      it('should return true for min of interval', () => {
        intervals()
          .forEach(interval => {
            expect(belongsInterval(interval, interval.min))
              .to.be.true
          })
      })

      it('should return true for max of interval', () => {
        intervals()
          .forEach(interval => {
            expect(belongsInterval(interval, interval.max))
              .to.be.true
          })
      })

      it('should return true for center of interval', () => {
        intervals()
          .forEach(interval => {
            expect(belongsInterval(interval, intervalCenter(interval)))
              .to.be.true
          })
      })
    })

    describe('insideInterval', () => {
      it('should fit points', () => {
        const interval = makeInterval(0, 10)
        expect(insideInterval(interval, 4))
          .to.be.true
      })


      it('should return false for min of interval', () => {
        intervals()
          .forEach(interval => {
            expect(insideInterval(interval, interval.min))
              .to.be.false
          })
      })

      it('should return false for max of interval', () => {
        intervals()
          .forEach(interval => {
            expect(insideInterval(interval, interval.max))
              .to.be.false
          })
      })

      it('should return true for center of interval', () => {
        intervals()
          .forEach(interval => {
            expect(insideInterval(interval, intervalCenter(interval)))
              .to.be.true
          })
      })
    })

});
