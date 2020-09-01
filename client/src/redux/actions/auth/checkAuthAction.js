/* ----   CHECK_AUTH ACTION CREATOR    ---- */
import api from "../../../utils/api";

export const checkAuth = () => async dispatch => {
  const token = localStorage.getItem('jwt-token');

  if (!token) {
    console.log('[AUTH]: No Token')
    return dispatch({
      type: 'CHECK_AUTH',
      payload: {
        isLoggedIn: false,
        token: null
      }
    })
  }

  console.log(`[AUTH-TOKEN]: jwt-token=${token}`)
  const response = await api.get(
    '/user-id',
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
  dispatch({
     type: 'CHECK_AUTH',
     payload: {
       _id: response.data,
       token,
       isLoggedIn: true
     }
   })

}
/* ----   ****    ---- */