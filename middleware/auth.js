import cookies from 'js-cookie'
export default function ({store, redirect, route}) {
  const token = cookies.getJSON('x-access-token')
  const userIsLoggedIn = !(token === '')
  const urlRequiresAuth = /^\/admin(\/|$)/.test(route.fullPath)
  // const urlRequiresNonAuth = /^\/signin(\/|$)/.test(route.fullPath)
  if (!userIsLoggedIn && urlRequiresAuth) {
    return redirect('/signin')
  }
  /* if (userIsLoggedIn && urlRequiresNonAuth) {
    return redirect('/admin')
  } */
  return Promise.resolve()
}
