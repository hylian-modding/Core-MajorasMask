import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';

export const enum SwordBitMap {
  KOKIRI = 7,
  RAZOR = 7,
  GILDED = 6
}

export class SwordsEquipment extends JSONTemplate implements API.ISwords {
  private emulator: IMemory;
  private offsets = new API.MMOffsets;
  private instance: number = this.offsets.save_context;
  private equipment_addr: number = this.instance + 0x009c;
  jsonFields: string[] = [
      'kokiriSword',
      'razorSword',
      'gildedSword',
  ];
  constructor(emulator: IMemory) {
      super();
      this.emulator = emulator;
  }
  get kokiriSword() {
      return this.emulator.rdramReadBit8(this.equipment_addr, SwordBitMap.KOKIRI);
  }
  set kokiriSword(bool: boolean) {
      this.emulator.rdramWriteBit8(this.equipment_addr, SwordBitMap.KOKIRI, bool);
  }
  get razorSword() {
    return (this.emulator.rdramReadBit8(this.equipment_addr, SwordBitMap.RAZOR) && this.emulator.rdramReadBit8(this.equipment_addr, SwordBitMap.GILDED) ) ? true : false
      
  }
  set razorSword(bool: boolean) {
      this.emulator.rdramWriteBit8(this.equipment_addr, SwordBitMap.RAZOR, bool);
      this.emulator.rdramWriteBit8(this.equipment_addr, SwordBitMap.GILDED, bool);
  }
  get gilded() {
    return (!this.emulator.rdramReadBit8(this.equipment_addr, SwordBitMap.RAZOR) && this.emulator.rdramReadBit8(this.equipment_addr, SwordBitMap.GILDED) ) ? true : false
  }

  set gilded(bool: boolean) {
      this.emulator.rdramWriteBit8(
          this.equipment_addr,
          SwordBitMap.GILDED,
          bool
      );
      this.emulator.rdramWriteBit8(
        this.equipment_addr,
        SwordBitMap.RAZOR,
        false
    );
  }
}
