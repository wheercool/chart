import {offsetToPercent, getFactor, getScrollerOffset
        } from '../client/model/lineChartModel'
import {expect} from 'chai'
import wu, {zip} from 'wu'
import R from 'ramda'
import {rnd, range, testCount, eps} from './common'



describe('lineChart model', () => {
  describe('offsetPercent(offset, totalDuration)', () => {

    const expectOffsetToPercent = (offset, totalDuration) => expect(offsetToPercent(offset, totalDuration),
      `offset = ${offset} totalDuration = ${totalDuration}`);


    it('should return 0 if offset = 0', function() {
      wu(rnd())
        .take(testCount)
        .forEach(offset => expectOffsetToPercent(0, offset)
                  .to.equal(0))
    })

    it('should return 1 if offset = totalDuration', () => {
      const totalDuration = Math.random();
      wu(rnd())
        .take(testCount)
        .filter(offset => offset != 0)
        .forEach(offset =>
            expectOffsetToPercent(offset, offset)
            .to.equal(1))
    })

    it('should convert  n * totalDuration offset to n, for n in [0..1]', () => {
      const n = Math.random();
      const totalDuration = Math.random();
      wu(zip(rnd(), rnd()))
        .take(testCount)
        .filter(([n, totalDuration]) => totalDuration != 0)
        .forEach(([n, totalDuration]) =>
            expect(offsetToPercent(totalDuration * n, totalDuration),
                `n = ${n} totalDuration = ${totalDuration}`)
            .to.be.closeTo(n,eps))
    })


    it('should return 0 if totalDuration = 0', () => {
      wu(rnd())
        .take(testCount)
        .forEach(offset => expectOffsetToPercent(offset, 0)
                  .to.equal(0))
    })
  })



  describe('getFactor(value, total)', () => {
    const expectGetFactor = (value, total) =>
        expect(getFactor(value, total),
        `value = ${value} total = ${total}`);

    it('should return 1 if value = total', () => {
      wu(rnd())
        .take(testCount)
        .filter(value => value != 0)
        .forEach(value =>
                  expectGetFactor(value, value)
              .to.equal(1))
    })

    it('should return n if total = n * value', () => {
      wu(zip(rnd(), rnd()))
        .map(([n, value]) => [n, value * 100])
        .take(testCount)
        .forEach(([n, value]) =>
          expect(getFactor(value, value * n), `n = ${n} value = ${value}`)
          .to.be.closeTo(n,eps)
      )
    })


    it('should return 0 if total == 0', () => {
      wu(rnd())
        .take(testCount)
        .forEach(value => expect(getFactor(value, 0))
                                .to.be.equal(0));
    })

    it('should return 0 if duration = 0', () => {
      wu(rnd())
        .take(testCount)
        .forEach(total => expect(getFactor(0, total))
                                .to.be.equal(0));
    })
  })


  describe('getScrollerOffset(value, minValue, maxValue, width)', () => {
    const expectGetScrollerOffset = (value, minValue, maxValue, width) =>
      expect(getScrollerOffset(value, minValue, maxValue, width),
    `value = ${value} minValue = ${minValue} maxValue = ${maxValue} width =${width}`);

    it('should return 0 if value = minValue', () => {
      wu(
        zip(rnd(), rnd(), rnd())
      )
        .filter(([value, maxValue, width]) => maxValue != 0 && width != 0)
        .take(testCount)
        .forEach(([value, maxValue, width]) => expectGetScrollerOffset(value, value, maxValue, width)
          .to.be.equal(0))
    })

    it('should return width if value = maxValue', () => {
      wu(
        zip(rnd(), rnd(), rnd())
      )
        .filter(([value, minValue, width]) => minValue != 0 && width != 0)
        .take(testCount)
        .forEach(([value, minValue, width]) => expectGetScrollerOffset(value, minValue, value, width)
          .to.be.closeTo(width, eps))
    })

    it('should return width/n if value = minValue + 1/n * (maxValue - minValue)', () => {
      wu(
        zip(rnd(), rnd(), rnd(), rnd())
      )
        .filter(([n, minValue, maxValue, width]) => n != 0 && maxValue != 0 && minValue != 0 && width != 0)
        .take(testCount)
        .forEach(([n, minValue, maxValue, width]) =>
            expect(getScrollerOffset(minValue + 1 / n * (maxValue - minValue), minValue, maxValue, width),
          `n = ${n} minValue = ${minValue} maxValue = ${maxValue} width = ${width}`)
              .to.be.closeTo(width / n, eps))
    })

  });



});
