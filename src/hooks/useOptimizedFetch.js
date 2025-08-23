import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Custom hook for optimized data fetching with abort controller and error handling
 * Improves code maintainability by centralizing fetch logic
 */
export const useOptimizedFetch = (fetchFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(options.initialData || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)

  const { 
    onSuccess, 
    onError, 
    skipInitialFetch = false,
    retryDelay = 1000,
    maxRetries = 3 
  } = options

  const executeRequest = useCallback(async (retryCount = 0) => {
    try {
      // Abort previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController()
      
      setLoading(true)
      setError(null)

      const result = await fetchFunction()
      
      if (!abortControllerRef.current.signal.aborted) {
        setData(result)
        if (onSuccess) onSuccess(result)
      }
    } catch (err) {
      if (!abortControllerRef.current?.signal.aborted) {
        console.error('Fetch error:', err)
        
        // Retry logic for failed requests
        if (retryCount < maxRetries && !err.name === 'AbortError') {
          setTimeout(() => {
            executeRequest(retryCount + 1)
          }, retryDelay * Math.pow(2, retryCount)) // Exponential backoff
          return
        }
        
        setError(err.message || 'Error al cargar los datos')
        if (onError) onError(err)
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false)
      }
    }
  }, [fetchFunction, onSuccess, onError, retryDelay, maxRetries])

  const refetch = useCallback(() => {
    executeRequest()
  }, [executeRequest])

  useEffect(() => {
    if (!skipInitialFetch) {
      executeRequest()
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, dependencies)

  return {
    data,
    loading,
    error,
    refetch,
    setData // Allow manual data updates
  }
}

/**
 * Hook for parallel data fetching - loads multiple resources simultaneously
 */
export const useParallelFetch = (fetchFunctions, dependencies = [], options = {}) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [loadingStates, setLoadingStates] = useState({})
  const abortControllerRef = useRef(null)

  const { staggerDelay = 0 } = options

  const executeParallelRequests = useCallback(async () => {
    try {
      // Abort previous requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()
      
      setLoading(true)
      setErrors({})
      
      // Initialize loading states
      const initialLoadingStates = {}
      Object.keys(fetchFunctions).forEach(key => {
        initialLoadingStates[key] = true
      })
      setLoadingStates(initialLoadingStates)

      // Execute all fetch functions in parallel
      const promises = Object.entries(fetchFunctions).map(async ([key, fetchFn], index) => {
        try {
          // Add stagger delay if specified
          if (staggerDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, index * staggerDelay))
          }
          
          const result = await fetchFn()
          
          if (!abortControllerRef.current.signal.aborted) {
            setData(prev => ({ ...prev, [key]: result }))
            setLoadingStates(prev => ({ ...prev, [key]: false }))
          }
          
          return { key, result, success: true }
        } catch (error) {
          if (!abortControllerRef.current.signal.aborted) {
            setErrors(prev => ({ ...prev, [key]: error.message }))
            setLoadingStates(prev => ({ ...prev, [key]: false }))
          }
          return { key, error, success: false }
        }
      })

      await Promise.allSettled(promises)
      
    } catch (err) {
      console.error('Parallel fetch error:', err)
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false)
      }
    }
  }, [fetchFunctions, staggerDelay])

  useEffect(() => {
    executeParallelRequests()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, dependencies)

  const refetch = useCallback(() => {
    executeParallelRequests()
  }, [executeParallelRequests])

  return {
    data,
    loading,
    errors,
    loadingStates,
    refetch,
    hasErrors: Object.keys(errors).length > 0,
    isPartiallyLoaded: Object.values(loadingStates).some(state => !state)
  }
}

/**
 * Hook for sequential data fetching with controlled timing
 */
export const useSequentialFetch = (fetchFunctions, dependencies = [], options = {}) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const abortControllerRef = useRef(null)

  const { stepDelay = 100, onStepComplete } = options

  const executeSequentialRequests = useCallback(async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()
      
      setLoading(true)
      setError(null)
      setCurrentStep(0)
      setData({})

      for (let i = 0; i < fetchFunctions.length; i++) {
        if (abortControllerRef.current.signal.aborted) break

        const { key, fetchFn } = fetchFunctions[i]
        
        try {
          setCurrentStep(i)
          const result = await fetchFn()
          
          if (!abortControllerRef.current.signal.aborted) {
            setData(prev => ({ ...prev, [key]: result }))
            if (onStepComplete) onStepComplete(key, result, i)
            
            // Add delay between steps if specified
            if (stepDelay > 0 && i < fetchFunctions.length - 1) {
              await new Promise(resolve => setTimeout(resolve, stepDelay))
            }
          }
        } catch (stepError) {
          if (!abortControllerRef.current.signal.aborted) {
            setError(`Error en paso ${i + 1}: ${stepError.message}`)
            break
          }
        }
      }
    } catch (err) {
      console.error('Sequential fetch error:', err)
      setError(err.message)
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false)
      }
    }
  }, [fetchFunctions, stepDelay, onStepComplete])

  useEffect(() => {
    executeSequentialRequests()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, dependencies)

  const refetch = useCallback(() => {
    executeSequentialRequests()
  }, [executeSequentialRequests])

  return {
    data,
    loading,
    error,
    currentStep,
    progress: fetchFunctions.length > 0 ? (currentStep + 1) / fetchFunctions.length : 0,
    refetch
  }
}