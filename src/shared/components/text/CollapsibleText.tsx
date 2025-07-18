"use client"

import { useEffect, useState } from 'react'

interface Props {
  text: string
  maxLength?: number
  className?: string
  style?: React.CSSProperties
  spanProps?: React.HTMLAttributes<HTMLSpanElement>
}

export function CollapsibleText({
  text,
  maxLength = 100,
  className = '',
  style = {},
  spanProps
}: Props) {
  const [isTruncated, setIsTruncated] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (text && text.length > maxLength) {
      setIsTruncated(true)
    } else {
      setIsTruncated(false)
    }
  }, [text, maxLength])

  if (!text) {
    return null
  }

  if (!isTruncated) {
    return (
      <span className={className} style={style} {...spanProps}>
        {text}
      </span>
    )
  }

  const truncatedText = text.slice(0, maxLength) + '...'

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        maxWidth: '100%',
        ...style
      }}
      className={className}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      {...spanProps}
    >
      <span style={{
        cursor: 'pointer',
        padding: '4px 8px',
        paddingLeft: '0px',
        borderRadius: '4px',
        transition: 'background-color 0.2s ease',
      }}>
        {truncatedText}
      </span>

      <span style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#333',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '14px',
        lineHeight: '1.4',
        maxWidth: '400px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        marginBottom: '8px',
        opacity: showTooltip ? 1 : 0,
        visibility: showTooltip ? 'visible' : 'hidden',
        transition: 'opacity 0.2s ease, visibility 0.2s ease',
      }}>
        {text}
        <span style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid #333',
        }}></span>
      </span>
    </span>
  )
}
