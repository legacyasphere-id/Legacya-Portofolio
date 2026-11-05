import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { navigate, withBasePath } from '../core/router'

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
}

export function Link({ to, onClick, target, ...rest }: LinkProps) {
  const href = withBasePath(to)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      (target && target !== '_self')
    ) {
      return
    }
    e.preventDefault()
    navigate(to)
  }

  return <a href={href} target={target} onClick={handleClick} {...rest} />
}
