'use strict';
/* global BinarySearchTree */
// Data Structures Review Week Assessment

/* You are encouraged to implement these methods using recursion. For extra
credit, you may also want to try implementing them without recursion, though
an iterative in-order traversal of a tree is not entirely straightforward. */

describe('A binary search tree', function () {

  var tree;
  beforeEach(function () {
    tree = new BinarySearchTree(50);
  });

  it('is created with the correct value', function () {
    expect(tree.value).toBe(50);
    var tree2 = new BinarySearchTree('Frodo');
    expect(tree2.value).toBe('Frodo');
  });

  it('inserts values in the correct locations', function () {
    tree
    .insert(80)
    .insert(20);
    expect(tree.left.value).toBe(20);
    expect(tree.right.value).toBe(80);
  });

  it('inserts many values in the correct locations', function () {
    [15, 66, 45, 36, 5, 54, 99, 19, 95].forEach(function(n) {
      return tree.insert(n);
    });
    expect(tree.left.value).toBe(15);
    expect(tree.right.value).toBe(66);
    expect(tree.left.left.value).toBe(5);
    expect(tree.left.right.value).toBe(45);
    expect(tree.right.left.value).toBe(54);
    expect(tree.right.right.value).toBe(99);
    expect(tree.left.right.left.value).toBe(36);
    expect(tree.right.right.left.value).toBe(95);
    expect(tree.left.right.left.left.value).toBe(19);
  });

  it('finds the minimum and maximum', function () {
    [15, 66, 45, 36, 5, 54, 99, 19, 95].forEach(function(n) {
      return tree.insert(n);
    });
    expect(tree.min()).toBe(5);
    expect(tree.max()).toBe(99);
  });

  it('confirms containment (or not) of values', function () {
    [15, 66, 45, 36, 5, 54, 99, 19, 95].forEach(function(n) {
      return tree.insert(n);
    });
    expect(tree.contains(45)).toBe(true);
    expect(tree.contains(54)).toBe(true);
    expect(tree.contains(3)).toBe(false);
    expect(tree.contains(51)).toBe(false);
  });

  it('processes its nodes using in-order traversal', function () {
    [15, 66, 45, 36, 5, 54, 99, 19, 95].forEach(function(n) {
      return tree.insert(n);
    });
    var vals = [];
    tree.traverse(function (value) {
      vals.push(value);
    });
    expect(vals).toEqual([5, 15, 19, 36, 45, 50, 54, 66, 95, 99]);
  });

});
