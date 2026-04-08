import diceUrl from '../assets/dice.svg';

function DiceShape({ x, y, size, rotation, opacity }) {
  const half = size / 2;
  return (
    <image
      href={diceUrl}
      x={x - half}
      y={y - half}
      width={size}
      height={size}
      opacity={opacity}
      transform={`rotate(${rotation}, ${x}, ${y})`}
    />
  );
}

// Tiled pattern of cube shapes at different sizes, rotations, and positions
function BackgroundPattern() {
  return (
    <svg className="bg-pattern" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="cube-bg-pattern"
          x="0"
          y="0"
          width="260"
          height="260"
          patternUnits="userSpaceOnUse"
        >
          <DiceShape x={45}  y={42}  size={36} rotation={10}  opacity={0.15} />
          <DiceShape x={165} y={18}  size={22} rotation={-15} opacity={0.12} />
          <DiceShape x={228} y={72}  size={44} rotation={22}  opacity={0.14} />
          <DiceShape x={22}  y={148} size={30} rotation={-28} opacity={0.12} />
          <DiceShape x={128} y={125} size={42} rotation={8}   opacity={0.15} />
          <DiceShape x={208} y={172} size={20} rotation={38}  opacity={0.12} />
          <DiceShape x={72}  y={212} size={48} rotation={-14} opacity={0.14} />
          <DiceShape x={188} y={228} size={26} rotation={20}  opacity={0.12} />
          <DiceShape x={110} y={60}  size={18} rotation={-5}  opacity={0.11} />
          <DiceShape x={240} y={232} size={34} rotation={-18} opacity={0.13} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cube-bg-pattern)" />
    </svg>
  );
}

export default BackgroundPattern;
