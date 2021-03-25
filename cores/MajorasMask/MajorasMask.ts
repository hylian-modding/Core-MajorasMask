import { onTick, Preinit, Init, Postinit, onPostTick } from "modloader64_api/PluginLifecycle";
import { IRomHeader } from 'modloader64_api/IRomHeader';
import { ModLoaderAPIInject } from "modloader64_api/ModLoaderAPIInjector";
import { IModLoaderAPI, ILogger, ICore, ModLoaderEvents } from "modloader64_api/IModLoaderAPI";
import { bus, EventHandler } from "modloader64_api/EventHandler";
import { PayloadType } from "modloader64_api/PayloadType";
import IMemory from "modloader64_api/IMemory";
import fs from 'fs';
import path from 'path';

import * as API from './API/Imports';
import * as CORE from './src/Imports';
import { CommandBuffer } from "./src/CommandBuffer";
import { ActorManager, GlobalContext, Link, SaveContext, MMHelper, Skull, Stray } from "./src/Imports";
import { OverlayPayload } from "./src/ovl/ovlinjector";
import { MMEvents, IPhoto, ISkull, IStray } from "./API/Imports";
import { Photo } from "./src/Photo";

export class MajorasMask implements ICore, API.IMMCore {
    header = "NZS";
    @ModLoaderAPIInject()
    ModLoader: IModLoaderAPI = {} as IModLoaderAPI;
    eventTicks: Map<string, Function> = new Map<string, Function>();
    link!: API.ILink;
    save!: API.ISaveContext;
    global!: API.IGlobalContext;
    helper!: API.IMMHelper;
    commandBuffer!: CommandBuffer;
    photo!: IPhoto;
    skull!: ISkull;
    stray!: IStray;
    // Client side variables
    isSaveLoaded = false;
    isPaused = false;
    last_known_scene = -1;
    last_known_room = -1;
    doorcheck = false;
    touching_loading_zone = false;
    frame_count_reset_scene = -1;
    last_known_age!: number;
    log!: ILogger;
    actorManager!: API.IActorManager;
    payloads: string[] = new Array<string>();
    inventory_cache: Buffer = Buffer.alloc(0x18, 0xff);
    offsets = new API.MMOffsets;

    constructor() {
    }

    @Preinit()
    preinit() {

    }

    
    @EventHandler(ModLoaderEvents.ON_SOFT_RESET_PRE)
    onReset1(evt: any) {
        this.isSaveLoaded = false;
    }

    @EventHandler(ModLoaderEvents.ON_SOFT_RESET_POST)
    onReset2(evt: any) {
        this.isSaveLoaded = false;
    }
    
    @Init()
    init(): void {
        this.eventTicks.set('waitingForSaveload', () => {
            if (!this.isSaveLoaded && this.helper.isSceneNumberValid() && !this.helper.isTitleScreen()) {
                this.isSaveLoaded = true;
                bus.emit(API.MMEvents.ON_SAVE_LOADED, {});
            }
        });
    }

    @Postinit()
    postinit(): void {

        this.global = new GlobalContext(this.ModLoader);
        this.link = new Link(this.ModLoader.emulator);
        this.save = new SaveContext(this.ModLoader.emulator, this.ModLoader.logger, this);
        this.helper = new MMHelper(
            this.save,
            this.global,
            this.link,
            this.ModLoader.emulator
        );
        this.photo = new Photo(this.ModLoader.emulator, this.save);
        this.stray = new Stray(this.ModLoader.emulator, this.save);
        this.skull = new Skull(this.ModLoader.emulator, this.save);
        this.actorManager = new ActorManager(
            this.ModLoader.emulator,
            this.ModLoader.logger,
            this.helper,
            this.global,
            this.ModLoader.utils
        );
        this.commandBuffer = new CommandBuffer(this.ModLoader.emulator);

        this.ModLoader.payloadManager.registerPayloadType(new OverlayPayload(".ovl"));

    }

    @onTick()
    onTick() {

        this.commandBuffer.onTick();

        if (this.helper.isTitleScreen() || !this.helper.isSceneNumberValid()) return;
        
        // Loading zone check
        if (this.helper.isLinkEnteringLoadingZone() && !this.touching_loading_zone) {
            bus.emit(API.MMEvents.ON_LOADING_ZONE, {});
            this.touching_loading_zone = true;
        }
        // Scene change check
        if (
            this.global.scene_framecount === 1
        ) {
            this.last_known_scene = this.global.current_scene;
            bus.emit(API.MMEvents.ON_SCENE_CHANGE, this.last_known_scene);
            this.touching_loading_zone = false;
        }
        // Age check
        if (this.save.form !== this.last_known_age){
            this.last_known_age = this.save.form;
            bus.emit(API.MMEvents.ON_AGE_CHANGE, this.last_known_age);
        }

        // UnPause Check
        if(this.helper.isPaused()){
            this.isPaused = true;
        }
        else if(!this.helper.isPaused() && this.isPaused){
            this.isPaused = false;
            bus.emit(API.MMEvents.ON_UNPAUSE);
        }
        
        this.eventTicks.forEach((value: Function, key: string) => {
            value();
        });
    }
    
    @onPostTick()
    onPostTick() {
        this.link.current_sound_id = 0;
    }
    
}