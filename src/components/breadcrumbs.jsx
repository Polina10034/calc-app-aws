import React from 'react';
import BreadcrumbGroup, { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

const items: BreadcrumbGroupProps.Item[] = [
  { text: 'Home', href: '/' },
  { text: 'Dashboard', href: '/dashboard' },
  { text: 'Analysis Results', href: '/Results' },

];

export interface BreadcrumbsProps {
  active: BreadcrumbGroupProps.Item;
}

export default function Breadcrumbs() {
  return <BreadcrumbGroup items={items} />;
}

