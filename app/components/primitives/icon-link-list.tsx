export function IconLinkList({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <ul
      className={`font-sm flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 ${className}`}
    >
      {children}
    </ul>
  )
}
