import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  id:string;
  name:string;
  surname:string;
  code: string;
  imageUpload:any;
  imageURI:any;
  imageName:any;
  mediaPath:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public loadingCtrl: LoadingController) {//private dataService:ServiceProvider,private camera:Camera,private transfer: FileTransfer
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
    console.log("imageName:"+this.imageName);
    this.onLoad();
  }

  onLoad(){
    //this.mediaPath = this.dataService.getMediaPath();
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    this.surname = this.navParams.get('surname');
    this.code = this.navParams.get('code');
    this.imageName = this.navParams.get('imageName');
    if(this.imageName!=undefined && this.imageName!=null){
      this.imageURI = this.mediaPath+"/"+this.imageName;
    }
  }
  save(): void {
    //this.saveData();
    this.callBackHome();
  }

  close(): void {
    this.viewCtrl.dismiss();
  }

  callBackHome(){
    if(this.imageName==undefined){ this.imageName='default.png'; }
    let student = {
      id:this.id,
      name:this.name,
      surname: this.surname,
      code: this.code,
      imageName :this.imageName
    };
    this.viewCtrl.dismiss(student);
  }

}
