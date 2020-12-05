import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/MMAPI';
import { MMOffsets } from "../API/Imports";
import IMemory from "modloader64_api/IMemory";

export class Stray implements API.IStray {
    private emulator: IMemory;
    offsets = new MMOffsets();

    constructor(emulator: IMemory, save: API.ISaveContext) {
        this.emulator = emulator;
    }

    get strayWoodfall(): number {
        return this.emulator.rdramRead8(this.offsets.woodfall_fairies);
    }

    set strayWoodfall(flag: number) {
        this.emulator.rdramWrite8(this.offsets.woodfall_fairies, flag);
    }

    get straySnowhead(): number {
        return this.emulator.rdramRead8(this.offsets.snowhead_fairies);
    }

    set straySnowhead(flag: number) {
        this.emulator.rdramWrite8(this.offsets.snowhead_fairies, flag);
    }

    get strayBay(): number {
        return this.emulator.rdramRead8(this.offsets.bay_fairies);
    }

    set strayBay(flag: number) {
        this.emulator.rdramWrite8(this.offsets.bay_fairies, flag);
    }

    get strayStone(): number {
        return this.emulator.rdramRead8(this.offsets.stone_fairies);
    }

    set strayStone(flag: number) {
        this.emulator.rdramWrite8(this.offsets.stone_fairies, flag);
    }
}