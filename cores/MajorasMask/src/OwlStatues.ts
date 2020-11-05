import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { FlagManager, Flag } from 'modloader64_api/FlagManager';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';

export class OwlStatues extends JSONTemplate implements API.IOwlStatues {
    private offsets = new API.MMOffsets;
    private instance: number = this.offsets.save_context;
    private owlFlags: FlagManager;
    private owlFlagsAddr: number = this.instance + 0x46;
    jsonFields: string[] = [
        "greatBayCoast",
        "zoraCape",
        "snowhead",
        "mountainVillage",
        "clockTown",
        "milkRoad",
        "woodfall",
        "southernSwamp",
        "ikanaCanyon",
        "stoneTower",
        "hiddenOwlStatue"
    ];
    constructor(emu: IMemory) {
        super();
        this.owlFlags = new FlagManager(emu, this.owlFlagsAddr);
    }
    // Byte 0x0
    // hiddenOwlStatue: boolean; //bit 7
    // bits 6-2 unused
    // stoneTower: boolean; //bit 1
    // ikanaCanyon: boolean; //bit 0

    // Byte 0x1
    // southernSwamp: boolean; //bit 7
    // woodfall: boolean; //bit 6
    // milkRoad: boolean; //bit 5
    // clockTown: boolean; // bit 4
    // mountainVillage: boolean; //bit 3
    // snowhead: boolean; //bit 2
    // zoraCape: boolean; //bit 1
    // greatBayCoast: boolean; //bit 0

    private hiddenOwlStatueFlag = new Flag(0x0, 0x0);
    get hiddenOwlStatue(): boolean {
        return this.owlFlags.isFlagSet(this.hiddenOwlStatueFlag);
    }
    set hiddenOwlStatue(bool: boolean) {
        this.owlFlags.setFlag(this.hiddenOwlStatueFlag, bool);
    }

    private stoneTowerFlag = new Flag(0x0, 0x6);
    get stoneTower(): boolean {
        return this.owlFlags.isFlagSet(this.stoneTowerFlag);
    }
    set stoneTower(bool: boolean) {
        this.owlFlags.setFlag(this.stoneTowerFlag, bool);
    }

    private ikanaCanyonFlag = new Flag(0x0, 0x7);
    get ikanaCanyon(): boolean {
        return this.owlFlags.isFlagSet(this.ikanaCanyonFlag);
    }
    set ikanaCanyon(bool: boolean) {
        this.owlFlags.setFlag(this.ikanaCanyonFlag, bool);
    }

    private southernSwampFlag = new Flag(0x1, 0x0);
    get southernSwamp(): boolean {
        return this.owlFlags.isFlagSet(this.southernSwampFlag);
    }
    set southernSwamp(bool: boolean) {
        this.owlFlags.setFlag(this.southernSwampFlag, bool);
    }

    private woodfallFlag = new Flag(0x1, 0x1);
    get woodfall(): boolean {
        return this.owlFlags.isFlagSet(this.woodfallFlag);
    }
    set woodfall(bool: boolean) {
        this.owlFlags.setFlag(this.woodfallFlag, bool);
    }

    private milkRoadFlag = new Flag(0x1, 0x2);
    get milkRoad(): boolean {
        return this.owlFlags.isFlagSet(this.milkRoadFlag);
    }
    set milkRoad(bool: boolean) {
        this.owlFlags.setFlag(this.milkRoadFlag, bool);
    }

    private clockTownFlag = new Flag(0x1, 0x3);
    get clockTown(): boolean {
        return this.owlFlags.isFlagSet(this.clockTownFlag);
    }
    set clockTown(bool: boolean) {
        this.owlFlags.setFlag(this.clockTownFlag, bool);
    }

    private mountainVillageFlag = new Flag(0x1, 0x4);
    get mountainVillage(): boolean {
        return this.owlFlags.isFlagSet(this.mountainVillageFlag);
    }
    set mountainVillage(bool: boolean) {
        this.owlFlags.setFlag(this.mountainVillageFlag, bool);
    }

    private snowheadFlag = new Flag(0x1, 0x5);
    get snowhead(): boolean {
        return this.owlFlags.isFlagSet(this.snowheadFlag);
    }
    set snowhead(bool: boolean) {
        this.owlFlags.setFlag(this.snowheadFlag, bool);
    }

    private zoraCapeFlag = new Flag(0x1, 0x6);
    get zoraCape(): boolean {
        return this.owlFlags.isFlagSet(this.zoraCapeFlag);
    }
    set zoraCape(bool: boolean) {
        this.owlFlags.setFlag(this.zoraCapeFlag, bool);
    }

    private greatBayCoastFlag = new Flag(0x1, 0x7);
    get greatBayCoast(): boolean {
        return this.owlFlags.isFlagSet(this.greatBayCoastFlag);
    }
    set greatBayCoast(bool: boolean) {
        this.owlFlags.setFlag(this.greatBayCoastFlag, bool);
    }
}