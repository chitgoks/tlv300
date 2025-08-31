import { Component } from '@angular/core';
import { WhoisService } from './whois.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [WhoisService]
})
export class AppComponent {
  domain = '';
  type: 'domain' | 'contact' = 'domain';
  loading = false;
  error = '';
  result: any = null;

  constructor(private whois: WhoisService) {}

  lookup() {
    this.error = '';
    this.result = null;
    let domain = (this.domain || '').trim();
    
    if (!domain) {
      this.error = 'Please enter a domain name.';
      return;
    }
    // If no suffix, add .com.
    if (!/\.[a-zA-Z]{2,}$/.test(domain)) {
      domain += '.com';
    }
    
    // Validate after appending.
    const domainPattern = /^[^\s.]+\.[a-zA-Z]{2,}$/;
    if (!domainPattern.test(domain)) {
      this.error = 'Please enter a valid domain name.';
      return;
    }
    
    this.loading = true;

    this.whois.lookup(domain, this.type).subscribe({
      next: (res) => {
        this.loading = false;
        this.result = res;
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Lookup failed.';
      }
    });
  }

  keys(obj: any) {
    return obj ? Object.keys(obj) : [];
  }
}
