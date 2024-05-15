export interface BlockListUser {
  id: string;
  name: string;
}

export interface BlockListInfo {
  url: string | undefined;
  title: string | undefined;
  description: string | undefined;
  numUsers: number;
}

export interface BlockList {
  users: BlockListUser[];
  infos: BlockListInfo;
}
