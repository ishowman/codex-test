import { useEffect, useState } from 'react';
import type { PluginStatus } from '@plugins/sdk';

const API = 'http://localhost:3000';

export function App() {
  const [items, setItems] = useState<PluginStatus[]>([]);

  const load = async () => {
    const res = await fetch(`${API}/api/plugins`);
    const data = await res.json();
    setItems(data.items ?? []);
  };

  useEffect(() => {
    void load();
  }, []);

  const mutate = async (id: string, action: 'install' | 'uninstall') => {
    await fetch(`${API}/api/plugins/${id}/${action}`, { method: 'POST' });
    await load();
  };

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 840, margin: '40px auto' }}>
      <h1>Plugin Marketplace</h1>
      {items.map((p) => (
        <article key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 12 }}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <small>Scopes: {p.scopes.join(', ')}</small>
          <div style={{ marginTop: 10 }}>
            {p.installed ? (
              <button onClick={() => mutate(p.id, 'uninstall')}>Uninstall</button>
            ) : (
              <button onClick={() => mutate(p.id, 'install')}>Install</button>
            )}
          </div>
        </article>
      ))}
    </main>
  );
}
