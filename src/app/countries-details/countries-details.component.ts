import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries-details',
  templateUrl: './countries-details.component.html',
  styleUrls: ['./countries-details.component.css'],
})
export class CountriesDetailsComponent {
  country: any;
  changeCountry: FormGroup;
  showMessage: boolean = false;
  showMessageError: boolean = false;
  userData: any = '';

  constructor(
    private route: ActivatedRoute,
    private countryService: ServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.changeCountry = this.fb.group({
      name: ['', Validators.required],
      uf: ['', Validators.required],
      gentle: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const countryId = params['id'];

      this.countryService.getCountryDetails(countryId).subscribe((country) => {
        this.country = country;
        console.log('alterar', this.country);
      });
    });
    this.getData();
  }

  getData() {
    this.countryService.getDataUser().subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
        console.error('Erro ao obter dados do usuário:', error);
      }
    );
  }

  submitChangeCountry(): void {
    this.route.params.subscribe((params) => {
      const countryId = params['id'];
      if (this.changeCountry.valid) {
        const { name, uf, gentle } = this.changeCountry.value;
        const data = { name, uf, gentle };
        this.countryService
          .changeCountry(data, countryId)
          .subscribe((response) => {
            this.showMessage = true;
            setTimeout(() => {
              this.router.navigate(['home']);
            }, 2000);
          });
      } else {
        this.showMessageError = true;
        this.changeCountry.reset();
        setTimeout(() => {
          this.showMessageError = false;
        }, 2000);
      }
    });
  }
}
