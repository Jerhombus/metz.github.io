/******** app/lib/lunar.ts ********/
// Tiny lunar-phase accent helper: returns a hue for the day
export function lunarHue(date = new Date()) {
  // Synodic month ~29.5306 days; pick a deterministic hue across the cycle
  const synodic = 29.5306;
  const epoch = new Date('2024-01-11T00:00:00Z').getTime(); // known new moon
  const days = (date.getTime() - epoch) / 86400000;
  const phase = ((days % synodic) + synodic) % synodic; // 0..29.53
  // Map phase to purple/blue range 240–280
  const hue = 240 + (phase / synodic) * 40;
  return hue;
}
