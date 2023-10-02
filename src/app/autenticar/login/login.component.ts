import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  successMessage: boolean = false;
  errorMessage: boolean = false;

  constructor(
    private authService: ServiceService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(
        (response) => {
          localStorage.setItem('token', JSON.stringify(response));
          this.successMessage = true;
          setTimeout(() => {
            this.route.navigate(['home']);
          }, 2000);
        },
        (error) => {
          console.log('Erro', error);
          this.errorMessage = true;
          setTimeout(() => {
            this.errorMessage = false;
          }, 2000);
          this.loginForm.reset();
        }
      );
    }
  }
}
