import { makeAutoObservable } from "mobx";
import { AssetList, Asset } from "@chain-registry/types";
import { asset_list } from "@chain-registry/osmosis";

export default class AssetStore {
  chain: AssetList = asset_list;
  filter: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  addAsset(asset: Asset) {
    if (
      this.chain.assets.findIndex(({ symbol }) => symbol === asset.symbol) ===
      -1
    ) {
      this.chain.assets.push(asset);
    }
  }

  updateAsset(asset: Asset) {
    this.chain.assets = this.chain.assets.map((item) => {
      if (item.symbol === asset.symbol) return asset;
      return item;
    });
  }

  removeAsset(asset: Asset) {
    this.chain.assets = this.chain.assets.filter(
      ({ symbol }) => symbol !== asset.symbol
    );
  }

  updateFilter(text: string) {
    this.filter = text;
  }

  get filteredAssets() {
    return this.chain.assets.filter(({ symbol }) =>
      symbol.startsWith(this.filter.toUpperCase())
    );
  }
}
