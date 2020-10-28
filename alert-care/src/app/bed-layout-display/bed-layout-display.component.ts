import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';  
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bed-layout-display',
  templateUrl: './bed-layout-display.component.html',
  styleUrls: ['./bed-layout-display.component.css']
})


export class BedLayoutDisplayComponent implements OnInit {
  msg;
  httpClient:HttpClient
  connection:signalR.HubConnection
  
  constructor(httpClient:HttpClient) {  this.httpClient = httpClient}

  ngOnInit(): void {
     this.connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44369/alert").build();

     this.connection.start()  
    .then(() => { 
       
      console.log('MessageHub Connected');  
    }); 
     
     this.connection.start()  
    .then(() => { 
      this.connection.invoke('SendVitalAlerts').catch(err => console.error(err)) 
      console.log('MessageHub Connected');  
    }); 
    
    this.connection.on('ReceiveAlerts', (data) => { 
      console.log("server Data");
      this.msg = data;
        console.log(this.msg);
         
    });  
      
    /*this.httpClient.get('https://localhost:44369/api/PatientMonitor/').subscribe(data=>{console.log(data)},
    err=>{console.log(err)}
    )*/
  }

}
