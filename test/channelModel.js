import {
        makePoint, representingInterval,
        makeGap, makeGapBetween,
        closestLeft, closestRight,
        pointsInside, pointsBelongs,
        mergePoints} from '../client/model/channelModel'
import {makeInterval} from '../client/model/interval'

import {expect} from 'chai'
import wu, {zip} from 'wu'
import R from 'ramda'
import {rnd, range, testCount, eps} from './common'

describe('Channel Model', () => {

  describe('representingInterval', () => {

      describe('CASE: no gap inside interval', () => {
        it('should add closest points to interval', () => {
            const xs =   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                  points = xs.map( x => makePoint(x, 10)),
                  interval = makeInterval(4.5, 10.5);

            const actual =  representingInterval(interval, points)

            const expectedXs = [4, 5, 6, 7, 8, 9, 10, 11],
                  exptected =  expectedXs.map( x => makePoint(x, 10));
            expect(actual)
              .to.deep.equal(exptected)
        })


        it('should add only closest right point when interval is left alignment', () => {
          const xs =   [0, 1, 2, 3, 4, 5],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(0, 3.5);

          const actual =  representingInterval(interval, points)
          const expectedXs = [0, 1, 2, 3, 4],
                exptected = expectedXs.map( x => makePoint(x, 10));
          expect(actual)
            .to.deep.equal(exptected)
        })

        it('should add only closest left point when interval is right alignment', () => {
          const xs =   [0, 1, 2, 3, 4, 5],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(1.5, 5);

          const actual =  representingInterval(interval, points)
          const expectedXs = [1, 2, 3, 4, 5],
                exptected = expectedXs.map( x => makePoint(x, 10));
          expect(actual)
            .to.deep.equal(exptected)
        })

        it('should not add any point when interval is cover all points', () => {
          const xs =   [0, 1, 2, 3, 4, 5],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(0, 5);

          const actual =  representingInterval(interval, points)
          expect(actual)
            .to.deep.equal(points)
        })

        it('should add points when there is no points inside interval', () => {
          const xs =   [2, 6, 10, 14],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(7, 9);

          const actual =  representingInterval(interval, points)
          const expected = [6, 10].map(x => makePoint(x, 10));
          expect(actual)
            .to.deep.equal(expected)
        })

        it('should return 2 points when no points belong to interval', () => {
            const xs =   [2, 6, 10, 14],
                  points = xs.map( x => makePoint(x, 10)),
                  interval = makeInterval(7, 9);

            const actual =  representingInterval(interval, points).length;
            const expected = 2;
            expect(actual)
              .to.deep.equal(expected)
        })

        it('should return points and 2 more', () => {
          const xs =   [2, 6, 10, 14],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(4, 11);

          const actual =  representingInterval(interval, points).length;
          const expected = pointsBelongs(interval, points).length + 2;
          expect(actual)
            .to.deep.equal(expected)
        })

        it('should increase count of points by 1 when closestLeft = min of interval', () => {
          const closestLeft = 6,
                xs =  [2, closestLeft, 10, 14],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(closestLeft, 11);

          const actual =  representingInterval(interval, points).length;
          const expected = pointsBelongs(interval, points).length + 1;
          expect(actual)
            .to.deep.equal(expected)
        })


        it('should increase count of points by 1 when closestRight = max of interval', () => {
          const closestRight = 10,
                xs = [2, 6, closestRight, 14],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(4, closestRight);

          const actual =  representingInterval(interval, points).length;
          const expected = pointsBelongs(interval, points).length + 1;
          expect(actual)
            .to.deep.equal(expected)
        })

        it('should not increase count of points when interval min and max is closest points', () => {
          const closestLeft = 2,
                closestRight = 10,
                xs =   [closestLeft, 6, closestRight, 14],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(closestLeft, closestRight);

          const actual =  representingInterval(interval, points).lenght;
          const expected = actual;
          expect(actual)
            .to.deep.equal(expected)
        })

        it('should manage case when closestLeft point is null', () => {
          const xs =   [2, 6, 10, 14],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(1, 11),
                expected = points,
                actual = representingInterval(interval, points);
          expect(closestLeft(interval.min, points))
            .to.be.equal(null)

          expect(actual)
            .to.deep.equal(expected)

        })



          it('should manage case when closestRight point is null', () => {
            const xs =   [2, 6, 10, 14],
                  points = xs.map( x => makePoint(x, 10)),
                  interval = makeInterval(3, 15),
                  expected = points,
                  actual = representingInterval(interval, points);
            expect(closestRight(interval.max, points))
              .to.be.equal(null)

            expect(actual)
              .to.deep.equal(expected)

          })

          it('should manage case when both closestRight and closestLeft are null', () => {
            const xs =   [2, 6, 10, 14],
                  points = xs.map( x => makePoint(x, 10)),
                  interval = makeInterval(1, 15),
                  expected = points,
                  actual = representingInterval(interval, points);

            expect(closestLeft(interval.min, points))
              .to.be.equal(null)

            expect(closestRight(interval.max, points))
              .to.be.equal(null)

            expect(actual)
              .to.deep.equal(expected)

          })

        it('should manage case when points contain only one point', () => {
          const points = [makePoint(1, 10)],
                interval = makeInterval(0, 20),
                expected = [makePoint(1, 10)],
                actual = representingInterval(interval, points);

                expect(actual)
                  .to.deep.equal(expected)
        })

      })


      describe('CASE: gap inside interval', () => {

          it('should add 2 more points', () => {
            const points = [
                makePoint(0, 10),
                makePoint(1, 10),
                makeGapBetween(1, 2),
                makePoint(2, 10),
                makePoint(3, 10)
            ],
            interval = makeInterval(0.5, 2.5);
            const actual = representingInterval(interval, points),
                  expected = points;


            expect(actual)
              .to.deep.equal(expected)
          })

          it('should not add any point when interval convers points', () => {
            const points = [
                makePoint(0, 10),
                makePoint(1, 10),
                makeGapBetween(1, 2),
                makePoint(2, 10),
                makePoint(3, 10)
            ],
            interval = makeInterval(1, 2);
            const actual = representingInterval(interval, points),
                  expected =  [makePoint(1, 10),
                                makeGapBetween(1, 2),
                                makePoint(2, 10)];

            expect(actual)
              .to.deep.equal(expected)
          })

          it('should add 1 point when closesLeft = interval.min', () => {
            const closestPoint = makePoint(1, 10),
                points = [
                makePoint(0, 10),
                closestPoint,
                makeGapBetween(closestPoint.x, 2),
                makePoint(2, 10),
                makePoint(3, 10)
            ],
            interval = makeInterval(closestPoint.x, 1.7);
            const actual = representingInterval(interval, points),
                  expected =  [closestPoint,
                                makeGapBetween(closestPoint.x, 2),
                                makePoint(2, 10)];

            expect(actual)
              .to.deep.equal(expected)
          })


          it('should add 1 point when closesRight = interval.max', () => {
            const closestPoint = makePoint(2, 10),
                points = [
                makePoint(0, 10),
                makePoint(1, 10),
                makeGapBetween(1, closestPoint.x),
                closestPoint,
                makePoint(3, 10)
            ],
            interval = makeInterval(0.5, closestPoint.x);
            const actual = representingInterval(interval, points),
                  expected =  [ makePoint(0, 10),
                                makePoint(1, 10),
                                makeGapBetween(1, closestPoint.x),
                                closestPoint];

            expect(actual)
              .to.deep.equal(expected)
          })

          it('should not add any point when closest points are  interval max and min', () => {
            const closestLeftPoint = makePoint(0, 10),
                  closestRightPoint = makePoint(2, 10),
                  points = [
                    makePoint(-1, 10),
                    closestLeftPoint,
                    makeGapBetween(closestLeftPoint.x, closestRightPoint.x),
                    closestRightPoint,
                    makePoint(3, 10)
                  ],
                  interval = makeInterval(closestLeftPoint.x, closestRightPoint.x);
            const actual = representingInterval(interval, points),
                  expected =  [ closestLeftPoint,
                                makeGapBetween(closestLeftPoint.x, closestRightPoint.x),
                                closestRightPoint
                              ];

            expect(actual)
              .to.deep.equal(expected)
          })
      })


  })



  describe('closestLeft', () => {
    it('should return exact point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestLeft(1, points);
      expect(actual)
         .to.deep.equal(makePoint(1, 10))
    })

    it('should return closest point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestLeft(1.5, points);
      expect(actual)
         .to.deep.equal(makePoint(1, 10))
    })

    it('should return point with exact x coordinate', () => {
      const exactCoordinate = 4,
            xs =   [0, 1, 2, 3, exactCoordinate, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestLeft(exactCoordinate, points);
      expect(actual)
         .to.deep.equal(makePoint(exactCoordinate, 10))
    })

    it('should return first point when x is start', () => {
      const start = 0,
            xs =   [start, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestLeft(start, points);
      expect(actual)
         .to.deep.equal(makePoint(start, 10))
    })


    it('should return null if no any left point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestLeft(-1, points);
      expect(actual)
         .to.deep.equal(null)
    })

    it('should return null if points are empty', () => {
      const actual = closestLeft(-1, []);
      expect(actual)
         .to.deep.equal(null)
    })

  })


  describe('closestRight', () => {
    it('should return exact point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestRight(1, points);
      expect(actual)
         .to.deep.equal(makePoint(1, 10))
    })

    it('should return closest right point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestRight(1.5, points);
      expect(actual)
         .to.deep.equal(makePoint(2, 10))
    })

    it('should return last point when x is end', () => {
      const end = 5,
            xs =   [0, 1, 2, 3, 4, end],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestRight(end, points);
      expect(actual, `xs = ${points.length}`)
         .to.deep.equal(makePoint(end, 10))
    })

    it('should return point with exact x coordinate', () => {
      const exactCoordinate = 4,
            xs =   [0, 1, 2, 3, exactCoordinate, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestRight(exactCoordinate, points);
      expect(actual, `xs = ${points.length}`)
         .to.deep.equal(makePoint(exactCoordinate, 10))
    })

    it('should return null if no any right point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestRight(6, points);
      expect(actual)
         .to.deep.equal(null)
    })

    it('should return null if points are empty', () => {
      const actual = closestRight(-1, []);
      expect(actual)
         .to.deep.equal(null)
    })
  })

  describe('mergePoints', () => {
    it('should merge x sets', () => {
      const ax = [1, 2, 3, 4],
            bx = [1, 2.5, 3.2, 4, 5],
            a = ax.map(x => makePoint(x, 10)),
            b = bx.map(x => makePoint(x, 10)),
            mergedPoints = mergePoints(null, a, b);
      expect(mergedPoints.map(set => set[0]))
        .to.contains(1)
        .to.contains(2)
        .to.contains(2.5)
        .to.contains(3)
        .to.contains(3.2)
        .to.contains(4)
        .to.contains(5)
    })

    it('should fill emptyValue if x is not in result set', () => {
      const ax = [1],
            bx = [2],
            a = ax.map(x => makePoint(x, 10)),
            b = bx.map(x => makePoint(x, 20)),
            mergedPoints = mergePoints(null, a, b);
      const log = JSON.stringify(mergedPoints);
      expect(mergedPoints[0])
        .deep.equal([1, 10, null])

        expect(mergedPoints[1])
          .deep.equal([2, null,  20])
    })
  })
})
