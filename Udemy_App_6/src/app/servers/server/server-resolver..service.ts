import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

//Khac voi canActivate / canDeactivate, Resolver khong quyet dinh route hay component co duoc tai len hay khong, Resolver luon render component
//nhung truoc do, resolver co the load data
//Day la mot cach khac ngoai viec trien khai trong ngOnInit()
@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}
