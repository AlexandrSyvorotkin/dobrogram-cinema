import { createContext, useContext, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { getDobrogramProfile, type DobrogramProfile } from '../data/dobrogram'

const DobrogramProfileContext = createContext<DobrogramProfile | null>(null)

export function DobrogramProfileProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const profile = getDobrogramProfile(pathname)

  return (
    <DobrogramProfileContext.Provider value={profile}>{children}</DobrogramProfileContext.Provider>
  )
}

export function useDobrogramProfile(): DobrogramProfile {
  const profile = useContext(DobrogramProfileContext)

  if (!profile) {
    throw new Error('useDobrogramProfile must be used within DobrogramProfileProvider')
  }

  return profile
}
