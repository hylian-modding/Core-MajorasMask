import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';

export const enum ShieldBitMap {
  HEROES = 0x3,
  MIRROR = 0x2,
}

export class ShieldsEquipment extends JSONTemplate implements API.IShields {
  private emulator: IMemory;
  private offsets = new API.MMOffsets;
  private instance: number = this.offsets.save_context;
  private equipment_addr: number = this.instance + 0x6D;
  jsonFields: string[] = ['heroesShield', 'mirrorShield'];
  constructor(emulator: IMemory) {
    super();
    this.emulator = emulator;
  }

  get shieldLevel(): API.Shield {
    let bits = this.emulator.rdramReadBits8(this.equipment_addr);
    if (bits[ShieldBitMap.MIRROR] === 0 && bits[ShieldBitMap.HEROES] === 1) {
      return API.Shield.HERO;
    } else if (bits[ShieldBitMap.HEROES] === 0 && bits[ShieldBitMap.MIRROR] === 1) {
      return API.Shield.MIRROR;
    } else {
      return API.Shield.NONE;
    }
  }

  set shieldLevel(level: API.Shield) {
    let bits = this.emulator.rdramReadBits8(this.equipment_addr);
    switch (level) {
      case API.Shield.NONE:
        bits[ShieldBitMap.HEROES] = 0;
        bits[ShieldBitMap.MIRROR] = 0;
        break;
      case API.Shield.HERO:
        bits[ShieldBitMap.HEROES] = 1;
        bits[ShieldBitMap.MIRROR] = 0;
        break;
      case API.Shield.MIRROR:
        bits[ShieldBitMap.HEROES] = 0;
        bits[ShieldBitMap.MIRROR] = 1;
        break;
    }
    this.emulator.rdramWriteBits8(this.equipment_addr, bits);
  }

}
