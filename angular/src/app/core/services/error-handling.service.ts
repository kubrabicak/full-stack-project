import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { HIGHLIGHT_TIMEOUT } from "../../constants/user.constants";

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  handleError(message: string): void {
    // Create the notification container
    const notification = this.renderer.createElement('div');
    this.renderer.addClass(notification, 'error-notification');

    // Add the message text
    const text = this.renderer.createText(message);
    this.renderer.appendChild(notification, text);

    // Add a close button
    const closeButton = this.renderer.createElement('button');
    this.renderer.addClass(closeButton, 'close-btn');
    const closeText = this.renderer.createText('✖');
    this.renderer.appendChild(closeButton, closeText);

    // Append the close button to the notification
    this.renderer.appendChild(notification, closeButton);

    // Append the notification to the body
    this.renderer.appendChild(document.body, notification);

    // Close the notification on click
    this.renderer.listen(closeButton, 'click', () => {
      this.renderer.removeChild(document.body, notification);
    });

    // Automatically remove the notification after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        this.renderer.removeChild(document.body, notification);
      }
    }, HIGHLIGHT_TIMEOUT);
  }
}
