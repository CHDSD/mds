import B from './moduleB';

export default {
  dosomething(thing) {
    B.dosomething(thing);

    thing.finish_percent += 50;    
    if (thing.finish_percent >= 100) {
      thing.done = true;
    }

    let stat = thing.done ? 'done' : 'unfinished';
    let re = `this is A, complete 50%, now ${thing.finish_percent}% percent, ${stat}.`;
    console.log(re);
    document.body.insertAdjacentHTML('beforeend', `<p>${re}</p>`);
  }
};