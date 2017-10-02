import '../scss/main.scss';

$(document).ready(function() {
  $("a[href^='http://']").attr("target","_blank");
  $("a[href^='https://']").attr("target","_blank");
});
