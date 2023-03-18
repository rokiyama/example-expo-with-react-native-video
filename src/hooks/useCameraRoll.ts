import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  loadAssets,
  selectAssets,
  selectLastPageInfo,
} from "../redux/slices/cameraRoll";

export const useCameraRoll = () => {
  const assets = useAppSelector(selectAssets);
  const lastPageInfo = useAppSelector(selectLastPageInfo);
  const dispatch = useAppDispatch();

  return {
    assets,
    loadMore: (size: number) => {
      dispatch(
        loadAssets({
          size,
          pageInfo: lastPageInfo,
        })
      );
    },
  };
};
