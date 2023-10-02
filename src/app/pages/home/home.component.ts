import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  p: number = 1;
  userData: any = '';
  countries: any = '';
  token: any = '';
  filterCountry: string = '';

  ngOnInit(): void {
    this.getData();
    this.getCountries();
  }

  constructor(
    private userService: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  getCountries() {
    this.userService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  getData() {
    this.userService.getDataUser().subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
        console.error('Erro ao obter dados do usuário:', error);
      }
    );
  }

  getToken(): void {
    this.token = this.userService.getToken();
    if (this.token) {
      this.token = this.token.replace(/["']/g, '');
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
