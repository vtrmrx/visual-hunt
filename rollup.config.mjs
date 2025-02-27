import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/visualHunt.js',
      format: 'umd',
      name: 'VisualHunt',
      globals: {
        // Define external globals if needed
      },
      plugins: [],
    },
    {
      file: 'dist/visualHunt.min.js',
      format: 'umd',
      name: 'VisualHunt',
      plugins: [terser()],
    },
  ],
};