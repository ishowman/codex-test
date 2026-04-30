import type { PluginManifest } from '@plugins/sdk';

export const manifest: PluginManifest = {
  id: 'notion',
  name: 'Notion Integration',
  version: '0.1.0',
  description: 'Sync docs and tasks between your workspace and Notion.',
  scopes: ['pages:read', 'pages:write']
};
