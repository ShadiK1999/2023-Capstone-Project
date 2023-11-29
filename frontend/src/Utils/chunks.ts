/**
 * Takes in an array and splits it into chunks of n limit
 * @param arr input array
 * @param n limit per chunk
 */
export function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}
