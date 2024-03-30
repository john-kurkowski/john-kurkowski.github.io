import { CustomProjectConfig } from 'lost-pixel'

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [{ path: '/', name: 'landing' }],
    baseUrl: 'http://172.17.0.1:9000'
  },
  lostPixelProjectId: 'clud602ae10romo0e861bvpv2',
  apiKey: process.env.LOST_PIXEL_API_KEY
}
