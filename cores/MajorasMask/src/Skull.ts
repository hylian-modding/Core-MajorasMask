import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/MMAPI';
import { MMOffsets } from "../API/Imports";
import IMemory from "modloader64_api/IMemory";

export class Skull implements API.ISkull {
    private emulator: IMemory;
    offsets = new MMOffsets();

    constructor(emulator: IMemory, save: API.ISaveContext) {
        this.emulator = emulator;
    }

    get swampSkulltula(): number {
        return this.emulator.rdramRead16(this.offsets.swamp_skulltula);
    }

    set swampSkulltula(flag: number) {
        this.emulator.rdramWrite8(this.offsets.swamp_skulltula, flag);
    }

    get baySkulltula(): number {
        return this.emulator.rdramRead16(this.offsets.bay_skulltula);
    }

    set baySkulltula(flag: number) {
        this.emulator.rdramWrite8(this.offsets.bay_skulltula, flag);
    }
}