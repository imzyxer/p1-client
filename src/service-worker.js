const ignored = self.__WB_MANIFEST;

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', () => {
  console.log('sw', 'install');
});
