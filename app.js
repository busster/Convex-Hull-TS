requirejs.config({
  baseUrl: 'browser/lib',
  paths: {
      'test-files-ts': 'browser/test-files-ts'
  }
});
requirejs(['index']);