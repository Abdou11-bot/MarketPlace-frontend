import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage.service';
import { SessionStorageService } from '../../services/sessionStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private StorageService: LocalStorageService) { }

  ngOnInit(): void {
  //  alert(this.StorageService.getUserFromStorage());
  }

}
