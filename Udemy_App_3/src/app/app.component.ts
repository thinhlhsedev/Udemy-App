import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements = [{ type: 'server', name: 'abcde', content: 'abcdef' }];

  onServerAdded(serverData: { serverName: string; serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent,
    });
  }

  onAddBlueprintAdded(bluePrint: { serverName: string; serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: bluePrint.serverName,
      content: bluePrint.serverContent,
    });
  }
}
