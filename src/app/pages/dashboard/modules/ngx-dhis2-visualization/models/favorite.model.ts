import { BaseState } from 'src/app/store/states/base.state';

export interface Favorite {
  id: string;
  type?: string;
  name?: string;
  notification?: BaseState;
  columns?: any;
  rows?: any;
  filters?: any;
}
