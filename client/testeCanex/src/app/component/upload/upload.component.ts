import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/service/upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  resData: any;
  selectedFiles: any[] = [];

  id: string = '';

  constructor(private service: UploadService) { }

  ngOnInit(): void {
  }

  onFileSelect(event: any) {

      for (let i = 0; i < event.target.files.length; i++){
        let file = event.target.files[i];
        this.selectedFiles.push(file);
      }

  }

  onSubmit(){
    const formData = new FormData();

    formData.append("id", this.id);

    this.selectedFiles.forEach(file => {
      formData.append("files", file, file.name);
    });

    this.service.salvar(formData).subscribe(
      result => {
        this.mostraMensagem("Arquivo(s) enviado(s) corretamente!", "success")
      },
      error => {
        this.mostraMensagem("Não foi possível enviar o(s) arquivo(s)", "danger");
        console.log(error);
      }
    );

  }

  mostraMensagem(mensagem: string, nivel: string){
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    const alert = (message: string, level: string) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${level} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
      ].join('')

      alertPlaceholder.append(wrapper)

      setTimeout(() => {
        wrapper.remove();
      }, 3000);
    }

    alert(mensagem, nivel)

  }

}
