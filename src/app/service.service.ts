import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ServiceService {
  private baseUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}api/v1/jwt/create`,{ username, password});
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getDataUser():Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/api/v1/users/me`, { headers })
  }

  getCountries() {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/api/v1/countries`, { headers })
  }

  saveCountry(data: { name: string, uf: string, gentle: string }): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/api/v1/countries/`, data, { headers })
  }

  changeCountry(data: { name: string, uf: string, gentle: string}, id: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/api/v1/countries/${id}/`, data, { headers })
  }

  getCountryDetails(id: string) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/api/v1/countries/${id}`, { headers });
  }

  deleteCountry(id: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/api/v1/countries/${id}`, { headers });
  }

  getToken(): string | null {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      try {
        // Converte a string JSON em um objeto JavaScript
        const tokenObject = JSON.parse(tokenString);
        // Extrai o valor do token (por exemplo, 'access' ou 'refresh')
        const tokenValue = tokenObject.access; // Ou tokenObject.refresh, dependendo do que você precisa
        if (typeof tokenValue === 'string') {
          return tokenValue;
        }
      } catch (error) {
        console.error('Erro ao analisar o token JSON:', error);
      }
    }
    return null;
  }
}
