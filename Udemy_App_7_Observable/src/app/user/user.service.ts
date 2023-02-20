import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  //activatedEmitter = new EventEmitter<boolean>();

  //Subject la mot dang dac biet cua observable
  //Observale bi dong hon Subject, neu data thay doi, Observable don nhan thay doi ngay lap tuc
  //Subject khong duoc dung voi @Output, dung trong giao tiep voi service
  activatedEmitter = new Subject<boolean>();
}
