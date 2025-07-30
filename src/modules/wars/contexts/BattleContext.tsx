'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { WarsDifficulty } from '@/shared/enums/Wars'

export interface Exercise {
  id: number
  title: string
  difficulty: WarsDifficulty
  description: string
}

interface BattleContextType {
  exercises: Exercise[]
  setExercises: (exercises: Exercise[]) => void
  clear: () => void
}

const BattleContext = createContext<BattleContextType | null>(null)

export function BattleProvider({ children }: { children: ReactNode }) {
  const [exercises, setExercisesState] = useState<Exercise[]>([])

  const setExercises = (ex: Exercise[]) => setExercisesState(ex)
  const clear = () => setExercisesState([])

  return (
    <BattleContext.Provider value={{ exercises, setExercises, clear }}>
      {children}
    </BattleContext.Provider>
  )
}

export function useBattleContext() {
  const ctx = useContext(BattleContext)
  if (!ctx) {
    throw new Error('useBattleContext must be used inside BattleProvider')
  }
  return ctx
}
