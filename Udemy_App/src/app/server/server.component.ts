import { Component } from "@angular/core";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html"
})

export class ServerComponent {
  serverID : number = 10;
  serverStatus : string = "Online";

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? "Online": "Offline";
  }

  gerServerStatus(){
    return this.serverStatus;
  }

  getColor(){
    return this.serverStatus === "Online" ? "green" : "red";
  }
}
