CLOSURE_NO_DEPS = true;
CLOSURE_IMPORT_SCRIPT = function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript';
  goog.global.document.getElementsByTagName("head")[0].appendChild(script);
  return true;
};
