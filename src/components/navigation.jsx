import React from 'react';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

const items: SideNavigationProps['items'] = [
  // More pages got added as part of the workshop.
  { type: 'link', text: 'Dashboard', href: '/' },
];

export default function Navigation() {
  return (
    <>
      <SideNavigation
        activeHref={window.location.pathname}
        header={{ href: '/', text: 'Service' }}
        items={items}
      />
    </>
  );
}
