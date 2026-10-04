/*
 * ResumeContext.jsx
 * Holds the logged-in user's list of resumes and the actions that change it.
 * Usage: const { resumes, isResumesLoading, createResume, saveResume,
 *                deleteResume, duplicateResume } = useResumes()
 * Every action calls services/resumeService.js first, then updates the list,
 * so the dashboard always shows what is saved.
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as resumeService from '../services/resumeService'
import { useAuth } from './AuthContext'

const ResumeContext = createContext(null)

export function ResumeProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id

  // The list is stored together with the id of the user it belongs to,
  // so after logging in as someone else we never show the previous user's resumes
  const [resumeState, setResumeState] = useState({ userId: null, list: [] })

  // Load this user's resumes whenever the logged-in user changes
  useEffect(() => {
    if (!userId) return
    let isCancelled = false
    resumeService.getResumes(userId).then((list) => {
      if (!isCancelled) setResumeState({ userId, list })
    })
    return () => {
      isCancelled = true
    }
  }, [userId])

  const value = useMemo(() => {
    const updateList = (changeList) => setResumeState((current) => ({ ...current, list: changeList(current.list) }))

    return {
      resumes: userId && resumeState.userId === userId ? resumeState.list : [],
      isResumesLoading: Boolean(userId) && resumeState.userId !== userId,

      createResume: async (resumeData) => {
        const newResume = await resumeService.createResume(userId, resumeData)
        updateList((list) => [newResume, ...list])
        return newResume
      },
      saveResume: async (resumeId, updates) => {
        const savedResume = await resumeService.updateResume(resumeId, updates)
        updateList((list) => [savedResume, ...list.filter((resume) => resume.id !== resumeId)])
        return savedResume
      },
      deleteResume: async (resumeId) => {
        await resumeService.deleteResume(resumeId)
        updateList((list) => list.filter((resume) => resume.id !== resumeId))
      },
      duplicateResume: async (resumeId) => {
        const copy = await resumeService.duplicateResume(resumeId)
        updateList((list) => [copy, ...list])
        return copy
      },
    }
  }, [userId, resumeState])

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResumes() {
  return useContext(ResumeContext)
}
