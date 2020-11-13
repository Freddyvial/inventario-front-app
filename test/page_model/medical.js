import { Selector, t } from "testcafe";
export default class medical {
  constructor() {
    this.clickButtonNew = Selector('body > app-home > app-medical > div > button > span');
    this.sendNumberMedical = Selector('#mat-input-3')
  }
}