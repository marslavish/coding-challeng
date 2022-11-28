import { makeAutoObservable } from "mobx";
import { Asset } from "@chain-registry/types";

export interface PoolData {
  id: string;
  token1: { name: string; imgSrc: string };
  token2: { name: string; imgSrc: string };
  poolLiquidity: number;
  apr: number;
  myLiquidity: number;
  myBoundedAmount: number;
  longestDaysUnbonding: boolean;
}

export default class PoolStore {
  poolsData: PoolData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getToken({ name, logo_URIs }: Asset) {
    return {
      name: name,
      imgSrc: logo_URIs.png,
    };
  }

  getShuffledArr(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
  }

  addPool(asset1: Asset, asset2: Asset) {
    const id = Math.floor(Math.random() * 500 + 1).toString();

    const randomPoolLiquidity = parseInt(
      this.getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        .toString()
        .replaceAll(",", "")
    );

    const randomMyLiquidity = parseInt(
      this.getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        .toString()
        .slice(0, 5)
        .replaceAll(",", "")
    );

    const randomAPR =
      parseInt(
        this.getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
          .toString()
          .slice(0, 7)
          .replaceAll(",", "")
      ) / 100;

    const pool: PoolData = {
      id,
      token1: this.getToken(asset1),
      token2: this.getToken(asset2),
      poolLiquidity: randomPoolLiquidity,
      apr: randomAPR,
      myLiquidity: randomMyLiquidity,
      myBoundedAmount: randomMyLiquidity,
      longestDaysUnbonding: Math.random() < 0.5,
    };

    this.poolsData.push(pool);
  }
}
