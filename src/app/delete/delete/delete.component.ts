import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent {
  country: any;
  deletedMessage: boolean = false;
  deletedMessageError: boolean = false;
  userData: any = '';

  constructor(
    private route: ActivatedRoute,
    private countryService: ServiceService,
    private router: Router
  ) {}

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

  deleteCountry(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log('id', id);
      this.countryService.deleteCountry(id).subscribe(
        () => {
          this.deletedMessage = true;
          setTimeout(() => {
            this.router.navigate(['home']);
          }, 2000);
          console.log('sucesso');
        },
        (error) => {
          console.log('Erro', error);
          this.deletedMessageError = true;
        }
      );
    });
  }
}
