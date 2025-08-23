import { Asset } from "../../components/AssetItem/AssetItem.type";

export type AssetDetailRoute = {
  params: {
    asset: Asset;
    similarAssets: Asset[];
  };
};

export type AssetDetailProps = {
  route: AssetDetailRoute;
};