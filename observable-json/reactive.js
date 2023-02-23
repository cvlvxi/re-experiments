import {
  sleep,
  random,
  coinFlip,
} from './utils.js';
import {
  createObservableJson,
  write,
  read,
  printObservation,
} from './observable-json.js';
import {
  render,
} from './rendering.js';

export function reactiveExample() {
  let model = createObservableJson({
    mode: 'dog',
    dog: {
      emoji: '🐶',
      value: 0,
    },
    cow: {
      emoji: '🐄',
      value: 0,
    },
  });

  setInterval(() => {
    write(model.mode, coinFlip() ? 'dog' : 'cow');
  }, 3100);

  setInterval(() => {
    write(model.dog.value, 20 + random(20));
  }, 700);

  setInterval(() => {
    write(model.cow.value, random(100));
  }, 600);

  setInterval(() => {
    debug.textContent = printObservation(model);
  }, 100);

  render(app, () => {
    return {
      style: () => {
        const mode = read(model.mode);
        const value = read(model[mode].value);
        const result = {
          height: '40px',
        };
        if (mode === 'dog') {
          result.fontSize = `${value}px`;
        } else {
          result.fontSize = '20px';
          result.marginLeft = `${value}px`;
        }
        return result;
      },
      textContent: () => read(model[read(model.mode)].emoji),
    };
  });
}
