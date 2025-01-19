import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { ErrorHandlingService } from './error-handling.service';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;
  let mockRenderer: jasmine.SpyObj<Renderer2>;
  let rendererFactory: jasmine.SpyObj<RendererFactory2>;

  beforeEach(() => {
    // Mock Renderer2
    mockRenderer = jasmine.createSpyObj('Renderer2', [
      'createElement',
      'addClass',
      'createText',
      'appendChild',
      'removeChild',
      'listen',
    ]);

    // Mock RendererFactory2
    rendererFactory = jasmine.createSpyObj('RendererFactory2', ['createRenderer']);
    rendererFactory.createRenderer.and.returnValue(mockRenderer);

    TestBed.configureTestingModule({
      providers: [
        ErrorHandlingService,
        { provide: RendererFactory2, useValue: rendererFactory },
      ],
    });

    service = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and append an error notification to the DOM', () => {
    const mockNotification = {};
    const mockCloseButton = {};
    const mockText = {};
    const mockCloseText = {};

    // Mock Renderer2 method calls
    mockRenderer.createElement.and.callFake((element) => {
      if (element === 'div') return mockNotification;
      if (element === 'button') return mockCloseButton;
      return {};
    });
    mockRenderer.createText.and.callFake((text) => {
      if (text === '✖') return mockCloseText;
      return mockText;
    });

    service.handleError('Test error message');

    // Assertions
    expect(mockRenderer.createElement).toHaveBeenCalledWith('div');
    expect(mockRenderer.addClass).toHaveBeenCalledWith(mockNotification, 'error-notification');

    expect(mockRenderer.createText).toHaveBeenCalledWith('Test error message');
    expect(mockRenderer.appendChild).toHaveBeenCalledWith(mockNotification, mockText);

    expect(mockRenderer.createElement).toHaveBeenCalledWith('button');
    expect(mockRenderer.addClass).toHaveBeenCalledWith(mockCloseButton, 'close-btn');

    expect(mockRenderer.createText).toHaveBeenCalledWith('✖');
    expect(mockRenderer.appendChild).toHaveBeenCalledWith(mockCloseButton, mockCloseText);
    expect(mockRenderer.appendChild).toHaveBeenCalledWith(mockNotification, mockCloseButton);

    expect(mockRenderer.appendChild).toHaveBeenCalledWith(document.body, mockNotification);

    expect(mockRenderer.listen).toHaveBeenCalledWith(
      mockCloseButton,
      'click',
      jasmine.any(Function)
    );
  });

  it('should automatically remove the notification after 5 seconds', fakeAsync(() => {
    const mockNotification = {};

    // Mock Renderer2 method calls
    mockRenderer.createElement.and.returnValue(mockNotification);

    spyOn(document.body, 'contains').and.callFake((element) => element === mockNotification);

    service.handleError('Test error message');

    // Simulate time passing
    tick(5000);

    expect(mockRenderer.removeChild).toHaveBeenCalledWith(document.body, mockNotification);
  }));

  it('should remove the notification on close button click', () => {
    const mockNotification = {};
    const mockCloseButton = {};

    mockRenderer.createElement.and.callFake((element) => {
      if (element === 'div') return mockNotification;
      if (element === 'button') return mockCloseButton;
      return {};
    });

    let clickHandler: (event: any) => void = () => {};

    mockRenderer.listen.and.callFake((element, event, handler) => {
      if (element === mockCloseButton && event === 'click') {
        clickHandler = handler;
      }
      return () => {};
    });

    service.handleError('Test error message');

    // Simulate the button click
    clickHandler(new Event('click'));

    // Assert that removeChild has been called to remove the notification
    expect(mockRenderer.removeChild).toHaveBeenCalledWith(document.body, mockNotification);
  });
});
