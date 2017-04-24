/**
 * videojs-seek-buttons
 * @version 1.0.0
 * @copyright 2016 Ben Clifford
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsSeekButtons = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Button = _videoJs2['default'].getComponent('Button');
var Component = _videoJs2['default'].getComponent('Component');

// Default options for the plugin.
var defaults = {};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
var onPlayerReady = function onPlayerReady(player, options) {

  player.addClass('vjs-seek-buttons');

  if (options.forward && options.forward > 0) {
    player.controlBar.seekForward = player.controlBar.addChild('seekButton', {
      direction: 'forward',
      seconds: options.forward
    });
    player.controlBar.el().insertBefore(player.controlBar.seekForward.el(), player.controlBar.el().firstChild.nextSibling);
  }

  if (options.back && options.back > 0) {
    player.controlBar.seekBack = player.controlBar.addChild('seekButton', {
      direction: 'back',
      seconds: options.back
    });
    player.controlBar.el().insertBefore(player.controlBar.seekBack.el(), player.controlBar.el().firstChild.nextSibling);
  }
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function seekButtons
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var seekButtons = function seekButtons(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, _videoJs2['default'].mergeOptions(defaults, options));
  });
};

/**
 * Button to seek forward/back
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class SeekToggle
 */

var SeekButton = (function (_Button) {
  _inherits(SeekButton, _Button);

  function SeekButton(player, options) {
    _classCallCheck(this, SeekButton);

    _get(Object.getPrototypeOf(SeekButton.prototype), 'constructor', this).call(this, player, options);
    if (this.options_.direction === 'forward') {
      this.controlText(this.localize('Seek forward {{seconds}} seconds').replace('{{seconds}}', this.options_.seconds));
    } else if (this.options_.direction === 'back') {
      this.controlText(this.localize('Seek back {{seconds}} seconds').replace('{{seconds}}', this.options_.seconds));
    }
  }

  _createClass(SeekButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      /* Each button will have the classes:
         `vjs-seek-button`
         `skip-forward` or `skip-back`
         `skip-n` where `n` is the number of seconds
         So you could have a generic icon for "skip back" and a more
         specific one for "skip back 30 seconds"
      */
      return 'vjs-seek-button skip-' + this.options_.direction + ' ' + ('skip-' + this.options_.seconds + ' ' + _get(Object.getPrototypeOf(SeekButton.prototype), 'buildCSSClass', this).call(this));
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var now = this.player_.currentTime();

      if (this.options_.direction === 'forward') {
        this.player_.currentTime(now + this.options_.seconds);
      } else if (this.options_.direction === 'back') {
        this.player_.currentTime(now - this.options_.seconds);
      }
    }
  }]);

  return SeekButton;
})(Button);

Component.registerComponent('SeekButton', SeekButton);

// Register the plugin with video.js.
_videoJs2['default'].plugin('seekButtons', seekButtons);

exports['default'] = seekButtons;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});