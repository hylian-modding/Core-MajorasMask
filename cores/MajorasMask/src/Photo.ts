import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/MMAPI';
import { MMOffsets } from "../API/Imports";
import IMemory from "modloader64_api/IMemory";

export class Photo implements API.IPhoto {
    private emulator: IMemory;
    private save: API.ISaveContext;
    offsets = new MMOffsets();

    constructor(emulator: IMemory, save: API.ISaveContext) {
        this.emulator = emulator;
        this.save = save;
    }

    get pictograph_photoChunk(): Buffer {
        return this.emulator.rdramReadBuffer(this.offsets.pictograph_photo_addr, 0x2BC0);
    }

    get pictograph_spec(): number {
        return this.emulator.rdramRead8(this.offsets.pictograph_spec);
    }

    set pictograph_spec(flag: number) {
        this.emulator.rdramWrite8(this.offsets.pictograph_spec, flag);
    }

    get pictograph_quality(): number {
        return this.emulator.rdramRead8(this.offsets.pictograph_quality);
    }

    set pictograph_photoChunk(buf: Buffer) {
        this.emulator.rdramWriteBuffer(this.offsets.pictograph_photo_addr, buf);
    }

    set pictograph_quality(flag: number) {
        this.emulator.rdramWrite8(this.offsets.pictograph_quality, flag);
    }

    get pictograph_unk(): number {
        return this.emulator.rdramRead8(this.offsets.pictograph_unk);
    }

    set pictograph_unk(flag: number) {
        this.emulator.rdramWrite8(this.offsets.pictograph_unk, flag);
    }

    get pictograph_used(): boolean{
        return this.save.pictoboxUsed;
    }

    set pictograph_used(b: boolean){
        this.save.pictoboxUsed = b;
    }
}