import { config } from '@nuxt/test-utils';

// Mock Nuxt client-side component
config.stubs['client-only'] = '<div><slot /></div>';