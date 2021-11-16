function animateBubble1() {
  $("#bubble1").css({
    width: "159px",
    height: "48px",
    padding: "5px 15px 5px 10px"
  });
}
function animateBubble2() {
  $("#bubble2").css({
    width: "155px",
    height: "48px",
    padding: "5px 15px 5px 10px"
  });
}
function animateBubble3() {
  $("#bubble3").css({
    width: "211px",
    height: "69px",
    padding: "5px 15px 5px 10px"
  });
}
function animateBubble4() {
  $("#bubble4").css({
    width: "211px",
    height: "69px",
    padding: "5px 15px 5px 10px"
  });
}
function animateBubble5() {
  $("#bubble5").css({
    width: "211px",
    height: "69px",
    padding: "5px 15px 5px 10px"
  });
}

$("document").ready(function() {
  setTimeout(animateBubble1, 1500);
  setTimeout(animateBubble2, 2800);
  setTimeout(animateBubble3, 4700);
  setTimeout(animateBubble4, 6600);
  setTimeout(animateBubble5, 8200);
  // style = "width: 211px; height: 69px;";
});
