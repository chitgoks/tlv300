import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhoisService {
  private API_URL = 'http://localhost:5000/api/whois';

  constructor(private http: HttpClient) {}

  lookup(domain: string, type: 'domain' | 'contact'): Observable<any> {
    return this.http.post(this.API_URL, { domain, type });
  }
}
