import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public _loading: boolean = false;

  public loading(): boolean {
    return this._loading;
  }

  public onRequestStarted(): void {
    this._loading = true;
  }

  public onRequestFinished(): void {
    this._loading = false;
  }
  constructor() { }
}
