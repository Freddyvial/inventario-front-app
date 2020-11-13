import { Selector, t } from "testcafe";
export default class login {
  constructor() {
    this.userName = Selector('#mat-input-0');
    this.password = Selector('#mat-input-1');
    this.submit = Selector('body > app-home > app-login > mat-card > button > span');
  }
}