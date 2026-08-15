export interface NavLink {
  label: string
  href: string
}

export interface Memory {
  id: string
  quote: string
  date: string
  image: string
}

export interface GalleryPhoto {
  id: string
  image: string
  alt: string
  category: string
}

export type DetailIcon = 'calendar' | 'heart' | 'star'

export interface StoryDetail {
  id: string
  icon: DetailIcon
  label: string
  value: string
}

export interface FavoriteThing {
  id: string
  label: string
  value: string
}

export interface GalleryCategory {
  id: string
  label: string
}

export interface OverviewCard {
  id: string
  icon: 'calendar' | 'gallery' | 'heart'
  title: string
  description: string
}


export interface FavoriteSong {
  title: string
  artist: string
  src: string
}