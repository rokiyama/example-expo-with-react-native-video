import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Asset,
  AssetInfo as MediaLibraryAssetInfo,
  getAssetInfoAsync,
  getAssetsAsync,
  requestPermissionsAsync,
} from "expo-media-library";
import { AssetInfo, PageInfo } from "../../types/cameraRoll";
import { RootState } from "../store";

interface CameraRollState {
  assets: Array<AssetInfo>;
  lastPageInfo?: PageInfo;
}

const initialState: CameraRollState = {
  assets: [],
  lastPageInfo: undefined,
};

export const loadAssets = createAsyncThunk(
  "cameraRoll/assets",
  async ({ size, pageInfo }: { size: number; pageInfo?: PageInfo }) => {
    const permission = await requestPermissionsAsync(false);
    console.log(permission);
    if (!permission.granted) {
      return;
    }
    if (pageInfo && !pageInfo.hasNextPage) {
      return;
    }
    const res = await getAssetsAsync({
      first: size,
      mediaType: ["photo", "video"],
      sortBy: "modificationTime",
      after: pageInfo?.endCursor,
    });
    const withInfo = await Promise.all(
      res.assets.map<Promise<[Asset, MediaLibraryAssetInfo | undefined]>>(
        async (a) =>
          a.mediaType === "video"
            ? [a, await getAssetInfoAsync(a.id)]
            : [a, undefined]
      )
    );
    return {
      assetInfo: withInfo.map<AssetInfo>((info) => ({
        id: info[0].id,
        uri: info[0].uri,
        localUri: info[1]?.localUri,
        mediaType:
          info[0].mediaType === "photo"
            ? "photo"
            : info[0].mediaType === "video"
            ? "video"
            : "unknown",
      })),
      pagedInfo: res,
    };
  }
);

export const cameraRollSlice = createSlice({
  name: "cameraRoll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAssets.fulfilled, (state, action) => {
      if (action.payload) {
        state.assets.push(...action.payload.assetInfo);
        state.lastPageInfo = {
          endCursor: action.payload.pagedInfo.endCursor,
          hasNextPage: action.payload.pagedInfo.hasNextPage,
        };
      }
    });
  },
});

export const {} = cameraRollSlice.actions;

export const selectAssets = (state: RootState) => state.cameraRoll.assets;
export const selectLastPageInfo = (state: RootState) =>
  state.cameraRoll.lastPageInfo;

export default cameraRollSlice.reducer;
