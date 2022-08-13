const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];
const spriteAnimations = [];

animationStates.forEach((state, index) => {
  const frame = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    frame.loc.push({
      x: i * 575,
      y: index * 523,
    });
  }
  spriteAnimations[state.name] = frame;
});
