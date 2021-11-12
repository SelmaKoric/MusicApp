import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SongModel} from "./song.model";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  apiUrl = 'https://localhost:44384/api';

  constructor(private http: HttpClient) {

  }

  getSongs() {
    return this.http.get(this.apiUrl + "/song/songList");
  }

  getCategories() {
    return this.http.get(this.apiUrl + "/song/categoryList");

  }

   addSong(song:SongModel){
    return this.http.post(this.apiUrl+"/song",song,{
    });
   }

   getSong(songId:number){
    return this.http.get(this.apiUrl+'/song/getSong',{params:{'Id':songId}});

   }

   deleteSong(songId:number){
    return this.http.delete(this.apiUrl+'/song',{params: {'Id':songId}});
   }

   editSong(songId:number,song:SongModel){
    return this.http.put(this.apiUrl+'/song/editSong?Id='+songId, song);
   }

}

