import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpClient,HttpClientModule, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'formdata-upload',
  templateUrl: './formdata-upload.component.html'
})
export class FormdataUploadComponent {
  form: FormGroup;
  loading: boolean = false;
  status:boolean=false;
  

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,public http: HttpClient) {
    this.createForm();
  }
  
  createForm() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      imagemBinary: null
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('imagemBinary').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('Titulo', this.form.get('titulo').value);
    input.append('imagemBinary', this.form.get('imagemBinary').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    setTimeout(() => {
      // tslint:disable-next-line: max-line-length
      const token = 'Token Aqui'; //'Bearer xyz
      const headers = new HttpHeaders()
            .set('Authorization', token);
      let url='https://condomy.herokuapp.com/api/Condominio/dac0cd34-9f0d-430e-8f0e-d7aa6b426b9a/ata';

      this.http.post<any>(url, formModel, {headers} ).subscribe(data => {
        console.log(data);
        alert('done!');
        this.loading = false;
        this.status = data.sucesso;
    });

    }, 1000);
  }
 


  clearFile() {
    this.form.get('imagemBinary').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
