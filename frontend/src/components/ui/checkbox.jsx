import React from 'react'
import { Check } from 'lucide-react'

export const Checkbox = ({ 
  checked = false, 
  onCheckedChange, 
  className = '', 
  id,
  ...props 
}) => {
  const handleChange = (e) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked)
    }
  }

  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <label
        htmlFor={id}
        className={`peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer inline-flex items-center justify-center ${
          checked 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-background hover:bg-accent'
        } ${className}`}
      >
        {checked && <Check className="h-3 w-3" />}
      </label>
    </div>
  )
}
