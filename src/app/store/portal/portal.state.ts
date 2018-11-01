
export interface PortalConfigurationState {
  isPortal: boolean;
  pages: [
    {
      id: string,
      name: string,
      isHomePage: boolean,
      routeUrl: string,
      idName: string,
    }
    ];
}

export interface StatsSummaryState {
  statsSummaryGroups: Array<any>;
}

export interface DownloadsState {
  downloads: [
    {
      id: string,
      name: string,
      routeUrl: string,
      downloadsOptions: Array<{}>
    }
    ];
}
