/******** app/components/Starfield.tsx ********/
export default function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,.5) 0, transparent 2px),
             radial-gradient(1px 1px at 80% 30%, rgba(255,255,255,.35) 0, transparent 2px),
             radial-gradient(1px 1px at 50% 70%, rgba(255,255,255,.25) 0, transparent 2px)`
        }}
      />
    </div>
  );
}
