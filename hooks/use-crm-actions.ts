"use client"

import { useState, useCallback } from "react"

interface CRMActionState {
  isLoading: boolean
  error: string | null
  success: boolean
}

interface UseCRMActionsReturn {
  state: CRMActionState
  addToCRM: (company: any) => Promise<void>
  removeFromCRM: (companyId: string) => Promise<void>
  updateCRMEntry: (company: any) => Promise<void>
  reset: () => void
}

export function useCRMActions(): UseCRMActionsReturn {
  const [state, setState] = useState<CRMActionState>({
    isLoading: false,
    error: null,
    success: false,
  })

  const addToCRM = useCallback(async (company: any) => {
    setState({ isLoading: true, error: null, success: false })

    try {
      // Simulate API call with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate potential errors (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Failed to connect to CRM. Please check your connection and try again.")
      }

      // Simulate different types of errors
      const errorTypes = [
        "Company already exists in CRM with different details",
        "Invalid contact information format",
        "CRM storage limit reached",
        "Network timeout - please try again",
      ]

      if (Math.random() < 0.05) {
        throw new Error(errorTypes[Math.floor(Math.random() * errorTypes.length)])
      }

      // Success case
      console.log(`Successfully added ${company.companyName} to CRM`)
      setState({ isLoading: false, error: null, success: true })
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
        success: false,
      })
    }
  }, [])

  const removeFromCRM = useCallback(async (companyId: string) => {
    setState({ isLoading: true, error: null, success: false })

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (Math.random() < 0.05) {
        throw new Error("Failed to remove company from CRM")
      }

      console.log(`Successfully removed company ${companyId} from CRM`)
      setState({ isLoading: false, error: null, success: true })
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to remove from CRM",
        success: false,
      })
    }
  }, [])

  const updateCRMEntry = useCallback(async (company: any) => {
    setState({ isLoading: true, error: null, success: false })

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      if (Math.random() < 0.05) {
        throw new Error("Failed to update CRM entry")
      }

      console.log(`Successfully updated ${company.companyName} in CRM`)
      setState({ isLoading: false, error: null, success: true })
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to update CRM entry",
        success: false,
      })
    }
  }, [])

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null, success: false })
  }, [])

  return {
    state,
    addToCRM,
    removeFromCRM,
    updateCRMEntry,
    reset,
  }
}
