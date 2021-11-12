import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SongService} from "../shared/song.service";
import {SongModel} from "../shared/song.model";
import {CategoryModel} from "../shared/category.model";
import {UserService} from "../shared/user.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search = '';
  catSearch;
  songList: SongModel[];
  categoryList: CategoryModel[];
  currentUser;
  closeResult: string;
  songId;

  totalLength: number;
  page: number = 1;

  constructor(private renderer:Renderer2,private route: ActivatedRoute, private router: Router, private songService: SongService, private userService: UserService, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.songService.getSongs().subscribe(
      (resolve: SongModel[]) => {
        this.songList = resolve;
        this.totalLength = this.songList.length;
      },
      error => {
        console.log(error);
      }
    );

    this.userService.getCurrentUser().subscribe(
      (resolve) =>
        this.currentUser = resolve,
      error =>
        console.log(error));

    this.songService.getCategories().subscribe(
      (resolve: SongModel[]) => {
        this.categoryList = resolve;
      },
      error => {
        console.log(error);
      }
    );

  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }


  getSongCategory(songId: number): string {

    let s = this.songList.find(x => x.Id === songId);
    let cat = this.categoryList.find(x => x.Id === s.categoryId);

    return cat.name;
  }

  onHome() {
    location.reload();
  }

  openDetails(targetModal, song: SongModel) {
    this.modalService.open(targetModal, {
      centered: true,
      size: 'lg'
    });
    document.getElementById('image').setAttribute('src', song.imageCurrent);
    document.getElementById('modal-basic-title').innerText = song.name;
    document.getElementById('artistName').innerText = song.artistName;
    document.getElementById('songUrl').innerText=song.songUrl;
    document.getElementById('dateOfAdding').innerText = (song.dateOfAdding).toString().slice(0, 10);
    document.getElementById('categoryId').innerText = (this.getSongCategory(song.Id));

    this.songId = song.Id;

  }


  onEdit() {
    this.router.navigate(['song'],{queryParams: {Id:this.songId}});
  }

  onDelete() {
    const answer = confirm("This song will be deleted permanently! Are you sure?");
    if (answer) {
      this.songService.deleteSong(this.songId).subscribe(
        (res) => {
          this.modalService.dismissAll();
          location.reload();
          return res;
        });
    } else {
      location.reload();
    }
  }

}
