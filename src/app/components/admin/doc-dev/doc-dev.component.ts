import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-doc-dev',
  templateUrl: './doc-dev.component.html',
  styleUrls: ['./doc-dev.component.css']
})
export class DocDevComponent {

  htmlContent: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    // Load the HTML content from your file (replace with your file path)
    const htmlFilePath = 'assets/ombala_api_doc.html';

    // Fetch the HTML content and sanitize it
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(
      this.fetchHTMLContent(htmlFilePath)
    );
  }

  private fetchHTMLContent(filePath: string): string {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, false);
    xhr.send();

    if (xhr.status === 200) {
      return xhr.responseText;
    } else {
      console.error('Failed to load HTML file.');
      return '';
    }
  }

}
