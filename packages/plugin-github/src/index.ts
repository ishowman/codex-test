import type { PluginManifest } from '@plugins/sdk';

export const manifest: PluginManifest = {
  id: 'github',
  name: 'GitHub Integration',
  version: '0.1.0',
  description: 'Create issues, sync PR events and repository activities.',
  scopes: ['repo:read', 'issues:write']
};
