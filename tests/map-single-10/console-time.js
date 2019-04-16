const rxjs = require('rxjs');
const rxop = require('rxjs/operators');
const Single = require('rx-single');
const Maybe = require('rx-maybe');
const LObs = require('lite-observable');
const Zen = require('zen-observable');
const Most = require('most');
const Bacon = require('baconjs');


const omap = mapper => source => new LObs((o) => {
  const {
    subscribe, complete, error, next,
  } = o;
  source.sub({
    subscribe,
    next: x => next(mapper(x)),
    error,
    complete,
  });
});

const count = process.argv.slice(2)[0];

const newProcess = (name, test) => {
  console.time(name);
  for (let i = 0; i < count; i++) {
    test();
  }
  console.timeEnd(name);
};

newProcess('rxjs', () => {
  rxjs.of(1).pipe(
    rxop.map(x => x + x),
    rxop.map(x => x + x),
    rxop.map(x => x + x),
    rxop.map(x => x + x),
    rxop.map(x => x + x),
    rxop.map(x => x + x),
    rxop.map(x => x + x),
    rxop.map(x => x + x),
    rxop.map(x => x + x),
    rxop.map(x => x + x),
  ).subscribe(x => x);
});

newProcess('lite-observable', () => {
  LObs.create((e) => {
    e.next(1);
    e.complete();
  }).pipe(
    omap(x => x + x),
    omap(x => x + x),
    omap(x => x + x),
    omap(x => x + x),
    omap(x => x + x),
    omap(x => x + x),
    omap(x => x + x),
    omap(x => x + x),
    omap(x => x + x),
    omap(x => x + x),
  ).subscribe(x => x);
});

newProcess('rx-single', () => {
  Single.just(1)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .subscribe(x => x);
});

newProcess('rx-maybe', () => {
  Maybe.just(1)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .subscribe(x => x);
});

newProcess('zen-observable', () => {
  Zen.of(1)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .subscribe(x => x);
});

newProcess('most', () => {
  Most.of(1)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .subscribe(x => x);
});

newProcess('bacon', () => {
  Bacon.once(1)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .map(x => x + x)
    .onValue();
});
