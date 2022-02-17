"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var message = 'Hello world';
var names = ['abc', 'da', 'nda'];
names.forEach(function (item) {
  return console.log(item);
});

var Rectangle = /*#__PURE__*/function () {
  // constructor
  function Rectangle(height, width) {
    _classCallCheck(this, Rectangle);

    this.height = height;
    this.width = width;
  } // Getter


  _createClass(Rectangle, [{
    key: "area",
    get: function get() {
      return this.calcArea();
    } // Method

  }, {
    key: "calcArea",
    value: function calcArea() {
      return this.height * this.width;
    }
  }]);

  return Rectangle;
}();

var square = new Rectangle(10, 10);
console.log(square.area);