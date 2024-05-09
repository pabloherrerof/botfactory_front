"use client"
import { create } from 'zustand'

export const useStore = create((set) => ({
    componentExit: {
        login: false,
        clients: false,
        profile: false,
      },
      setExit: (key) => set((state) => {
        return {
          componentExit: {
            ...state.componentExit, 
            [key]: true,
          },
        }
      }),
      resetExit: () => set(() => {
        return {
          componentExit: {
            login: false,
            clients: false,
            profile: false,
          },
        }
      }),
}))