import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { IMMCore, Sword } from '../API/Imports';
import { Command } from 'modloader64_api/OOT/ICommandBuffer';

export const enum SwordBitMap {
  KOKIRI = 0x7,
  GILDED = 0x6
}

export class SwordsEquipment extends JSONTemplate implements API.ISwords, API.ISwordHelper {
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

  get swordLevel(): Sword {
    let bits = this.emulator.rdramReadBits8(this.equipment_addr);
    if (bits[SwordBitMap.KOKIRI] === 1 && bits[SwordBitMap.GILDED] === 0) {
      return Sword.KOKIRI;
    } else if (bits[SwordBitMap.KOKIRI] === 0 && bits[SwordBitMap.GILDED] === 1) {
      return Sword.RAZOR;
    } else if (bits[SwordBitMap.KOKIRI] === 1 && bits[SwordBitMap.GILDED] === 1) {
      return Sword.GILDED;
    } else {
      return Sword.NONE;
    }
  }

  set swordLevel(level: Sword) {
    let bits = this.emulator.rdramReadBits8(this.equipment_addr);
    switch (level) {
      case Sword.NONE:
        bits[SwordBitMap.KOKIRI] = 0;
        bits[SwordBitMap.GILDED] = 0;
        break;
      case Sword.KOKIRI:
        bits[SwordBitMap.KOKIRI] = 1;
        bits[SwordBitMap.GILDED] = 0;
        break;
      case Sword.RAZOR:
        bits[SwordBitMap.KOKIRI] = 0;
        bits[SwordBitMap.GILDED] = 1;
        break;
      case Sword.GILDED:
        bits[SwordBitMap.KOKIRI] = 1;
        bits[SwordBitMap.GILDED] = 1;
        break;
    }
    this.emulator.rdramWriteBits8(this.equipment_addr, bits);
  }

  updateSwordonB(): void {
    let level = this.swordLevel;
    switch (level) {
      case Sword.NONE:
        if (this.emulator.rdramRead8(0x1EF6BC) !== 0x50) {
          this.emulator.rdramWrite8(0x1EF6BC, 0xFF);
          this.core.commandBuffer.runCommand(Command.UPDATE_C_BUTTON_ICON, 0x0);
        }
        break;
      case Sword.KOKIRI:
        if (this.emulator.rdramRead8(0x1EF6BC) !== 0x50) {
          this.emulator.rdramWrite8(0x1EF6BC, 0x4D);
          this.core.commandBuffer.runCommand(Command.UPDATE_C_BUTTON_ICON, 0x0);
        }
        break;
      case Sword.RAZOR:
        if (this.emulator.rdramRead8(0x1EF6BC) !== 0x50) {
          this.emulator.rdramWrite8(0x1EF6BC, 0x4E);
          this.core.commandBuffer.runCommand(Command.UPDATE_C_BUTTON_ICON, 0x0);
        }
        break;
      case Sword.GILDED:
        if (this.emulator.rdramRead8(0x1EF6BC) !== 0x50) {
          this.emulator.rdramWrite8(0x1EF6BC, 0x4F);
          this.core.commandBuffer.runCommand(Command.UPDATE_C_BUTTON_ICON, 0x0);
        }
        break;
    }
  }
}
