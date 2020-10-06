import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { IMMCore } from '../API/Imports';
import { Command } from 'modloader64_api/OOT/ICommandBuffer';

export const enum SwordBitMap {
  KOKIRI = 0x7,
  RAZOR = 0x7,
  GILDED = 0x6
}

export class SwordsEquipment extends JSONTemplate implements API.ISwords {
  private emulator: IMemory;
  private offsets = new API.MMOffsets;
  private instance: number = this.offsets.save_context;
  private equipment_addr: number = this.instance + 0x6D;
  private core: IMMCore;
  jsonFields: string[] = [
    'kokiriSword',
    'razorSword',
    'gildedSword',
  ];
  constructor(emulator: IMemory, core: IMMCore) {
    super();
    this.emulator = emulator;
    this.core = core;
  }
  get kokiriSword() {
    return this.emulator.rdramReadBit8(this.equipment_addr, SwordBitMap.KOKIRI);
  }
  set kokiriSword(bool: boolean) {
    this.emulator.rdramWriteBit8(this.equipment_addr, SwordBitMap.KOKIRI, bool);
    if (bool) {
      this.emulator.rdramWrite8(0x1EF6BC, 0x4D);
      this.core.commandBuffer.runCommand(Command.UPDATE_C_BUTTON_ICON, 0x0);
    }
  }
  get razorSword() {
    return this.emulator.rdramReadBit8(this.equipment_addr, SwordBitMap.KOKIRI);
  }
  set razorSword(bool: boolean) {
    this.emulator.rdramWriteBit8(this.equipment_addr, SwordBitMap.KOKIRI, false);
    this.emulator.rdramWriteBit8(this.equipment_addr, SwordBitMap.GILDED, bool);
    if (bool) {
      this.emulator.rdramWrite8(0x1EF6BC, 0x4E);
      this.core.commandBuffer.runCommand(Command.UPDATE_C_BUTTON_ICON, 0x0);
    }
  }
  get gilded() {
    return this.emulator.rdramReadBit8(this.equipment_addr, SwordBitMap.GILDED);
  }

  set gilded(bool: boolean) {
    this.emulator.rdramWriteBit8(
      this.equipment_addr,
      SwordBitMap.GILDED,
      bool
    );
    this.emulator.rdramWriteBit8(
      this.equipment_addr,
      SwordBitMap.KOKIRI,
      true
    );
    if (bool) {
      this.emulator.rdramWrite8(0x1EF6BC, 0x4F);
      this.core.commandBuffer.runCommand(Command.UPDATE_C_BUTTON_ICON, 0x0);
    }
  }
}
