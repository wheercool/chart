export function* rnd() {
  while (true) {
    yield Math.random()
  }
}

export function* range(a, b) {
  while (true) {
    yield a + Math.random() * (b - a);
  }
}

export const testCount = 50;
export const eps = 0.0000000001;
