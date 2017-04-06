'use strict';
/* global LinkedList */
// Data Structures Review Week Assessment

describe('A doubly-linked list', function () {

//  pending('This is an extra-credit suite. Remove this line to try it.');

  var list, uniqueObj = { id: 789 };
  beforeEach(function () {
    list = new LinkedList();
  });

  it('can add to the tail', function () {
    list.addToTail(uniqueObj);
    expect(list.head).toBe(list.tail);
    expect(list.tail).toEqual(jasmine.objectContaining({
      item: uniqueObj,
      next: null,
      prev: null
    }));
  });

  it('can add two items', function () {
    list.addToTail('first').addToTail('second');
    expect(list.head).toEqual(jasmine.objectContaining({
      item: 'first',
      next: list.tail,
      prev: null
    }));
    expect(list.tail).toEqual(jasmine.objectContaining({
      item: 'second',
      next: null,
      prev: list.head
    }));
  });

  it('can add multiple items', function () {
    list.addToTail(1).addToTail(2).addToTail(3);
    expect(list.head.prev).toBe(null);
    expect(list.tail.next).toBe(null);
    expect(list.head.item).toBe(1);
    expect(list.head.next.item).toBe(2);
    expect(list.head.next.next.item).toBe(3);
    expect(list.tail).toBe(list.head.next.next);
    expect(list.tail.prev).toBe(list.head.next);
    expect(list.tail.prev.prev).toBe(list.head);
  });

  it('can remove items cleanly', function () {
    list.addToTail(500).addToTail(404).addToTail(200);
    expect(list.removeFromTail()).toBe(200);
    expect(list.tail.next).toBe(null);
    expect(list.removeFromTail()).toBe(404);
    expect(list.tail.next).toBe(null);
    expect(list.removeFromTail()).toBe(500);
    expect(list.head).toBe(null);
    expect(list.removeFromTail()).toBe(undefined);
  });

  it('can call a function on each node item', function () {
    list.addToTail('Gandalf')
        .addToTail('Dumbledore')
        .addToTail('Merlin');
    var initials = [];
    list.forEach(function (item) {
      initials.push(item[0]);
    });
    // this is the main test...
    expect(initials).toEqual(['G', 'D', 'M']);
    // ...but also, don't mutate your list!
    expect(list.head.item).toBe('Gandalf');
    expect(list.head.next.item).toBe('Dumbledore');
    expect(list.head.next.next.item).toBe('Merlin');
  });

});
