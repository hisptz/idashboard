export interface PortalConfigurationState {
  isPortal: boolean,
  pages: [
    {
      id: string,
      name: string,
      isHomePage: boolean,
      routeUrl: string,
      idName: string,
    }
  ],
}

export interface StatsSummaryState {
  statsSummaryGroups: Array<any>,
}

export interface DownloadsState {
  downloads: [
    {
      id: string,
      name: string,
      routeUrl: string,
      downloadsOptions: Array<{}>,
    }
  ],
}

// START: FAQ MODEL - Custom Data Model
export interface FAQState {
  faq: [
    {
      title: string,
      desc: string,
      faqMenu: Array<{}>
    }
  ],
}

// ENDS: FAQ MODEL - Custom Data Model
