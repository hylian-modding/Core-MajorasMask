import { IModLoaderAPI } from "modloader64_api/IModLoaderAPI";
import * as API from '../API/Imports';
import * as CORE from '../src/Imports';

export class GlobalContext {

    ModLoader: IModLoaderAPI;
    viewStruct: API.IViewStruct;
    
    constructor(ModLoader: IModLoaderAPI) {
        this.ModLoader = ModLoader;
        this.viewStruct = new CORE.viewStruct(ModLoader);
    }

    get current_scene(): number {
        let offsets = new API.MMOffsets;
        return this.ModLoader.emulator.rdramRead16(offsets.current_scene);
    }

    get scene_framecount(): number {
        let offsets = new API.MMOffsets;
        return this.ModLoader.emulator.rdramRead32(offsets.scene_framecount);
    }

    get room(): number {
        let offsets = new API.MMOffsets;
        return this.ModLoader.emulator.rdramReadPtr8(
            offsets.global_context_pointer,
            offsets.current_room_addr
        );
    }

    get liveSceneData_chests(): Buffer {
        let offsets = new API.MMOffsets;
        return this.ModLoader.emulator.rdramReadPtrBuffer(
            offsets.global_context_pointer,
            offsets.chest_flags_addr,
            0x4
        );
    }
    set liveSceneData_chests(buf: Buffer) {
        let offsets = new API.MMOffsets;
        this.ModLoader.emulator.rdramWritePtrBuffer(
            offsets.global_context_pointer,
            offsets.chest_flags_addr,
            buf
        );
    }
    get liveSceneData_clear(): Buffer {
        let offsets = new API.MMOffsets;
        return this.ModLoader.emulator.rdramReadPtrBuffer(
            offsets.global_context_pointer,
            offsets.room_clear_flags_addr,
            0x4
        );
    }
    set liveSceneData_clear(buf: Buffer) {
        let offsets = new API.MMOffsets;
        this.ModLoader.emulator.rdramWritePtrBuffer(
            offsets.global_context_pointer,
            offsets.room_clear_flags_addr,
            buf
        );
    }
    get liveSceneData_switch(): Buffer {
        let offsets = new API.MMOffsets;
        return this.ModLoader.emulator.rdramReadPtrBuffer(
            offsets.global_context_pointer,
            offsets.switch_flags_addr,
            0x4
        );
    }
    set liveSceneData_switch(buf: Buffer) {
        let offsets = new API.MMOffsets;
        this.ModLoader.emulator.rdramWritePtrBuffer(
            offsets.global_context_pointer,
            offsets.switch_flags_addr,
            buf
        );
    }
    get liveSceneData_temp(): Buffer {
        let offsets = new API.MMOffsets;
        return this.ModLoader.emulator.rdramReadPtrBuffer(
            offsets.global_context_pointer,
            offsets.temp_switch_flags_addr,
            0x4
        );
    }
    set liveSceneData_temp(buf: Buffer) {
        let offsets = new API.MMOffsets;
        this.ModLoader.emulator.rdramWritePtrBuffer(
            offsets.global_context_pointer,
            offsets.temp_switch_flags_addr,
            buf
        );
    }
    get liveSceneData_collectable(): Buffer {
        let offsets = new API.MMOffsets;
        return this.ModLoader.emulator.rdramReadPtrBuffer(
            offsets.global_context_pointer,
            offsets.collectable_flag_addr,
            0x8
        );
    }
    set liveSceneData_collectable(buf: Buffer) {
        let offsets = new API.MMOffsets;
        this.ModLoader.emulator.rdramWritePtrBuffer(
            offsets.global_context_pointer,
            offsets.collectable_flag_addr,
            buf
        );
    }
    get continue_state(): boolean {
        let offsets = new API.MMOffsets;
        return (
            this.ModLoader.emulator.rdramReadPtr32(
                offsets.global_context_pointer,
                offsets.continue_state_addr
            ) === 1
        );
    }
    getSaveDataForCurrentScene(): Buffer {
        let offsets = new API.MMOffsets;
        return this.ModLoader.emulator.rdramReadBuffer(
            offsets.save_context + 0x00F8 + offsets.current_scene * 0xD20,
            0x1c
        );
    }
    writeSaveDataForCurrentScene(buf: Buffer): void {
        let offsets = new API.MMOffsets;
        if (buf.byteLength === 0x1c) {
            this.ModLoader.emulator.rdramWriteBuffer(
                offsets.save_context + 0x00F8 + offsets.current_scene * 0xD20,
                buf
            );
        }
    }
}