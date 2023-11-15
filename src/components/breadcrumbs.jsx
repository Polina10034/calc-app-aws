// import React from 'react';
// import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';

// const items = [
//   // { text: 'Home', href: '/' },
//   { text: 'Upload CUR File', href: '/' },
// { text: 'Analysis Results', href: '/Results' },
  
  
// ];

// export function Breadcrumbs() {
//   return <BreadcrumbGroup items={items} />;
// }

// export default Breadcrumbs;

import React from 'react';
import BreadcrumbGroup, { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

const items: BreadcrumbGroupProps.Item[] = [
  { text: 'Upload CUR File', href: '/' },
  { text: 'Analysis Results', href: '/Results' },

];

export interface BreadcrumbsProps {
  active: BreadcrumbGroupProps.Item;
}

export default function Breadcrumbs() {
  return <BreadcrumbGroup items={items} />;
}

