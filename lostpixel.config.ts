import { CustomProjectConfig } from 'lost-pixel'

export const config: CustomProjectConfig = {
  apiKey: process.env.LOST_PIXEL_API_KEY,
  breakpoints: [414, 1280],
  lostPixelProjectId: 'clud602ae10romo0e861bvpv2',
  pageShots: {
    pages: [{ path: '/', name: 'landing' }],
    baseUrl: 'http://172.17.0.1:9000',
  },
}
