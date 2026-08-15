import type {
  NavLink,
  Memory,
  GalleryPhoto,
  StoryDetail,
  OverviewCard,
  FavoriteThing,
  GalleryCategory,
  FavoriteSong,
} from '@/types'


import songOne from '@/assets/audio/Unknown.mp4'
import songTwo from '@/assets/audio/Unknown-2.mp4'
import songThree from '@/assets/audio/Unknown-3.mp4'
import songFour from '@/assets/audio/Unknown-4.mp4'
import songFive from '@/assets/audio/Unknown-5.mp4'


import img2 from '@/assets/images/Unknown-2.jpg'
import img3 from '@/assets/images/Unknown-3.jpg'
import img4 from '@/assets/images/Unknown-4.jpg'
import img5 from '@/assets/images/Unknown-5.jpg'
import img6 from '@/assets/images/Unknown-6.jpg'
import img7 from '@/assets/images/Unknown-7.jpg'
import img8 from '@/assets/images/Unknown-8.jpg'
import img9 from '@/assets/images/Unknown-9.jpg'
import img10 from '@/assets/images/Unknown-10.jpg'
import img11 from '@/assets/images/Unknown-11.jpg'
import img12 from '@/assets/images/Unknown-12.jpg'
import img13 from '@/assets/images/Unknown-13.jpg'
import img14 from '@/assets/images/Unknown-14.jpg'
import img15 from '@/assets/images/Unknown-15.jpg'
import img16 from '@/assets/images/Unknown-16.jpg'
import img17 from '@/assets/images/Unknown-17.jpg'
import img18 from '@/assets/images/Unknown-18.jpg'
import img19 from '@/assets/images/Unknown-19.jpg'
import img20 from '@/assets/images/Unknown-20.jpg'
import img21 from '@/assets/images/Unknown-21.jpg'
import img22 from '@/assets/images/Unknown-22.jpg'
import img23 from '@/assets/images/Unknown-23.jpg'
import img24 from '@/assets/images/Unknown-24.jpg'
import img25 from '@/assets/images/Unknown-25.jpg'
import img26 from '@/assets/images/Unknown-26.jpg'
import img27 from '@/assets/images/Unknown-27.jpg'


export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Memories', href: '/memories' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Details', href: '/details' },
]

export const overviewCards: OverviewCard[] = [
  {
    id: 'memories',
    icon: 'calendar',
    title: 'Memories',
    description: 'Little moments that mean everything.',
  },
  {
    id: 'gallery',
    icon: 'gallery',
    title: 'Gallery',
    description: 'A collection of our favorite photos.',
  },
  {
    id: 'details',
    icon: 'heart',
    title: 'Details',
    description: 'The important dates in our story.',
  },
]

export const memories: Memory[] = [
   {
    id: 'm1',
    quote: 'The day we started our journey together.',
    date: 'September 14, 2024',
    image: img22,
  },
   {
    id: 'm2',
    quote: 'The Municipyo date - kahit walang pera haha.',
    date: 'October 08, 2025',
    image: img21,
  },
   {
    id: 'm3',
    quote: 'The first eat date.',
    date: 'July 07, 2025',
    image: img20,
  },
   {
    id: 'm4',
    quote: 'The beach.',
    date: 'May 21. , 2025',
    image: img18,
  },
  {
    id: 'm5',
    quote: 'The Mansion House - baguio.',
    date: 'December 25, 2025',
    image: img2,
  },
  {
    id: 'm6',
    quote: 'Dragon Treasure Castle - Baguio.',
    date: 'December 25, 2025',
    image: img3,
  },
  {
    id: 'm7',
    quote: 'Our first Beach - Jomalig Island.',
    date: 'May 20, 2026',
    image: img4,
  },
  {
    id: 'm8',
    quote: 'The quiet Sunday mornings that became our favorite Photo -  Inlove haha.',
    date: 'March 8, 2025',
    image: img5,
  },
  {
    id: 'm9',
    quote: 'Swimming kunwari hindi nakatingin.',
    date: 'May 21, 2025',
    image: img6,
  },
  {
    id: 'm10',
    quote: 'The road trip where the playlist mattered more than the destination.',
    date: 'August 2, 2025',
    image: img7,
  },
  {
    id: 'm11',
    quote: 'The jolamig Turtle Rock.',
    date: 'May 21, 2025',
    image: img8,
  },
  {
    id: 'm12',
    quote: 'The sunset afternoon we spent doing absolutely nothing, together - little boracay',
    date: 'May 21, 2026',
    image: img9,
  },
    {
    id: 'm13',
    quote: 'The 2nd Anniversary',
    date: 'August 14, 2026',
    image: img27,
  },
]

export const galleryCategories: GalleryCategory[] = [
  { id: 'all', label: 'All' },
  { id: 'travel', label: 'Travel' },
  { id: 'everyday', label: 'Everyday' },
  { id: 'celebrations', label: 'Celebrations' },
]

// Reusing the same 10 photos across categories until you add more —
// swap any `image` value for a new imported file whenever you like.
export const galleryPhotos: GalleryPhoto[] = [
  { id: 'g1', image: img2, alt: 'Us, together', category: 'travel' },
  { id: 'g2', image: img3, alt: 'Bouquet of flowers', category: 'travel' },
  { id: 'g3', image: img4, alt: 'Watching the sunset over the ocean', category: 'travel' },
  { id: 'g4', image: img5, alt: 'Evening under string lights', category: 'celebrations' },
  { id: 'g5', image: img6, alt: 'Coffee cheers', category: 'travel' },
  { id: 'g6', image: img7, alt: 'Cozy evening on the couch', category: 'travel' },
  { id: 'g7', image: img8, alt: 'Standing at a mountain overlook', category: 'travel' },
  { id: 'g8', image: img9, alt: 'Blowing out birthday candles', category: 'travel' },
  { id: 'g9', image: img10, alt: 'Browsing a farmers market', category: 'travel' },
  { id: 'g10', image: img11, alt: 'City lights at night', category: 'travel' },
    { id: 'g11', image: img12, alt: 'City lights at night', category: 'travel' },
      { id: 'g12', image: img13, alt: 'City lights at night', category: 'travel' },
    { id: 'g13', image: img14, alt: 'City lights at night', category: 'everyday' },
    { id: 'g14', image: img15, alt: 'City lights at night', category: 'everyday' },
    { id: 'g15', image: img16, alt: 'City lights at night', category: 'everyday' },
    { id: 'g16', image: img17, alt: 'City lights at night', category: 'travel' },
    { id: 'g17', image: img18, alt: 'City lights at night', category: 'celebrations' },
      { id: 'g18', image: img19, alt: 'City lights at night', category: 'celebrations' },
        { id: 'g19', image: img20, alt: 'City lights at night', category: 'celebrations' },
          { id: 'g20', image: img21, alt: 'City lights at night', category: 'celebrations' },
            { id: 'g21', image: img22, alt: 'City lights at night', category: 'everyday' },
    { id: 'g22', image: img23, alt: 'City lights at night', category: 'everyday' },
{ id: 'g23', image: img24, alt: 'City lights at night', category: 'everyday' },
{ id: 'g24', image: img25, alt: 'City lights at night', category: 'everyday' },
{ id: 'g25', image: img26, alt: 'City lights at night', category: 'everyday' },
{ id: 'g26', image: img27, alt: 'City lights at night', category: 'Celebration' },

]

export const storyDetails: StoryDetail[] = [
  { id: 'd1', icon: 'calendar', label: 'Our First Date', value: 'September 14, 2024' },
  { id: 'd2', icon: 'heart', label: "We're Together", value: 'August 14, 2024' },
  { id: 'd3', icon: 'star', label: 'Next Adventure', value: 'Out of town to Japan, Switzerland' },
]

export const favoriteThings: FavoriteThing[] = [
  { id: 'f1', label: 'Song of ours', value: '"Flowers" — Samantha Ebert' },
  { id: 'f2', label: 'Place we keep returning to', value: 'Each Other' },
  { id: 'f3', label: 'Movie night pick', value: 'Anything with a happy ending' },
  { id: 'f4', label: 'Shared dream', value: 'A slow trip through Japan' },
]

export const heroImage = img11

export const favoriteSongs: FavoriteSong[] = [
  { title: 'Flowers', artist: 'Samantha Ebert', src: songOne },
  
  { title: 'Sayong yakap', artist: 'll For Jesus Worship', src: songTwo },
  { title: 'Who Else', artist: 'Abbie Gamboa', src: songThree },
  { title: 'Reckless love', artist: 'Cory Asbury', src: songFour },
    { title: 'You ll Be in My Heart', artist: 'NIKI', src: songFive },
]

// Anchor date used to calculate "days together" on the Details page
export const togetherSince = '2024-08-14'