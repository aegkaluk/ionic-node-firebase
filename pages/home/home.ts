import { Component } from '@angular/core';
import { NavController,ModalController,LoadingController  } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { AddPage } from '../add/add';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  students:any;
  indx:string;
  mediaPath:string;

  constructor(public navCtrl: NavController,private dataService: ServiceProvider,public modalCtrl:ModalController,public loadingCtrl: LoadingController) {
    this.onLoad();
  }

  onLoad(){
    let loader = this.loadingCtrl.create({
      content:"Loading.."
    });
    loader.present();

    this.dataService.getData().subscribe(res=>{
      console.log(res);
      this.students = this.dataService.mapDataObj(res);
      //console.log(this.students);
      loader.dismiss();
    })

  }

  addPage(indx){
    console.log('addPage() indx: '+indx);
    this.indx = indx;
    let modal = this.modalCtrl.create(AddPage,this.students[indx]);

    modal.onDidDismiss(student => {
      if(student){
        if(student.name==undefined && student.surname==undefined && student.code==undefined){
          this.dataService.presentToast("Can't add");
          return;
        }
        //console.log("onDidDismiss: ",student);
        //this.dataService.presentToast("student id:"+student.id);
        if(student.id!=undefined && student.id!=''){
            console.log("Update");
           this.dataService.updateData(student).subscribe(res => {
              //console.log("indx:"+this.indx);
              this.students[indx] = student;
              this.dataService.presentToast("updated: "+student.name);
              console.log(res);
            })
        }else{
            console.log("Insert");
            this.dataService.addData(student).subscribe(res =>{
              console.log("returnID:"+res.id);
              student.id = res.id;
              this.students.push(student);
              //this.onLoad(); //save bandwidth reload data
              this.dataService.presentToast("added: "+student.name);
              console.log(res);
            })
        }

      }
    })
    modal.present();

  }
  deleteData(student):void{

    let loader = this.loadingCtrl.create({
      content:"Loading.."
    })
    loader.present();

    let index = this.students.indexOf(student);
    if(index>-1){
      this.students.splice(index,1); //Remove ion-item from ion-list
    }
    this.dataService.deleteData(student.id).subscribe(res => {
        console.log(res);
        this.dataService.presentToast("deleted: "+student.name);
        loader.dismiss();
    })

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      this.onLoad();
      refresher.complete();
    }, 500);
  }



}
     /*const obj = {5.0: 10, 28.0: 14, 3.0: 6};
     console.log(obj);
     const mapped = Object.keys(obj).map(key => ({type: key, value: obj[key]}));
     console.log(mapped);*/
