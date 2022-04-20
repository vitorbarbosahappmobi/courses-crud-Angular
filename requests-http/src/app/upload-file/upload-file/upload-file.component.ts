import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from '../../../app/shared/rxjs-operators';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;
  progress: number = 0;
  loadingBar!: boolean;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    const selectedFiles = <FileList>event.srcElement.files;
    this.files = new Set();
    const fileNames = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customLabel')!.innerHTML = fileNames.join(', ')
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, '/api/upload')
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload concluído'));
      // .subscribe((event: HttpEvent<Object>) => {
      //   if (event.type == HttpEventType.Response) {
      //     console.log('Upload concluído');
      //     this.loadingBar = false;
      //   } else if (event.type == HttpEventType.UploadProgress) {
      //     this.loadingBar = true;
      //     const percentDone = Math.round((event.loaded * 100) / event.total!);
      //     this.progress = percentDone;
      //   }
      // });
    }
  }

  onDownloadExcel() {
    this.service.download('/api/downloadExcel')
      .subscribe((res: any) => {
        this.service.handleFile(res, 'report.xlsx');
      });
  }

  onDownloadPDF() {
    this.service.download('/api/downloadPDF')
      .subscribe((res: any) => {
        this.service.handleFile(res, 'report.pdf');
      });
  }
}
