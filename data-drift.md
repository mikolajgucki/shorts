<!-- #data-drift #data #drift -->

# Data drift

Data drift is change in distribution of a value. For example, if the distribution of the histogram of a value suddenly changes from day to day, then it might be caused by an issue.

# Links

- [Data drift](https://www.evidentlyai.com/ml-in-production/data-drift)
- [PSI](https://arize.com/blog-course/population-stability-index-psi/)
- [Jensen-Shannon divergence](https://datascientest.com/en/jensen-shannon-divergence-everything-you-need-to-know-about-this-ml-model)

# Code

```js
function normalize(values) {
  let total = 0;
  values.forEach(value => total += value);
  return values.map(value => value / total);
}

// calculates Kullback-Leibler divergence
function calcKLDivergence(p, q) {
  if (p.length !== q.length) {
    throw new Error('Cannot calculate divergence - different array lengths');
  }
  const length = p.length;

  let divergence = 0;
  for (let index = 0; index < length; index++) {
    const pv = p[index];
    const qv = q[index];
    if (qv === 0 || pv === 0) {
      continue;
    }
    divergence += pv * Math.log(pv / qv);
  }
  return divergence;
}

// calculates Jensen-Shannon divergence
function calcJSDivergence(p, q) {
  if (p.length !== q.length) {
    throw new Error('Cannot calculate divergence - different array lengths');
  }
  const length = p.length;

// calculate mixture
  const m = [];
  for (let index = 0; index < length; index++) {
    m[index] = 0.5 * (p[index] + q[index]);
  }

  return 0.5 * calcKLDivergence(p, m) + 0.5 * calcKLDivergence(q, m);
}

// calculates Population Stability Index
function calcPSI(p, q) {
  if (p.length !== q.length) {
    throw new Error('Cannot calculate PSI - different array lengths');
  }
  const length = p.length;

  let psi = 0;
  for (let index = 0; index < length; index++) {
    const pv = p[index];
    const qv = q[index];
    if (qv === 0 || pv === 0) {
      continue;
    }
    psi += (pv - qv) / 100 * Math.log(pv / qv);
  }
  return psi;
}

// console.log(calcJSDivergence(
//   [8,9,8,13,11,4,21,8,18],
//   [10,0,13,12,12,9,23,9,12],
// ));

// const p = normalize([1,1,1]);
// const q = normalize([0,9,1]);
// console.log(calcJSDivergence(p,q));
// console.log(calcJSDivergence(q,p));

// console.log(calcPSI(
//   [10,5,8,12,12,9,23,9,12],
//   [8,9,8,13,11,4,21,8,18],
// ));
```