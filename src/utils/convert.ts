const units = ["mm", "cm", "m", "pc", "pt", "in", "ft", "px"] as const;

const conversions = {
  // metric
  m: {
    system: "metric",
    factor: 1,
  },
  cm: {
    system: "metric",
    factor: 1 / 100,
  },
  mm: {
    system: "metric",
    factor: 1 / 1000,
  },
  // imperial
  pt: {
    system: "imperial",
    factor: 1 / 72,
  },
  pc: {
    system: "imperial",
    factor: 1 / 6,
  },
  in: {
    system: "imperial",
    factor: 1,
  },
  ft: {
    system: "imperial",
    factor: 12,
  },
} as const;

const anchors = {
  metric: {
    unit: "m",
    ratio: 1 / 0.0254,
  },
  imperial: {
    unit: "in",
    ratio: 0.0254,
  },
} as const;

export function convertUnits(
  value: number,
  _fromUnit: typeof units[number],
  _toUnit: typeof units[number],
  {
    pixelsPerInch,
  }: {
    pixelsPerInch: number;
  } = { pixelsPerInch: 96 }
) {
  let fromUnit = _fromUnit;
  let toUnit = _toUnit;

  if (typeof value !== "number" || !Number.isFinite(value))
    throw new Error("Value must be a finite number");
  if (!fromUnit || !toUnit) throw new Error("Must specify from and to units");

  if (fromUnit === toUnit) {
    // We don't need to convert from A to B since they are the same already
    return value;
  }

  let toFactor = 1;
  let fromFactor = 1;

  if (fromUnit === "px") {
    fromFactor = 1 / pixelsPerInch;
    fromUnit = "in";
  }
  if (toUnit === "px") {
    toFactor = pixelsPerInch;
    toUnit = "in";
  }

  const fromUnitData = conversions[fromUnit];
  const toUnitData = conversions[toUnit];

  // source to anchor inside source's system
  let anchor = value * fromUnitData.factor * fromFactor;

  // if systems differ, convert one to another
  if (fromUnitData.system !== toUnitData.system) {
    // regular 'm' to 'in' and so forth
    anchor *= anchors[fromUnitData.system].ratio;
  }

  return (anchor / toUnitData.factor) * toFactor;
}
