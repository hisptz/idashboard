export interface PageState {
  id: string;
  pages: any[];
  headerContents: any;
  dashboardMenu: any;
  footerContents: string;
}

export interface SinglePageState {
  id: string;
  name: string;
  routeUrl: string;
  category: string;
  parentId: string;
  headerButton: string;
  pageContent: string;
}

