import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../service';
import { FormGroup, FormControl } from '@angular/forms';

interface libro {
  _id: string;
  nombre: string;
  autor: string;
  editorial: string;
}

@Component({
  selector: 'table-libros',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent implements OnInit {
  constructor(private _apiservice: ApiService, private modalService: NgbModal) {}

  libros: libro[] = [];
  formDatos!: FormGroup;
  modalRef!: NgbModalRef;

  ngOnInit() {
    this.formDatos = new FormGroup({
      nombre: new FormControl(),
      autor: new FormControl(),
      editorial: new FormControl(),
    });

    this._apiservice.getData().subscribe( data => {
      this.libros = data;
    });
    
  }

  openModal(content: any) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      centered: true,
    });
  }

  onClickSubmit(data: any) {
    this._apiservice.postData(data.nombre, data.autor, data.editorial);
  }

  deleteRow(item: any) {
    this._apiservice.deleteData(item._id);
    this._apiservice.getData().subscribe( data => {
      this.libros = data;
    });
    this.modalRef.close();
  }
}

