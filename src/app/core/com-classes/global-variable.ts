export class GlobalVariable {

  private _appConfig: any = {};
  private _waitingAppInit = false;
  private _authentication: any = {};
  private _navigationMenu: any = [];


  get appConfig(): any {
    return this._appConfig;
  }
  set appConfig(value: any) {
    this._appConfig = value;
  }

  get waitingAppInit(): boolean {
    return this._waitingAppInit;
  }
  set waitingAppInit(value: boolean) {
    this._waitingAppInit = value;
  }

  get authentication(): any {
    return this._authentication;
  }
  set authentication(value: any) {
    this._authentication = value;
  }

  get navigationMenu(): any {
    return this._navigationMenu;
  }
  set navigationMenu(value: any) {
    this._navigationMenu = value;
  }
}
