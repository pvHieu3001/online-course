import { Outlet } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { userActions } from '@/actions'
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from '../app/constants'

const Layout = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    openSnackbar: false
  })
  const { openSnackbar } = state

  const handleSnackbarOpen = () => {
    setState({ ...state, openSnackbar: true })
  }

  const handleSnackbarClose = () => {
    setState({ ...state, openSnackbar: false })
  }

  const userLoggedIn = useSelector((state) => state.user.userLoggedIn)
  const alert = useSelector((state) => state.alert)
  const error = useSelector((state) => state.error)

  useEffect(() => {
    dispatch(userActions.getUserLoggedIn())
  }, [])

  useEffect(() => {
    if (userLoggedIn && userLoggedIn.error && location.pathname != '/reissue-password') {
      localStorage.removeItem(LOCAL_STORAGE_USER)
      localStorage.removeItem(LOCAL_STORAGE_TOKEN)
    }
    error
  }, [userLoggedIn])

  useEffect(() => {
    if (alert.message) {
      handleSnackbarOpen()
    }
  }, [alert])

  return (
    <>
      <Outlet />
      {alert.message && (
        <Snackbar
          autoHideDuration={10000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnackbar}
          onClose={handleSnackbarClose}
          key='personnelpage-snackbar'
        >
          <Alert onClose={handleSnackbarClose} severity={alert.type}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default Layout
