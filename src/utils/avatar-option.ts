import { SETTINGS } from './constant'
import { getRandomValue } from './random'

export interface AvatarOption {
  accessories: {
    shape: string
  } 
  body: {
    shape: string
  }
  face: {
    shape: string
  }
  hair: { 
    shape: string
  }
  head: {
    shape: string
  }
  eyes: {
    shape: string
  }
  mouth: {
    shape: string
  }
  nose: {
    shape: string
  }
  eyebrows: {
    shape: string
  }
}
export function getRandomAvatarOption(): AvatarOption {
  const avatarOption = {
    accessories: {
      shape: getRandomValue(SETTINGS.accessories),
    },
    body: {
      shape: getRandomValue(SETTINGS.body),
    },
    face: {
      shape: getRandomValue(SETTINGS.face),
    },
    hair: {
      shape: getRandomValue(SETTINGS.hair),
    },
    head: {
      shape: getRandomValue(SETTINGS.head),
    },
    eyes: {
      shape: getRandomValue(SETTINGS.eyes),
    },
    mouth: {
      shape: getRandomValue(SETTINGS.mouth),
    },
    nose: {
      shape: getRandomValue(SETTINGS.nose),
    },
    eyebrows: {
      shape: getRandomValue(SETTINGS.eyebrows),
    },
  }

  return avatarOption
}
