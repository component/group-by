
/**
 * Module dependencies.
 */

var toFunction = require('to-function');

/**
 * Group `arr` with callback `fn(val, i)`.
 *
 * @param {Array} arr
 * @param {Array|Function|String} fn or prop, or array of fn or prop
 * @return {Array}
 * @api public
 */

module.exports = function(arr, fns){
  var ret = {};
  var prop;
  var obj;
  var fn;
  fns = {}.toString.call(fns) === '[object Array]' ? fns : [].slice.call(arguments, 1);
  fns = fns.map(toFunction);

  for (var i = 0; i < arr.length; ++i) {
    obj = ret;
    for (var j = 0; j < fns.length; ++j) {
      fn = fns[j];
      prop = fn(arr[i], i);
      obj[prop] = obj[prop] || (j === fns.length - 1 ? [] : {});
      obj = obj[prop];
    }
    obj.push(arr[i]);
  }

  return ret;
};
