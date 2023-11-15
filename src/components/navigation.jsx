import React from 'react';
import SideNavigation from '@cloudscape-design/components/side-navigation';

const items = [
  // More pages got added as part of the workshop.
  { type: 'link', text: 'Upload CUR File', href: '/' },
  { type: 'link', text: 'Analysis Results', href: '/Results' },
];

export default function Navigation() {
  return (
    <>
      <SideNavigation
        activeHref={window.location.pathname}
        header={{ href: '/', text: 'Navigation' }}
        items={items}
      />
    </>
  );
}
