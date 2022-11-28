import AssetStore from "./asset-store";
import PoolStore from "./pool-store";

export class RootStore {
  assetStore: AssetStore;
  poolStore: PoolStore;

  constructor() {
    this.assetStore = new AssetStore();
    this.poolStore = new PoolStore();
  }
}

const rootStore = new RootStore();

export default rootStore;
