import C from './moduleC';

export default {
  dosomething(thing) {
    C.dosomething(thing);

    thing.finish_percent += 20;    
    if (thing.finish_percent >= 100) {
      thing.done = true;
    }

    let stat = thing.done ? 'done' : 'unfinished';
    let re = `this is B, complete 20%, now ${thing.finish_percent}% percent, ${stat}.`;
    console.log(re);
    document.body.insertAdjacentHTML('beforeend', `<p>${re}</p>`);
  }
};
