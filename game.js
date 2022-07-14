const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You find yourself in the middle of a city. You spot a phone, what do you do with it?",
        options: [
            {
                text: 'Pick it up.',
                setState: {phone: true},
                nextText: 2
            },
            {
                text: 'Leave it.',
                setState: {phone: false},
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "You walk around the city for a little bit. After walking around, a man comes up to you and asks if you have anything you were willing to give for money.",
        options: [
            {
                text:'Give him the phone.',
                requiredState: (currentState) => currentState.phone,
                setState: {phone: false, money: true},
                nextText: 3
            },
            {
                text:'Tell the man you have nothing.',
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: "You see a store and decide to head inside, what do you buy?",
        options: [
            {
                text: 'Food',
                setState: {money: false, food:true},
                nextText: 4
            },
            {
                text: 'Pepper spray',
                setState: {money: false, spray:true},
                nextText: 4
            },
            {
                text: 'Buy nothing and leave',
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: "It is getting dark and you decide to take a nap. You wake up to the shuffling of feet and see a person in a mask telling you to give them everything you have. What do you do?",
        options: [
            {
                text: 'Use the pepper spray',
                requiredState: (currentState) => currentState.spray,
                setState: {spray: false},
                nextText: 5
            },
            {
                text: 'Give him the money',
                requiredState: (currentState) => currentState.money,
                setState: {money: false},
                nextText: 6
            },
            {
                text: 'Tell the robber you have nothing',
                nextText: 7
            }
        ]
    },
    {
        id: 5,
        text: "You use the pepper spray and the robber runs away. You walk around for a while and then fall into a seemingly endless pit. You finally wake up and sigh in relief that it was just a dream.",
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: "You give the robber the money and he leaves. You start to get hungry and try to find food, but you can't buy any. You feel like you are about to die of starvation when you wake up. It was all just a dream.",
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 7,
        text: "The robber is about to attack you, but you wake up. It was only a dream.",
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]

startGame();