import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css'],
})
export class AdicionarComponent {
  saveCountry: FormGroup;
  userData: any = '';
  showMessage: boolean = false;
  showMessageError: boolean = false;

  constructor(
    private userService: ServiceService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.saveCountry = this.fb.group({
      name: ['', Validators.required],
      uf: ['', Validators.required],
      gentle: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userService.getDataUser().subscribe(
      (data) => {
        this.userData = data;
        console.log('Dados do usuário', this.userData);
      },
      (error) => {
        console.error('Erro ao obter dados do usuário:', error);
      }
    );
  }

  submitSaveCountries(): void {
    if (this.saveCountry.valid) {
      const { name, uf, gentle } = this.saveCountry.value;
      const data = { name, uf, gentle };
      this.userService.saveCountry(data).subscribe(
        (response) => {
          this.showMessage = true;
          setTimeout(() => {
            this.route.navigate(['home']);
          }, 2000);
        },
        (error) => {
          this.showMessageError = true;
          this.saveCountry.reset();
          setTimeout(() => {
            this.showMessageError = false;
          }, 2000);
          console.error('Erro ao salvar país:', error);
        }
      );
    }
  }
}
