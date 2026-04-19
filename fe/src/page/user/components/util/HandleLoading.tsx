import ErrorLoad from './ErrorLoad'
import LoadingPage from './LoadingPage'

interface IHandleLoading {
  children?: React.ReactNode
  isLoading: boolean
  error_message: string
}

export default function HandleLoading({ isLoading, error_message, children }: IHandleLoading) {
  if (isLoading) return <LoadingPage />
  if (error_message) return <ErrorLoad error_message={error_message} />
  return <>{children}</>
}
