/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: [
      '../src/**/*.mdx',
      '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
    ],
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-a11y',
    ],
    framework: {
      name: '@storybook/react-vite',
      options: {},
    },
    docs: {
      autodocs: 'tag',
    },
    staticDirs: ['../public'],
    env: (config) => ({
      ...config,
      STORYBOOK_VERCEL_DEPLOYMENT: process.env.VERCEL ? 'true' : 'false',
    }),
  };
  
  export default config; 