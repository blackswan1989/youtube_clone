"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addCommentForm = document.getElementById("jsAddComment");
var commentList = document.getElementById("jsCommentList");
var commentNumber = document.getElementById("jsCommentNumber");

var increaseNumber = function increaseNumber() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML) + 1;
};

var addComment = function addComment(comment) {
  var li = document.createElement("li");
  var span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
}; //prepend는 객체를 앞에 추가해준다.


var sendComment = function sendComment(comment) {
  var videoId, response;
  return regeneratorRuntime.async(function sendComment$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          videoId = window.location.href.split("/videos/")[1];
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _axios["default"])({
            url: "/api/".concat(videoId, "/comment"),
            method: "POST",
            data: {
              comment: comment
            }
          }));

        case 3:
          response = _context.sent;

          if (response.status == 200) {
            addComment(comment);
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var handleSubmit = function handleSubmit(event) {
  event.preventDefault();
  var commentInput = addCommentForm.querySelector("input");
  var comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}