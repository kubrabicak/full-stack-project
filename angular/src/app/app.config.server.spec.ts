import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './config/app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

describe('App Configuration', () => {
  it('should merge appConfig and serverConfig correctly', () => {
    const mergedConfig = config as ApplicationConfig;

    console.log(mergedConfig);

    // Check if providers array exists and contains the right number of elements
    expect(mergedConfig.providers).toBeTruthy(); // Ensure providers exist
    expect(mergedConfig.providers.length).toBeGreaterThan(0); // Ensure there is at least one provider

    // Check if the expected provider (provideServerRendering) is in the list
    expect(mergedConfig.providers).toContain(provideServerRendering());
  });
});
