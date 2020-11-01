import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/MMAPI';
import { MMOffsets } from "../API/Imports";
import IMemory from "modloader64_api/IMemory";

export class Flags {
    private emulator: IMemory;
    private save: API.ISaveContext;
    offsets = new MMOffsets();

    constructor(emulator: IMemory, save: API.ISaveContext) {
        this.emulator = emulator;
        this.save = save;
    }
    
}