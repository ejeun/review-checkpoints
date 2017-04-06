'use strict';
/* global HashTable */
// Data Structures Review Week Assessment

// NOTE: this suite requires a working Association List.

describe('A hash table', function () {

  var hashTable;
  beforeEach(function () {
    hashTable = new HashTable();
  });

  it('has association lists in each bucket', function () {
    for (var i = 0; i < hashTable.buckets.length; i++) {
      expect(hashTable.buckets[i] instanceof Alist).toBe(true);
    }
  });

  it('uses a hashing function to add key-val to the correct alist', function () {
    hashTable.set('name', 'Harry Potter');
    // `hash('name')` returns 17
    expect(hashTable.buckets[17].head.key).toBe('name');
    expect(hashTable.buckets[17].head.value).toBe('Harry Potter');
  });

  it('can add multiple items', function () {
    hashTable.set('house', 'Gryffindor').set('glasses', true);
    expect(hashTable.buckets[ 8].head.value).toBe('Gryffindor');
    expect(hashTable.buckets[14].head.value).toBe(true);
  });

  it('handles collision by adding to the list', function () {
    hashTable.set('node', 'Pearl St.').set('done', 'Hanover Sq.');
    // 'node' and 'done' both `hash()` to the number 2!
    var head = hashTable.buckets[2].head;
    expect(head.value).toBe('Hanover Sq.');
    expect(head.next.value).toBe('Pearl St.');
  });

  it('returns items based on their key', function () {
    hashTable.set('status', 200).set('message', 'success');
    expect(hashTable.get('status')).toBe(200);
    expect(hashTable.get('message')).toBe('success');
  });

  it('returns the most recent value for a given key', function () {
    // both 'year' and 'discount' hash to 13
    hashTable.set('year', 'MMXV').set('year', 2015).set('discount', true);
    expect(hashTable.get('year')).toBe(2015);
  });

});
