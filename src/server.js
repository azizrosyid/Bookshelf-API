/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: '0.0.0.0',
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
