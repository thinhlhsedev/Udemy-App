export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    //fake auth
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn)
        }, 800);
      }
    );
    return promise;
  }

  login() {
    this.loggedIn =true;
  }

  logout() {
    this.loggedIn = false;
  }
}
