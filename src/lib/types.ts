export interface BlockListUser {
  id: string;
  name: string;
  blocked: boolean;
}

export interface BlockListInfo {
  url: string | undefined;
  title: string | undefined;
  description: string | undefined;
  numUsers: number;
}

export interface BlockList {
  id: string;
  users: BlockListUser[];
  infos: BlockListInfo;
}
