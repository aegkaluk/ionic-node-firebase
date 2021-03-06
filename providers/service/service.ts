import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController,LoadingController } from 'ionic-angular';
import "rxjs/add/operator/map";

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: HttpClient,public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    console.log('Hello ServiceProvider Provider');
  }

  //serverURL:String = "http://localhost:8080";
  serverURL:String = "https://phuketbikelover-199209.appspot.com";
  mediaPath:string;

  getMediaPath(){
    return this.mediaPath;
  }
  setMediaPath(val){
    this.mediaPath = val;
  }

  getData(){
    console.log("getData()");
    return this.http.get(this.serverURL+'/show/students').map(res=> res );

  }
  addData(student){
    console.log("addData()");
    return this.http.post(this.serverURL+'/add/student',student).map(res => res );
  }

  updateData(student){
    console.log("updateData()"+student.id);
    return this.http.put(this.serverURL+'/update/student/'+student.id, student).map(res=>res);
  }

  deleteData(id){
    console.log("deleteData() id:"+id);
    return this.http.delete(this.serverURL+'/delete/student/'+id).map(res => res );
  }

  mapDataObj(obj){
    let output:Array<any> = [];
    for (var key in obj) {  output.push(obj[key])   }
    return output;
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  createFileName(){
    var d = new Date(),
    n = d.getTime(),
    newFileName=n+".jpg";
    return newFileName;
  }



}
