import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'albi',
  
  brand: {
    displayName: 'Albi - AI 취업 준비',
    primaryColor: '#6366F1',
    icon: 'https://via.placeholder.com/600x600/6366F1/FFFFFF?text=Albi',
  },
  
  web: {
    host: 'localhost',
    port: 3000,
    commands: {
      dev: 'echo "Dev mode"',
      build: 'node build.cjs',
    },
  },
  
  outdir: 'dist',
  
  webViewProps: {
    type: 'partner',
    url: 'https://albi.kr',
  },
});
