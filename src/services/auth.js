import firebase from './config'

const provider = new firebase.auth.GoogleAuthProvider()

export function onLogin (cb, fail) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      if (user.email.includes('@adevinta.com')) {
        cb(user)
      } else {
        fail()
      }

    }
  })
}

export function onLogout () {
  return firebase.auth().signOut()
}

export function signInWithPopup () {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .catch(function (error) {
      console.log(error)
    })
}

export function isLoggedIn () {
  return firebase.auth().currentUser !== null
}
