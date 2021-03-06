/* eslint-env jest */

import Vector from '../Vector';

const sqrt5 = Math.sqrt(5);

test('Vector.normalized', () => {
    let v = new Vector(10, 0);
    expect(v.normalized.almostEquals(new Vector(1, 0))).toBeTruthy();
    v = new Vector(0, 10);
    expect(v.normalized.almostEquals(new Vector(0, 1))).toBeTruthy();
    v = new Vector(5, 5);
    expect(v.normalized.almostEquals(new Vector(Math.SQRT1_2, Math.SQRT1_2))).toBeTruthy();
    v = new Vector(-5, -5);
    expect(v.normalized.almostEquals(new Vector(-Math.SQRT1_2, -Math.SQRT1_2))).toBeTruthy();
    v = new Vector(-5, 5);
    expect(v.normalized.almostEquals(new Vector(-Math.SQRT1_2, Math.SQRT1_2))).toBeTruthy();
    v = new Vector(-5, 10);
    expect(v.normalized.almostEquals(new Vector(-1 / sqrt5, 2 / sqrt5))).toBeTruthy();
});

test('Vector.normal', () => {
    let v = new Vector(0, 10);
    expect(v.normal(new Vector(1, 0)).almostEquals(new Vector(1, 0))).toBeTruthy();
    expect(v.normal(new Vector(-1, 0)).almostEquals(new Vector(-1, 0))).toBeTruthy();

    v = new Vector(10, 0);
    expect(v.normal(new Vector(0, 1)).almostEquals(new Vector(0, 1))).toBeTruthy();
    expect(v.normal(new Vector(0, -1)).almostEquals(new Vector(0, -1))).toBeTruthy();

    v = new Vector(0, -10);
    expect(v.normal(new Vector(1, 0)).almostEquals(new Vector(1, 0))).toBeTruthy();
    expect(v.normal(new Vector(-1, 0)).almostEquals(new Vector(-1, 0))).toBeTruthy();

    v = new Vector(10, 10);
    expect(v.normal(new Vector(0, 1)).almostEquals(new Vector(-Math.SQRT1_2, Math.SQRT1_2))).toBeTruthy();
    expect(v.normal(new Vector(-1, 0)).almostEquals(new Vector(-Math.SQRT1_2, Math.SQRT1_2))).toBeTruthy();
    expect(v.normal(new Vector(-20, 20)).almostEquals(new Vector(-Math.SQRT1_2, Math.SQRT1_2))).toBeTruthy();
    expect(v.normal(new Vector(0, -1)).almostEquals(new Vector(Math.SQRT1_2, -Math.SQRT1_2))).toBeTruthy();
    expect(v.normal(new Vector(1, 0)).almostEquals(new Vector(Math.SQRT1_2, -Math.SQRT1_2))).toBeTruthy();
    expect(v.normal(new Vector(20, -20)).almostEquals(new Vector(Math.SQRT1_2, -Math.SQRT1_2))).toBeTruthy();

    v = new Vector(10, -10);
    expect(v.normal(new Vector(0, 1)).almostEquals(new Vector(Math.SQRT1_2, Math.SQRT1_2))).toBeTruthy();
    expect(v.normal(new Vector(1, 0)).almostEquals(new Vector(Math.SQRT1_2, Math.SQRT1_2))).toBeTruthy();
    expect(v.normal(new Vector(20, 20)).almostEquals(new Vector(Math.SQRT1_2, Math.SQRT1_2))).toBeTruthy();
    expect(v.normal(new Vector(0, -1)).almostEquals(new Vector(-Math.SQRT1_2, -Math.SQRT1_2))).toBeTruthy();
    expect(v.normal(new Vector(-1, 0)).almostEquals(new Vector(-Math.SQRT1_2, -Math.SQRT1_2))).toBeTruthy();
    expect(v.normal(new Vector(-20, -20)).almostEquals(new Vector(-Math.SQRT1_2, -Math.SQRT1_2))).toBeTruthy();

    v = new Vector(-5, -10);
    expect(v.normal(new Vector(0, 1)).almostEquals(new Vector(-2 / sqrt5, 1 / sqrt5))).toBeTruthy();
    expect(v.normal(new Vector(1, 0)).almostEquals(new Vector(2 / sqrt5, -1 / sqrt5))).toBeTruthy();
    expect(v.normal(new Vector(20, 19)).almostEquals(new Vector(2 / sqrt5, -1 / sqrt5))).toBeTruthy();
    expect(v.normal(new Vector(0, -1)).almostEquals(new Vector(2 / sqrt5, -1 / sqrt5))).toBeTruthy();
    expect(v.normal(new Vector(-1, 0)).almostEquals(new Vector(-2 / sqrt5, 1 / sqrt5))).toBeTruthy();
    expect(v.normal(new Vector(-18, -20)).almostEquals(new Vector(-2 / sqrt5, 1 / sqrt5))).toBeTruthy();
});

test('Vector.cross', () => {
    // Deriving the tests from geometric interpretation.

    const numDecimals = 5;

    let v1 = new Vector(1, 0);
    let v2 = new Vector(0, 1);
    expect(v1.cross(v2)).toBeCloseTo(1, numDecimals);
    expect(v2.cross(v1)).toBeCloseTo(-1, numDecimals);

    v1 = new Vector(-1, 0);
    v2 = new Vector(0, 1);
    expect(v1.cross(v2)).toBeCloseTo(-1, numDecimals);
    expect(v2.cross(v1)).toBeCloseTo(1, numDecimals);

    v1 = new Vector(2, 0);
    v2 = new Vector(0, 3);
    expect(v1.cross(v2)).toBeCloseTo(6, numDecimals);
    expect(v2.cross(v1)).toBeCloseTo(-6, numDecimals);

    v1 = new Vector(1, -1);
    v2 = new Vector(1, 1);
    // sqrt(2) * sqrt(2)
    expect(v1.cross(v2)).toBeCloseTo(2, numDecimals);
    expect(v2.cross(v1)).toBeCloseTo(-2, numDecimals);

    v1 = new Vector(-1, -1);
    v2 = new Vector(1, 1);
    expect(v1.cross(v2)).toBeCloseTo(0, numDecimals);
    expect(v2.cross(v1)).toBeCloseTo(0, numDecimals);
});
