import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changedSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //Cach lay query param
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    //Subcribe route params to update the id if params change

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changedSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.changedSaved = false;
    if (!this.allowEdit) {
      return true;
    }
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changedSaved
    ) {
      return confirm('Do you want to discard change ?');
    } else {
      return true;
    }
  }
}
