/**
 * This file runs various tests for the functions in
 * the file utils/list_helper.js
 */

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})