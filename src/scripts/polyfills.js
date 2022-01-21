import objectFitImages from 'object-fit-images';
import regeneratorRuntime from 'regenerator-runtime';

objectFitImages();

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

/** Array.from polyfill
 * @license MIT, GPL, do whatever you want
 * @requires polyfill: Array.prototype.slice fix {@link https://gist.github.com/brettz9/6093105}
 */
if (!Array.from) {
  Array.from = function (object) {
    'use strict';
    return [].slice.call(object);
  };
}
