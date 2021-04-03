import { Team } from './types'

const teams: Team[] = [
  {
    id: 1,
    name: 'Ogee Storm',
    description: "The storm's a-comin! Watch out! These bulls are stampeding in a ogeey surge!",
    images: {
      lg: 'ogee-storm-lg.png',
      md: 'ogee-storm-md.png',
      sm: 'ogee-storm-sm.png',
      alt: 'ogee-storm-alt.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/ogee-storm.png',
    },
    background: 'ogee-storm-bg.svg',
    textColor: '#191326',
    users: 0,
    points: 0,
  },
  {
    id: 2,
    name: 'Fearsome Flippers',
    description: "The flippening is coming. Don't get in these bunnies' way, or you'll get flipped too!",
    images: {
      lg: 'fearsome-flippers-lg.png',
      md: 'fearsome-flippers-md.png',
      sm: 'fearsome-flippers-sm.png',
      alt: 'fearsome-flippers-alt.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/fearsome-flippers.png',
    },
    background: 'fearsome-flippers-bg.svg',
    textColor: '#FFFFFF',
    users: 0,
    points: 0,
  },
  {
    id: 3,
    name: 'Chaotic Oytrs',
    description: 'Can you stand the heat? Stay out of the kitchen or you might get burned to a crisp!',
    images: {
      lg: 'chaotic-oytrs-lg.png',
      md: 'chaotic-oytrs-md.png',
      sm: 'chaotic-oytrs-sm.png',
      alt: 'chaotic-oytrs-alt.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/chaotic-oytrs.png',
    },
    background: 'chaotic-oytrs-bg.svg',
    textColor: '#191326',
    users: 0,
    points: 0,
  },
]

export default teams
