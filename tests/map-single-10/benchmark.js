const Benchmark = require('benchmark');
const { of } = require('rxjs');
const { map } = require('rxjs/operators');
const Single = require('rx-single');
const Maybe = require('rx-maybe');
const Observable = require('lite-observable');
const Zen = require('zen-observable');
const Most = require('most');
const Bacon = require('baconjs');


const omap = mapper => source => new Observable((o) => {
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

const suite = new Benchmark.Suite();

// add tests
suite.add('rx-js', () => {
  of(1).pipe(
    map(x => x + x),
    map(x => x + x),
    map(x => x + x),
    map(x => x + x),
    map(x => x + x),
    map(x => x + x),
    map(x => x + x),
    map(x => x + x),
    map(x => x + x),
    map(x => x + x),
  ).subscribe(x => x);
})
  .add('lite-observable', () => {
    Observable.create((e) => {
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
  })
  .add('rx-single', () => {
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
  })
  .add('rx-maybe', () => {
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
  })
  .add('zen-observable', () => {
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
  })
  .add('most', () => {
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
      .forEach(x => x);
  })
  .add('bacon', () => {
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
  })
// add listeners
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
// run async
  .run({ async: true });
