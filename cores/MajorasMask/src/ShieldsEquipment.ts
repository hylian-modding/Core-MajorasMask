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
  set heroesShield(bool: boolean) {
      this.emulator.rdramWriteBit8(this.equipment_addr, ShieldBitMap.HEROES, bool);
  }
  get heroesShield(): boolean {
      return this.emulator.rdramReadBit8(this.equipment_addr, ShieldBitMap.HEROES);
  }
  set mirrorShield(bool: boolean) {
      this.emulator.rdramWriteBit8(
          this.equipment_addr,
          ShieldBitMap.MIRROR,
          bool
      );
      this.emulator.rdramWriteBit8(
        this.equipment_addr,
        ShieldBitMap.HEROES,
        false
    );
  }
  get mirrorShield(): boolean {
      return this.emulator.rdramReadBit8(
          this.equipment_addr,
          ShieldBitMap.MIRROR
      );
  }
}
