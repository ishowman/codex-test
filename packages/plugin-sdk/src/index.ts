export type PluginManifest = {
  id: string;
  name: string;
  version: string;
  description: string;
  scopes: string[];
};

export type PluginStatus = PluginManifest & {
  installed: boolean;
};
