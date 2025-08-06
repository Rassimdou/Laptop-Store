import React, { useState, useRef } from 'react'

export const Slider = ({ 
  value = [0], 
  onValueChange, 
  min = 0, 
  max = 100, 
  step = 1, 
  className = '',
  ...props 
}) => {
  const [currentValue, setCurrentValue] = useState(value)
  const sliderRef = useRef(null)

  const handleMouseDown = (e) => {
    const slider = sliderRef.current
    if (!slider) return

    const rect = slider.getBoundingClientRect()
    const percentage = (e.clientX - rect.left) / rect.width
    const newValue = Math.round((min + percentage * (max - min)) / step) * step
    const clampedValue = Math.max(min, Math.min(max, newValue))
    
    const newValues = [clampedValue]
    setCurrentValue(newValues)
    if (onValueChange) {
      onValueChange(newValues)
    }

    const handleMouseMove = (e) => {
      const percentage = (e.clientX - rect.left) / rect.width
      const newValue = Math.round((min + percentage * (max - min)) / step) * step
      const clampedValue = Math.max(min, Math.min(max, newValue))
      
      const newValues = [clampedValue]
      setCurrentValue(newValues)
      if (onValueChange) {
        onValueChange(newValues)
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const percentage = ((currentValue[0] - min) / (max - min)) * 100

  return (
    <div className={`relative flex w-full touch-none select-none items-center ${className}`} {...props}>
      <div
        ref={sliderRef}
        className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        <div 
          className="absolute h-full bg-primary transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
        style={{ 
          position: 'absolute',
          left: `calc(${percentage}% - 10px)`,
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      />
    </div>
  )
}
