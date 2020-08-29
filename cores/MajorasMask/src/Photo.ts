import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/MMAPI';
import { MMOffsets } from "../API/Imports";
import IMemory from "modloader64_api/IMemory";

export class Photo implements API.IPhoto {
    private emulator: IMemory;
    offsets = new MMOffsets();

    constructor(emulator: IMemory) {
        this.emulator = emulator;
    }

    get pictograph_photoChunk1(): Buffer {
        return this.emulator.rdramReadBuffer(this.offsets.pictograph_photo_addr, 0x15E0);
    }
    set pictograph_photoChunk1(buf: Buffer) {
        this.emulator.rdramWriteBuffer(this.offsets.pictograph_photo_addr, buf);
    }

    get pictograph_photoChunk2(): Buffer {
        return this.emulator.rdramReadBuffer(this.offsets.pictograph_photo_addr + 0x15E0, 0x15E0);
    }
    set pictograph_photoChunk2(buf: Buffer) {
        this.emulator.rdramWriteBuffer(this.offsets.pictograph_photo_addr + 0x15E0, buf);
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

    set pictograph_quality(flag: number) {
        this.emulator.rdramWrite8(this.offsets.pictograph_quality, flag);
    }

    get pictograph_unk(): number {
        return this.emulator.rdramRead8(this.offsets.pictograph_unk);
    }

    set pictograph_unk(flag: number) {
        this.emulator.rdramWrite8(this.offsets.pictograph_unk, flag);
    }
}