// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import logo from '../download.png';
import Navigation from '../components/navigation';
import Breadcrumbs from '../components/breadcrumbs';
import Children from '../components/uploadfiles3';
import './styles.css';

export default function Shell({ children, contentType, breadcrumbs, tools, navigation, notifications }: ShellProps) {
  return (

    <>
      <div id="top-nav">
        <TopNavigation
          identity={{
            logo: { src: logo, alt: 'Workload Calculator' },
            title: 'Workload Calculator',
            href: '/',
          }}
          i18nStrings={{
            overflowMenuTriggerText: 'More',
            overflowMenuTitleText: 'All',
          }}
        />
      </div>
      <AppLayout
        // contentType={contentType}
        navigation={<Navigation />}
        breadcrumbs={<Breadcrumbs/>}
        // notifications={notifications}
        // stickyNotifications={true}
        // tools={tools}
        content={<Children/>}
        headerSelector="#top-nav"
        ariaLabels={{
          navigation: 'Navigation drawer',
          navigationClose: 'Close navigation drawer',
          navigationToggle: 'Open navigation drawer',
          notifications: 'Notifications',
          tools: 'Help panel',
          toolsClose: 'Close help panel',
          toolsToggle: 'Open help panel',
        }}
      />
    </>
  );
}
