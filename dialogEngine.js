/*global Dialog*/
document.addEventListener('DOMContentLoaded', function () {
  var currentNode = Dialog.getNode('0');
  var container = document.getElementById('dialogContainer');
  var displayDialog = function (dialogNode) {
    var isInteractive = (dialogNode.type === 'interactive');
    var lines = document.createElement(isInteractive ? 'ol' : 'div');
    lines.className = dialogNode.speaker;
    if (dialogNode && dialogNode.lines) {
      dialogNode.lines.forEach(function (line) {
        var newLine = document.createElement(isInteractive ? 'li' : 'div');
        newLine.innerHTML = line.text;
        newLine.addEventListener('click', function () {
          displayDialog(dialogNode.next(line.id));
        });
        if (line.url) {
          var link = document.createElement('a');
          link.href = line.url;
          link.innerHTML = line.urlText || line.url;
          newLine.appendChild(document.createElement('br'));
          newLine.appendChild(link);
        }
        lines.appendChild(newLine);
      });
    }
    container.innerHTML = '';
    container.appendChild(lines);
  };
  displayDialog(currentNode);
});