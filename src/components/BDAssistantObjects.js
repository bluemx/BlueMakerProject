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
  content: [

  ],
}

export default { scene }
