"use client"

import { styled } from '@mui/material/styles'
import { useState, useRef, useEffect } from 'react'
import {
  Paper
} from '@mui/material'

const TooltipContainer = styled('div')({
  position: 'relative',
  display: 'inline-block',
})

const TooltipContent = styled(Paper, {
  shouldForwardProp: (prop) => !['visible', 'position', 'alignment'].includes(prop as string),
})<{
  visible: boolean
  position: 'top' | 'bottom'
  alignment: 'left' | 'center' | 'right'
}>(({ visible, position, alignment }) => ({
  position: 'absolute',
  [position === 'top' ? 'bottom' : 'top']: '100%',
  left: alignment === 'left' ? '0' : alignment === 'right' ? 'auto' : '50%',
  right: alignment === 'right' ? '0' : 'auto',
  transform: alignment === 'center' ? 'translateX(-50%)' : 'none',
  backgroundColor: '#010101',
  color: '#ffffff',
  padding: '8px 12px',
  fontSize: '0.75rem',
  fontWeight: 500,
  maxWidth: '250px',
  width: 'max-content',
  wordWrap: 'break-word',
  whiteSpace: 'normal',
  zIndex: 1300,
  opacity: visible ? 1 : 0,
  visibility: visible ? 'visible' : 'hidden',
  transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
  marginTop: position === 'bottom' ? '6px' : 'auto',
  marginBottom: position === 'top' ? '6px' : 'auto',
  '&::after': {
    content: '""',
    position: 'absolute',
    [position === 'top' ? 'top' : 'bottom']: '100%',
    left: alignment === 'left' ? '12px' : alignment === 'right' ? 'auto' : '50%',
    right: alignment === 'right' ? '12px' : 'auto',
    transform: alignment === 'center' ? 'translateX(-50%)' : 'none',
    width: 0,
    height: 0,
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    [position === 'top' ? 'borderBottom' : 'borderTop']: '6px solid #010101',
  },
}))

interface ICustomTooltipProps {
  text: string
  visible?: boolean
  children: React.ReactNode
}

export function CustomTooltip({ text, children, visible = true }: ICustomTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center')
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const calculatePosition = () => {
    if (!containerRef.current || !tooltipRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const tooltip = tooltipRef.current.getBoundingClientRect()
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    const spaceAbove = container.top
    const spaceBelow = viewport.height - container.bottom
    const tooltipHeight = tooltip.height || 40

    if (spaceAbove >= tooltipHeight + 10) {
      setPosition('top')
    } else if (spaceBelow >= tooltipHeight + 10) {
      setPosition('bottom')
    } else {
      setPosition(spaceAbove > spaceBelow ? 'top' : 'bottom')
    }

    const containerCenter = container.left + container.width / 2
    const tooltipWidth = tooltip.width || 150

    if (containerCenter - tooltipWidth / 2 < 10) {
      setAlignment('left')
    } else if (containerCenter + tooltipWidth / 2 > viewport.width - 10) {
      setAlignment('right')
    } else {
      setAlignment('center')
    }
  }

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(calculatePosition, 0)
      return () => clearTimeout(timer)
    }
  }, [showTooltip])

  useEffect(() => {
    if (showTooltip) {
      const handleResize = () => calculatePosition()
      const handleScroll = () => calculatePosition()

      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll, true)

      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [showTooltip])

  const handleMouseEnter = () => {
    if (visible && text) {
      setShowTooltip(true)
    }
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  return (
    <TooltipContainer
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <TooltipContent
        ref={tooltipRef}
        visible={showTooltip}
        position={position}
        alignment={alignment}
        elevation={8}
      >
        {text}
      </TooltipContent>
    </TooltipContainer>
  )
}