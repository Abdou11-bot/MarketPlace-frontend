import { Component, OnInit , OnDestroy} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { SessionStorageService } from '../../../../services/sessionStorage.service';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']

})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  constructor( private StorageService: LocalStorageService, private router: Router, public sanitizer: DomSanitizer) {  }
  ngOnDestroy(){
  }

  ngOnInit(): void {
  }
}

