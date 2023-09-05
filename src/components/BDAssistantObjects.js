const scene = {
  block: 'scene',
  name: 'SC1',
  countdown: 0,
  instructions: {
    open: true,
    content: [
      {
        block: 'group',
        class: 'flex gap-2 items-center',
        content: [
          {
            block: 'audio',
            class: '',
            file: 'instruction.mp3',
          },
          {
            block: 'text',
            class: '',
            text: 'Instructions text goes here...',
          },
        ],
      },
    ],
  },
  content: [],
}

const buttonNext = {
  class: 'text-center my-10',
  content: [
    {
      to: '/activity/1',
      class: '',
      text: 'Next',
      id: 'bgs2',
      block: 'button',
      name: 'xOfa',
    },
  ],
  background: '',
  id: 'GmYQ',
  block: 'group',
  name: 'GVsG',
  marker: '',
}

const buttonFinalize = {
  symbol: 'FinalizeGroup',
}

const sceneContent = {
  marker: '📒',
  class: 'bg-slate-100 rounded p-2 max-w-4xl text-center mx-auto',
  content: [
    {
      text: 'Escena 1',
      class: 'text-3xl',
      id: 'QcuT',
      block: 'text',
      name: 'f9J2',
    },
  ],
  background: '',
  id: 'xLC6',
  block: 'group',
  name: 'Mv0A',
}

export default { scene, buttonNext, buttonFinalize, sceneContent }
