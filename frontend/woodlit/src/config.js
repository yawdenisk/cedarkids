const isDev = true;

const config = {
  API_URL: isDev
    ? 'http://localhost:8081'
    : 'https://cedarkids.eu'
};

export default config;
