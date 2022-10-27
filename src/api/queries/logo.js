import spotify from '@/images/logos/spotify.png'
import twitter from '@/images/logos/twitter.png'
import dropbox from '@/images/logos/dropbox.png'
import netflix from '@/images/logos/netflix.png'
import pinterest from '@/images/logos/pinterest.png'
import facebook from '@/images/logos/facebook.png'
import cloudera from '@/images/logos/cloudera.png'
import square from '@/images/logos/square.png'
import uber from '@/images/logos/square.png'
import medium from '@/images/logos/medium.png'
import airbnb from '@/images/logos/airbnb.png'
import github from '@/images/logos/github.png'
import instacart from '@/images/logos/instacart.png'
export const logo_mapper = {
  '06b9d7b4-9769-491e-8646-53643ae097d6': { logo: twitter, name: 'Twitter' },
  'd9e75b60-fb20-441d-83f6-eccb61f34440': { logo: dropbox, name: 'DropBox' },
  '275a86e7-79ae-4d42-a2ff-2bdeeba248ea': { logo: netflix, name: 'Netflix' },
  '90e6a5e3-55a5-4094-a2a8-0d1cac09fb0e': {
    logo: pinterest,
    name: 'Pinterest',
  },
  '408fb396-82c6-4a2d-99a7-24973c588b87': { logo: cloudera, name: 'Cloudera' },
  '81eb3402-7195-473b-96e5-040630e8b258': { logo: uber, name: 'Uber' },
  '54718432-22c7-40b2-9106-42eb7e5b9ffb': { logo: facebook, name: 'Facebook' },
  '44c79fa2-7e0f-4519-a61c-e08137667a64': { logo: square, name: 'Square' },
  '07a5ffde-e41d-45c1-baaa-e953ee3c97b7': { logo: medium, name: 'Medium' },
  'c920693a-65b1-4aea-a103-bfb0b961ff2b': { logo: airbnb, name: 'Airbnb' },
  'dbdcb2a7-df13-4f0a-af2f-24eba4ec95db': { logo: github, name: 'Github' },
  '3dc5dd08-eda1-456b-b000-0e7febc9ee0b': { logo: spotify, name: 'Spotify' },
  '48059e00-f4e5-484f-a239-148a7ab2d73b': {
    logo: instacart,
    name: 'Instacart',
  },
}

export default {
  'logo.get.many': logo_mapper,
}