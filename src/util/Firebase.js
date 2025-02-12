const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

  constructor() {
    this._config = {
      apiKey: "AIzaSyDzvYT_5oPm6jH9c3-3wqsYb_8ib8Htmqs",
      authDomain: "whats-clone-andryll.firebaseapp.com",
      projectId: "whats-clone-andryll",
      storageBucket: "whats-clone-andryll.firebasestorage.app",
      messagingSenderId: "749662237621",
      appId: "1:749662237621:web:e2b54376be5fc9d3271ffc",
      measurementId: "G-H3PJJ7D2K0"
    }

    this.init();
  }

  init() {

    if(!this.initialized){
      firebase.initializeApp(this._config)

      firebase.firestore().settings({
        timestampsInSnapshots: true
      })

      this.initialized = true;
    }
  }

  static db(){
    return Firebase.firestore();
  }

  static hd(){
    return Firebase.storage()
  }

  initAuth(){

    return new Promise((s, f) => {

      let provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider)
      .then(result => {
        let token = result.credential.acessToken;
        let user = result.user;

        s({
          user,
          token
        });
      })
      .catch(err => {
        f(err)
      })
    })
  }
}