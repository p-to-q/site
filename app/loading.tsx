export default function Loading() {
  return (
    <div
      className="min-h-[30vh] rounded-sm bg-neutral-100 animate-pulse motion-reduce:animate-none"
      aria-busy
      aria-label="Loading"
    />
  )
}
