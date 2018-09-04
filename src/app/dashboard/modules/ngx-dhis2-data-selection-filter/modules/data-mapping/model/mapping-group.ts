export interface MappingGroup {
  id: string;
  name: string;
  current: boolean;
  members: GroupMember[];
}

export interface GroupMember {
  id: string;
  name: string;
}
