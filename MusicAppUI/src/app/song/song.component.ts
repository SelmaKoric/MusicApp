import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongService} from "../shared/song.service";
import {SongModel} from "../shared/song.model";
import {CategoryModel} from "../shared/category.model";
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
 categoryList:CategoryModel[];
 url;
 form: FormGroup=new FormGroup({
   'name':new FormControl(null,Validators.required),
   'artistName':new FormControl(null,Validators.required),
   'categoryId':new FormControl(1,Validators.required),
   'songUrl':new FormControl(null,Validators.required),
   'imageCurrent':new FormControl(null,Validators.required)
 });
 IdSong:number;

  constructor(private http:HttpClient,private songService: SongService, private router: Router,private route: ActivatedRoute) {}

    ngOnInit(): void {

    this.songService.getCategories().subscribe(
      (resolve:SongModel[])=>{
        this.categoryList=resolve;
      },
      error=>{
        console.log(error);
      }
    );

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.IdSong = +urlParams.get('Id');

    if(this.IdSong!==0){
      this.songService.getSong(this.IdSong).subscribe(
        (res:SongModel)=> {
          this.editSong(res);
        }
      );}

    }

  onImageUpload(event: Event) {
    const target= event.target as HTMLInputElement;
     let file: File = (target.files as FileList)[0];
      let reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=(event:any)=>{
        this.url=event.target.result;

        this.form.patchValue({
          imageCurrent: reader.result
        });
      }

    }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }


  onSubmit() {

  if(this.IdSong!==0){
this.songService.editSong(this.IdSong,this.form.value).subscribe(
  (res)=>{
    this.router.navigate(['/home']);
  })
    }
  else{
    this.songService.addSong(this.form.value).subscribe(
      (resolve:any)=>{
        this.form.reset();
        this.url='';
      },
      error => {
        console.log(error);
      }
    );}

  }

  private editSong(song: SongModel) {
    this.form.patchValue({
      'name': song.name,
      'artistName':song.artistName,
      'categoryId':song.categoryId,
      'songUrl':song.songUrl,
      'imageCurrent':song.imageCurrent
    });
  }
}
