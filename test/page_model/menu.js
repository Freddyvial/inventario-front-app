import { Selector, t } from "testcafe";
export default class login {
  constructor() {
    this.displayMenu = Selector('body > app-home > mat-toolbar > button > span');
    this.clickLogin = Selector('#mat-menu-panel-0 > div > button:nth-child(1) > a')
  }
}