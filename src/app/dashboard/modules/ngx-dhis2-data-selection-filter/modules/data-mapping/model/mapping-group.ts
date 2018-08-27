export interface MappingGroup {
  id: string;
  name: string;
  member: GroupMember[];
}

export interface GroupMember {
  id: string;
  name: string;
}
