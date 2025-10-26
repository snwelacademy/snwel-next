import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export default function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[40vh] p-6 text-center ${className ?? ''}`}>
      <div className="mb-6 text-gray-400">
        {icon ?? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-20 h-20">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h2>
      {description ? (
        <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      ) : null}
      {action ? <div>{action}</div> : null}
    </div>
  )
}
