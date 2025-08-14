const BaseType = Object.freeze({
  A: "a",
  T: "t",
  G: "g",
  C: "c"
});

const ScientificNames = Object.freeze({
  [BaseType.A]: "Adenine",
  [BaseType.T]: "Thymine",
  [BaseType.G]: "Guanine",
  [BaseType.C]: "Cytosine"
});

function createBase(type, side) {
  const base = document.createElement("div");
  base.className = `base ${side} ${type}`;
  base.dataset.label = ScientificNames[type] || type.toUpperCase();
  return base;
}
function createBasePair(angle, yPosition, leftType, rightType, radius, scale) {
  const pair = document.createElement("div");
  pair.className = "base-pair";

  const leftBase = createBase(leftType, "left");
  const rightBase = createBase(rightType, "right");

  pair.appendChild(leftBase);
  pair.appendChild(rightBase);

  pair.style.transform = `
    rotateY(${angle + 10}deg)
    translateZ(${radius}px)
    translateY(${yPosition}px)
    scale(${scale / 2})
  `;

  return pair;
}

function initHelix() {
  const helix = document.getElementById("helix");
  const pairs = [
    [BaseType.A, BaseType.T],
    [BaseType.T, BaseType.A],
    [BaseType.G, BaseType.C],
    [BaseType.C, BaseType.G]
  ];

  const total = 200;
  const radius = 90;
  const verticalGap = 15;
  const minScale = 0.1;
  const maxScale = 2;

  for (let i = 0; i < total; i++) {
    const [leftType, rightType] = pairs[i % pairs.length];
    const angle = i * 20;
    const yPosition = i * verticalGap;
    const scale = minScale + (1 - i / total) * (maxScale - minScale);

    const basePair = createBasePair(
      angle,
      yPosition,
      leftType,
      rightType,
      radius,
      scale
    );
    helix.appendChild(basePair);
  }
}

document.addEventListener("DOMContentLoaded", initHelix);
