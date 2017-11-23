export default {
  dosomething(thing) {
    thing.finish_percent += 30;
    if (thing.finish_percent >= 100) {
      thing.done = true;
    }

    let stat = thing.done ? 'done' : 'unfinished';
    let re = `this is C, complete 30%, now ${thing.finish_percent}% percent, ${stat}.`;
    console.log(re);
    document.body.insertAdjacentHTML('beforeend', `<p>${re}</p>`);
  }
};

