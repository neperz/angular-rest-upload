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
      name: ['', Validators.required],
      avatar: null
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('Titulo', this.form.get('name').value);
    input.append('imagemBinary', this.form.get('avatar').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;    
    setTimeout(() => {
      const token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjcxODBhMi02MjBlLTRlNGMtOWY2Ni01ZTIyOTM1ZWY0ZDkiLCJlbWFpbCI6ImFkbWluQGNvbmRvbXkuY29tLmJyIiwianRpIjoiNTM4NThjNjQtYTczMi00Nzc3LWI5NDgtOTAzM2I0MWJjOWEzIiwiaWF0IjoxNjAyNTE0OTQ0LCJpc0FkbWluIjoiVHJ1ZSIsIm5iZiI6MTYwMjUxNDk0NCwiZXhwIjoxNjAyNTIyMTQ0LCJpc3MiOiJjb25kb215IiwiYXVkIjoiKiJ9.sms_uV1dz9SC4U--GK0dx_VSYYw7h9Fc7ZSoMJHgHog';
     // const headers = { 'Authorization': token };
      const headers = new HttpHeaders()
            .set("Authorization", token);
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
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
