declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

interface Window {
  DISQUS?: {
    reset(options: { reload: boolean }): void
  }
}
