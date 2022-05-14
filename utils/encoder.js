'use strict';

const Base62 =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-=+'.split('');

// will work only and exclusively for integers up to 6-bytes / 48-bits wide
// (realistically 32-bits / 4-bytes wide)
exports.encode = (n, pad = 0) => {
  const base = Base62.length;
  // the ratio of how many extra characters to expect vs bytes
  const ratio = Math.log(256) / Math.log(2) / (Math.log(base) / Math.log(2));
  //   console.log(ratio);
  pad = pad ?? Math.ceil(4 * ratio);
  //   console.log(pad);
  const register = [];
  let index;
  let exp = Math.floor(Math.log(n) / Math.log(base));
  // denomination
  let d;
  //   console.log(exp);

  while (exp >= 0) {
    d = Math.pow(base, exp);
    index = Math.floor(n / d);
    register.push(Base62[index]);
    n = n % d;
    // console.log('n', n);
    exp -= 1;
  }
  return register
    .join('')
    .padStart(pad, Base62[Math.floor(Math.random() * base)]);
};
