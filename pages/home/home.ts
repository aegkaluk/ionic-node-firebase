import { Component } from '@angular/core';
import { NavController,ModalController,LoadingController  } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  objectKeys = Object.keys;
  students:any;

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
      console.log(this.students);
      loader.dismiss();
    })

  }


}
     /*const obj = {5.0: 10, 28.0: 14, 3.0: 6};
     console.log(obj);
     const mapped = Object.keys(obj).map(key => ({type: key, value: obj[key]}));
     console.log(mapped);*/
