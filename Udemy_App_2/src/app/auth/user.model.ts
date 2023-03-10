export class User {
  constructor(
    public email: string,
    public id: string,
    private token: string,
    private tokenExpirationDate: Date
  ) {}

  get Token(){
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.token;
  }
}
