import { type Step, type RoutineTimeVariationType } from './types'
const baseURL = '/'

export const routineTimeVariations: RoutineTimeVariationType[] = [
  {
    id: 0,
    label: 'standard',
    modifier: 1,
  },
  {
    id: 1,
    label: 'extended',
    modifier: 2,
  },
]

// TODO: integrate routineTimeVariations in the state and then use just the ID
export const originalState = {
  steps: [] as number[],
  lastEdit: 0 as number,
  version: '0' as string,
  intro: {
    name: 'Intro',
    duration: 68,
    file: `${baseURL}assets/audio/intro.mp3`,
    description: 'Welcome to your meditation routine',
    icon: `logoOnly`,
    pauseAfter: 5,
  } as Step,
  outro: {
    name: 'Outro',
    duration: 37,
    file: `${baseURL}assets/audio/outro.mp3`,
    description: 'Thank you for meditate with SereneGrove',
    icon: `logoOnly`,
    pauseAfter: 0,
  } as Step,
  stepsOptions: [
    {
      id: 0,
      name: 'Breath',
      duration: 61,
      file: `${baseURL}assets/audio/breath.mp3`,
      description:
        'Focus your attention on the sensation of the breath, observing its natural flow without trying to control it.',
      icon: `breath`,
      pauseAfter: 30,
    },
    {
      id: 1,
      name: 'Body scan',
      duration: 129,
      file: `${baseURL}assets/audio/body_scan.mp3`,
      description:
        'Systematically bring awareness to different parts of the body, observing physical sensations without judgment.',
      icon: `body`,
      pauseAfter: 120,
    },
    {
      id: 2,
      name: 'Sounds',
      duration: 52,
      file: `${baseURL}assets/audio/sounds.mp3`,
      description:
        'Direct your attention to the sounds in your environment, observing them as they arise and fade away without analysis.',
      icon: `sounds`,
      pauseAfter: 60,
    },
    {
      id: 3,
      name: 'Mantra',
      duration: 62,
      file: `${baseURL}assets/audio/mantra.mp3`,
      description:
        'Repeat a chosen word or phrase silently in your mind to cultivate inner calm and focused awareness.',
      icon: `mantra`,
      pauseAfter: 120,
    },
    {
      id: 4,
      name: 'Bell sound',
      duration: 60,
      file: `${baseURL}assets/audio/bell.mp3`,
      description:
        'Focus your attention on the sound of a bell, observing its duration, resonance, and fading away to develop concentration.',
      icon: `bell`,
      pauseAfter: 5,
    },
  ] as Step[],
  routineVariation: routineTimeVariations[0] as RoutineTimeVariationType,
}
