import type { PluginManifest } from '@plugins/sdk';

export const manifest: PluginManifest = {
  id: 'slack',
  name: 'Slack Integration',
  version: '0.1.0',
  description: 'Send notifications and workflow messages to Slack channels.',
  scopes: ['chat:write', 'channels:read']
};
