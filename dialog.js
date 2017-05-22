var Dialog = {
  createAndAddNode: function (textLines) {
    var resultNode = Dialog.createNode(textLines);
    Dialog.addNode(resultNode);
    return resultNode;
  },
  createNode: function (textLines) {
    var lineObjects = [];
    var lineId;
    textLines.forEach(function (textLine, index) {
      lineId = index;
      lineObjects.push({ id: lineId, text: textLine });
    });
    return {
      id: null,
      speaker: null,
      type: textLines.length === 1 ? 'inactive' : 'interactive',
      lines: lineObjects
    };
  },
  addNode: function (node) {
    node.id = Dialog.nodes.length;
    Dialog.nodes.push(node);
  },
  getNode: function (nodeId) {
    var foundNode = null;
    this.nodes.forEach(function (node) {
      if (node.id === nodeId) {
        foundNode = node;
      }
    });
    return foundNode;
  },
  nodes: [{
    id: '0',
    speaker: 'info',
    type: 'inactive',
    lines: [
      { id: '0.0', text: " 'Salve-me', Clique para Jogar" },
      { text: "Plot da História: Salvar uma Garota que foi raptada " },
      { text: "Basaedo nos jogos point-and-click" }
    ],
    next: function (linePicked) {
      return Dialog.getNode('1');
    }
  }, {
    id: '1',
    speaker: 'page',
    type: 'inactive',
    lines: [
      { id: '1.0', text: "Preciso da sua ajuda nao sei onde estou......escuto barulhos." },
      { text: "Está escuro.....frio....AJUDE-ME" },
    ],
    next: function (linePicked) {
      return Dialog.getNode('2');
    }
  }, {
    id: '2',
    speaker: 'visitor',
    type: 'interactive',
    sabeNome: false,
    lines: [
      { id: '2.0', text: "Quem é você ?" },
      { id: '2.1', text: "O que vc está escutando??" },
      { id: '2.2', text: "Vou ligar para a Polícia, fique calma!" }
    ],
    next: function (linePicked) {
      if (linePicked === '2.0') {
        Dialog.getNode('2').sabeNome = true;
        if (Dialog.getNode('3').passou === true) {
          if (Dialog.getNode('3.1').count === 2) {
            return Dialog.getNode('3.2');
          }
          if (Dialog.getNode('3.1').count === 3) {
            return Dialog.getNode('20');
          }
          return Dialog.getNode('3.1')
        }
        return Dialog.getNode('3');
      }
      if (linePicked === '2.1') {
        if (Dialog.getNode('4.1').countOk != 0) {
          return Dialog.getNode('4.5');
        }
        if (Dialog.getNode('4').countMais != 0) {
          return Dialog.getNode('4.2');
        }

        return Dialog.getNode('4');
      }
      if (linePicked === '2.2') {
        return Dialog.getNode('5');
      }
    }
  }, {
    id: '4',
    speaker: 'page',
    type: 'inactive',
    countMais: 0,
    lines: [
      { text: "Escuto o Mar e Pessoas Andando, Muitas" },
      { text: "Mas elas não me escutam!!" },
    ],
    next: function (linePicked) {
      console.log(Dialog.getNode('4').countMais)
      return Dialog.getNode('4.1');
    }
  }, {
    id: '4.1',
    speaker: 'visitor',
    type: 'interactive',
    countOk: 0,
    lines: [
      { id: '2.0', text: "Ok !" },
      { id: '2.1', text: "Esforce-se mais!!" },
    ],
    next: function (linePicked) {
      if (linePicked === '2.0') {

        if (Dialog.getNode('4.1').countOk === 3) {
          return Dialog.getNode('20');
        }

        Dialog.getNode('4.1').countOk++;
        console.log(Dialog.getNode('4.1'))
        return Dialog.getNode('2');
      }
      if (linePicked === '2.1') {
        if (Dialog.getNode('4').countMais === 3) {
          return Dialog.getNode('20');
        }

        if (Dialog.getNode('4').countMais == 1) {
          return Dialog.getNode('4.3');
        }
        if (Dialog.getNode('4').countMais == 2) {
          return Dialog.getNode('4.4');
        }
        Dialog.getNode('4').countMais++;
        console.log(Dialog.getNode('4'))
        return Dialog.getNode('4.2');
      }
    }
  }, {
    id: '4.2',
    speaker: 'page',
    type: 'inactive',
    count: 0,
    lines: [
      { text: "Escuto, também, barulhos industriais" }
    ],
    next: function (linePicked) {
      return Dialog.getNode('4.1');
    }
  }, {
    id: '4.3',
    speaker: 'page',
    type: 'inactive',
    count: 0,
    lines: [
      { text: "Escuto Gaivotas......." }
    ],
    next: function (linePicked) {
      Dialog.getNode('4').countMais++;
      console.log(Dialog.getNode('4'));
      return Dialog.getNode('4.1');
    }
  }, {
    id: '4.4',
    speaker: 'page',
    type: 'inactive',
    count: 0,
    lines: [
      { text: "Escuto Barcos, Navios eu acho....." }
    ],
    next: function (linePicked) {
      Dialog.getNode('4').countMais++;
      console.log(Dialog.getNode('4'));
      return Dialog.getNode('4.1');
    }
  }, {
    id: '4.5',
    speaker: 'page',
    type: 'inactive',
    count: 0,
    lines: [
      { text: "Já, te Respondi......Por Favor Me Ajude" }
    ],
    next: function (linePicked) {

      return Dialog.getNode('4.1');
    }
  }, {
    id: '3.1',
    speaker: 'page',
    type: 'inactive',
    count: 0,
    lines: [
      { text: "Já, te Respondi......Por Favor Me Ajude" }
    ],
    next: function (linePicked) {
      Dialog.getNode('3.1').count++;
      console.log(Dialog.getNode('3.1').count)
      return Dialog.getNode('2');
    }
  }, {
    id: '3.2',
    speaker: 'page',
    type: 'inactive',
    lines: [
      { text: "Eu não tenho muito tempo, por  favor me ajude" }
    ],
    next: function (linePicked) {
      Dialog.getNode('3.1').count++;
      return Dialog.getNode('2');
    }
  }, {
    id: '3',
    speaker: 'page',
    type: 'inactive',
    passou: 'false',
    lines: [
      { id: '3.0', text: "Me chamo Joselma Junior" }
    ],
    next: function (linePicked) {
      console.log(Dialog.getNode('3'))
      Dialog.getNode('3').passou = true;
      return Dialog.getNode('2');
    }
  }, {
    id: '5',
    speaker: 'page',
    type: 'inactive',
    countPolicia: 0,
    lines: [
      { text: "911, em que posso te ajudar ?? " }
    ],
    next: function (linePicked) {
      Dialog.getNode('5').countPolicia++;
      console.log(Dialog.getNode('5'));
      return Dialog.getNode('5.1');
    }
  }, {
    id: '5.1',
    speaker: 'visitor',
    type: 'interactive',
    countPolicia: 0,
    lines: [
      { id: '1.0', text: "Nada, Foi Engano...." },
      { id: '2.0', text: "Acho que alguem está precisando de ajuda" },
      { id: '3.0', text: "Alguém foi raptado, eu sei o local" }
    ],
    next: function (linePicked) {
      if (linePicked === '1.0') {
        Dialog.getNode('5').countPolicia++;
        if (Dialog.getNode('4').countMais === 0) {
          return Dialog.getNode('20');
        }
        return Dialog.getNode('2');
      }
      if (linePicked === '3.0') {
        return Dialog.getNode('6');
      }

      console.log(Dialog.getNode('5'));
      return Dialog.getNode('2');
    }
  }, {
    id: '6',
    speaker: 'page',
    type: 'inactive',
    lines: [
      { text: "Por Favor, Informe o local:" }
    ],
    next: function (linePicked) {
      return Dialog.getNode('7');
    }
  }, {
    id: '7',
    speaker: 'visitor',
    type: 'interactive',
    lines: [
      { id: '1.0', text: "Praia" },
      { id: '2.0', text: "Central da Cidade" },
      { id: '3.0', text: "Porto da Cidade" },
      { id: '4.0', text: "Bloco III" }
    ],
    next: function (linePicked) {
      if (linePicked === '1.0' || linePicked === '2.0' || linePicked === '4.0') {
        return Dialog.getNode('20');
      }
      if (linePicked === '3.0') {
        if (Dialog.getNode('2').sabeNome === true && Dialog.getNode('4').countMais === 3) {
          // ganhou
          return Dialog.getNode('21');
        }else{
          console.log(Dialog.getNode('2'));
          console.log(Dialog.getNode('4'));
          console.log("entrou no else");
          return Dialog.getNode('20');
        }
      }
    }
  }, {
    id: '20',
    speaker: 'info',
    type: 'inactive',
    lines: [
      { text: "Ela Morreu......" },
      {text: "Começar de novo?."}
    ],
    next: function (linePicked) {
      return location.reload();
    }
  }, {
    id: '21',
    speaker: 'info',
    type: 'inactive',
    lines: [
      { text: "Você Salvou a Joselma Junior, Parabéns!!!" }
    ],
    next: function (linePicked) {
      return location.reload();
    }
  }]
};