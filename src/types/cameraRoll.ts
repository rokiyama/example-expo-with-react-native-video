export type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};

export type AssetInfo = {
  id: string;
  uri: string;
  localUri?: string;
  mediaType: "photo" | "video" | "unknown";
};
