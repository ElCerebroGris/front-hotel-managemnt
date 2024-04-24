import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Ficheiro } from 'src/app/models/ficheiro';
import { Area } from 'src/app/models/permission';
import { Sender } from 'src/app/models/sender';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css'],
})
export class ArquivosComponent implements OnInit {
  loading = true;
  idProcesso: string;
  processo: Sender = new Sender();
  ficheiros: Ficheiro[] = [];
  baseUrl = 'https://api-intranet.laboro.click';
  imageURL = '';
  obs = '';
  areas: Area[] = [];

  sourceUrl = '';
  pdfSourceUrl: any;
  @ViewChild('iframe', { static: false }) iframe!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private service: GeneralService,
    private auth: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.idProcesso = route.snapshot.params['idProcesso'];
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('processes/' + this.idProcesso).subscribe(
      (res) => {
        this.processo = res;
      },
      (error) => {
        this.loading = false;
      }
    );

    this.service.getter('files/process/' + this.idProcesso).subscribe(
      (res) => {
        this.ficheiros = res.content;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  file!: File;
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  actualizar() {
    if (this.file != null) this.uploadFile();
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('description', this.file.name);
    formData.append('obs', this.obs);
    formData.append('file', this.file);

    this.loading = true;

    this.service.postter('files', formData).subscribe(
      (res) => {
        this.carregar();
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updateProcess() {
    this.loading = true;

  }

  getArea(id: string) {
    let area = this.areas.filter((a) => a.uuid == id).pop();
    return area != null ? area.description : '';
  }

  getFilename(id: string) {
    const file = this.ficheiros.filter((f) => f.uuid == id).pop();
    return file != null ? file.name : '';
  }

  goToMover() {
    this.router.navigate(['processos/mover/' + this.idProcesso]);
  }

  showFile(uudi: string) {
    this.loading = true;
    this.pdfSourceUrl = this.getSafeUrl(this.baseUrl + '/api/files/' + uudi + '/download');
    this.loading = false;
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
