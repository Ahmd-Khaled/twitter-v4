import { HomeIcon } from '@heroicons/react/24/solid';
import { BellIcon, BookmarkIcon, ClipboardIcon, EllipsisHorizontalCircleIcon, EnvelopeIcon, HashtagIcon, InboxIcon, UserIcon } from '@heroicons/react/24/outline';

export const IconsList = [
  {
    id: 'Home',
    text: 'Home',
    icon: HomeIcon,
    active: true
  },
  {
    id: 'Explore',
    text: 'Explore',
    icon: HashtagIcon,
    active: false
  },
  {
    id: 'Notifications',
    text: 'Notifications',
    icon: BellIcon,
    active: false
  },
  {
    id: 'Messages',
    text: 'Messages',
    icon: EnvelopeIcon,
    active: false
  },
  {
    id: 'Bookmarks',
    text: 'Bookmarks',
    icon: BookmarkIcon,
    active: false
  },
  {
    id: 'Lists',
    text: 'Lists',
    icon: ClipboardIcon,
    active: false
  },
  {
    id: 'Profile',
    text: 'Profile',
    icon: UserIcon,
    active: false
  },
  {
    id: 'More',
    text: 'More',
    icon: EllipsisHorizontalCircleIcon,
    active: false
  },
];