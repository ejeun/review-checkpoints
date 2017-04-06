'use strict';
/*
Fill in your own code where you see "your code here".
You can insert new lines at those locations, but you
will not need to edit the lines above and below them.
*/

//-----------------------------------------
// Stacks

function Stack () {
  // your code here
  this.stack = [];
}

Stack.prototype.add = function (item) {
  // your code here
  this.stack.push(item); 
  return this; // for chaining, do not edit
};

Stack.prototype.remove = function () {
  return this.stack.pop();
};

//-----------------------------------------
// Queues

// EXTRA CREDIT: remove the `pending` line in the spec to attempt.

function Queue () {
  // your code here
  this.q = []
  this.head = 0
  this.tail = 0
}

Queue.prototype.add = function (item) {
  // your code here
  this.q[this.tail] = item
  this.tail++
  
  return this; // for chaining, do not edit
};

Queue.prototype.remove = function () {
  // your code here
  if (this.tail > this.head) { 
    let first = this.q[this.head]
    this.head++
    return first
  }
};

//-----------------------------------------
// Linked lists

// EXTRA CREDIT: remove the `pending` line in the spec to attempt.

function LinkedList () {
  this.head = this.tail = null;
}

function ListNode (item, prev, next) {
  this.item = item;
  this.next = next || null;
  this.prev = prev || null;
}

LinkedList.prototype.addToTail = function (item) {
  // your code here
  let node = new ListNode(item, this.tail)
  if (!this.head) this.head = node
  else this.tail.next = node
  this.tail = node
  return this; // for chaining, do not edit
};

LinkedList.prototype.removeFromTail = function () {
  // your code here
  if (this.tail) {
    let removed = this.tail
    this.tail = removed.prev
    if (this.tail) this.tail.next = null
    else this.tail = this.head = null
    return removed.item
  }
};

LinkedList.prototype.forEach = function (iterator) {
  // your code here
  let crawler = this.head
  while (crawler) {
    iterator(crawler.item)
    crawler = crawler.next
  }

};

//-----------------------------------------
// Association lists

function Alist () {
  // your code here
  this.head = null;
  this.tail = null;

}

function AlistNode (key, value, next) {
  this.key = key;
  this.value = value;
  this.next = next;
}

Alist.prototype.set = function (key, value) {
  // your code here
  const node = new AlistNode(key, value, this.head);
  if (!this.head) this.tail = node;
  this.head = node;

  return this; // for chaining; do not edit
};

Alist.prototype.get = function (key) {
  // your code here
  let crawler = this.head
  while (crawler) {
    if (crawler.key === key) return crawler.value
    crawler = crawler.next
  }

};


//-----------------------------------------
// Hash tables

function hash (key) {
  var hashedKey = 0;
  for (var i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i);
  }
  return hashedKey % 20;
}

function HashTable () {
  this.buckets = Array(20);
  // your code here
  for (let i=0; i<20; i++){
    this.buckets[i] = new Alist();
  }
}

HashTable.prototype.set = function (key, value) {
  // your code here. DO NOT simply set a prop. on an obj., that is cheating.
  let index = hash(key);
  this.buckets[index].set(key, value);
  return this; // for chaining, do not edit
};

HashTable.prototype.get = function (key) {
  // your code here. DO NOT simply get a prop. from an obj., that is cheating.
  let index = hash(key);
  return this.buckets[index].get(key);

};

//-----------------------------------------
// Binary search trees

function BinarySearchTree (val) {
  // your code here
  this.value = val;
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.insert = function (val) {
  // your code here
  if (this.value > val) {
    if (this.left) this.left.insert(val);
    else this.left = new BinarySearchTree(val);
  }
  else {
    if (this.right) this.right.insert(val);
    else this.right = new BinarySearchTree(val);
  }

  return this; // for chaining, do not edit
};

BinarySearchTree.prototype.min = function () {
  // your code here
  let crawler = this;
  while (crawler.left) {
    crawler = crawler.left;
  }
  return crawler.value;

};

BinarySearchTree.prototype.max = function () {
  // your code here
  let crawler = this;
  while (crawler.right) {
    crawler = crawler.right;
  }
  return crawler.value;
};

BinarySearchTree.prototype.contains = function (val) {
  // your code here
  if (this.value === val) return true;
  else if (this.value > val && this.left ) return this.left.contains(val);
  else if (val > this.value && this.right ) return this.right.contains(val);
  else return false;
};

BinarySearchTree.prototype.traverse = function (iterator) {
  // your code here
  if (this.left) this.left.traverse(iterator);
  iterator(this.value);
  if (this.right) this.right.traverse(iterator);

};
