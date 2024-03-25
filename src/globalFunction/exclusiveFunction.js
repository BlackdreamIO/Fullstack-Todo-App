
/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {Number} val The initial value
 * @param {Number} min The lower boundary
 * @param {Number} max The upper boundary
 * @returns {Number} A number in the range (min, max)
 */

export default function MathClamp (val, min, max) {
    const clamp = Math.min(Math.max(val, min), max)
    return clamp;
}