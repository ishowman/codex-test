import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { PluginManifest, PluginStatus } from '@plugins/sdk';
import { manifest as slack } from '@plugins/slack';
import { manifest as github } from '@plugins/github';
import { manifest as notion } from '@plugins/notion';

const app = new Hono();
app.use('/*', cors());

const marketplace: PluginManifest[] = [slack, github, notion];
const installed = new Set<string>();

const asStatus = (plugin: PluginManifest): PluginStatus => ({
  ...plugin,
  installed: installed.has(plugin.id)
});

app.get('/health', (c) => c.json({ ok: true }));

app.get('/api/plugins', (c) => c.json({ items: marketplace.map(asStatus) }));

app.post('/api/plugins/:id/install', async (c) => {
  const id = c.req.param('id');
  const plugin = marketplace.find((p) => p.id === id);
  if (!plugin) return c.json({ error: 'Plugin not found' }, 404);

  installed.add(id);
  return c.json({ success: true, plugin: asStatus(plugin) });
});

app.post('/api/plugins/:id/uninstall', async (c) => {
  const id = c.req.param('id');
  const plugin = marketplace.find((p) => p.id === id);
  if (!plugin) return c.json({ error: 'Plugin not found' }, 404);

  installed.delete(id);
  return c.json({ success: true, plugin: asStatus(plugin) });
});

const port = Number(process.env.PORT || 3000);

export default {
  port,
  fetch: app.fetch
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const { serve } = await import('@hono/node-server');
  serve({ fetch: app.fetch, port });
  console.log(`[server] running at http://localhost:${port}`);
}
