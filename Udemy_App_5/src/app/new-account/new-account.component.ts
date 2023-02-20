import { Component, EventEmitter, Output } from '@angular/core';
import { AccountsService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  //providers: [LoggingService],
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{ name: string; status: string }>();

  constructor(
    private loggingService: LoggingService,
    private accountService: AccountsService
  ) {
    this.accountService.statusUpdated.subscribe(
      (status: string) => alert("New status: " + status)
    );
  }

  // onCreateAccount(accountName: string, accountStatus: string) {
  //   this.accountAdded.emit({
  //     name: accountName,
  //     status: accountStatus
  //   });
  //console.log('A server status changed, new status: ' + accountStatus);

  // const service = new LoggingService(); //khoi tao service manually
  // service.logStatusChange(accountStatus);

  //Tuy nhien, sau khi cung cap providers, Angular hieu LoggingService la service cho component
  //Ghi dong nay thi Angular tu dong khoi tao LoggingService
  //   this.loggingService.logStatusChange(accountStatus);
  // }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
    //this.loggingService.logStatusChange(accountStatus);
  }
}
