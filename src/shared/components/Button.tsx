import React from 'react'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  title?: string
  ariaLabel?: string
  className?: string
}

export const Button: React.FC<Props> = ({ children, onClick, disabled = false, title, ariaLabel, className = '' }) => {
  const baseCls = 'px-3 py-2 rounded-md text-sm flex items-center justify-center transition'
  const enabledCls = 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:scale-105'
  const disabledCls = 'bg-slate-700/40 text-gray-400 cursor-not-allowed'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      className={`${baseCls} ${disabled ? disabledCls : enabledCls} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
