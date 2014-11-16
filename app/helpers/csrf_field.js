module.exports = function(context) {
  return '<input type="hidden" name="csrf" value="' + context.data.root.csrf + '">'
}
