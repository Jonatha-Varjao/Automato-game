var Dialog = {
  getNode: function (nodeId) {
    var foundNode = null;
    this.nodes.forEach(function (node) {
      if (node.id === nodeId) {
        foundNode = node;
      }
    });
    return foundNode;
  },
  nodes: [ {
    id: '0',
    speaker: 'hero',
    type: 'inactive',
    lines: [
      { id: '0.0', text: "Tem alguem ai … ?" }
    ],
    next: function (linePicked) {
      console.log(linePicked);
      return Dialog.getNode('1');
    }
  }, {
    id: '1',
    speaker: 'receptionist',
    type: 'inactive',
    lines: [
      { id: '1.0', text: "Yes?" }
    ],
    next: function (linePicked) {
      console.log(linePicked);
      return Dialog.getNode('2');
    }
  }, {
    id: '2',
    speaker: 'hero',
    type: 'interactive',
    lines: [
      { id: '2.0', text: "Hi, I'm selling these fine leather jackets like the one I'm wearing." },
      { id: '2.1', text: "What is this? What's going on?"},
      { id: '2.2', text: "Who are you?"},
      { id: '2.3', text: "Who am I?"},
    ],
    next: function (linePicked) {
      console.log(linePicked);
      return Dialog.getNode('3');
    }
  }, {
    id: '3',
    speaker: 'receptionist',
    type: 'inactive',
    lines: [
      { id: '3.0', text: "Sorry, we're closed."}
    ],
    next: function (linePicked) {
      console.log(linePicked);
      return Dialog.getNode('4');
    }
  }, {
    id: '4',
    speaker: 'phone',
    type: 'inactive',
    lines: [
      { id: '4.0', text: "*Click*"}
    ],
    next: function (linePicked) {
      console.log(linePicked);
      return Dialog.getNode('exit');
    }
  }]
};