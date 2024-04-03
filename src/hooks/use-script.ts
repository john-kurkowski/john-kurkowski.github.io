import { useEffect } from 'react'

/*
  See https://stackoverflow.com/a/34425083/62269.
*/
export default function useScript(url: string): void {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url])
}
