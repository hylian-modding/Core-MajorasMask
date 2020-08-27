import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { FlagManager, Flag } from 'modloader64_api/FlagManager';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';

export class QuestStatus extends JSONTemplate implements API.IQuestStatus {
    private emulator: IMemory;
    private offsets = new API.MMOffsets;
    private instance: number = this.offsets.save_context;
    private questFlags: FlagManager;
    private skulltulaAddr: number = this.instance + 0x00d0;
    private questFlagsAddr: number = this.instance + 0xBC;
    jsonFields: string[] = [
        'odolwaRemains',
        'gohtRemains',
        'gyorgRemains',
        'twinmoldRemains',
        'songOfTime',
        'songOfHealing',
        'eponaSong',
        'songOfSoaring',
        'songOfStorms',
        'sonataOfAwakening',
        'goronLullaby',
        'newWaveBossaNova',
        'elegyOfEmptiness',
        'oathToOrder',
        'bombersNotebook',
        'heartPieces'
    ];
    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
        this.questFlags = new FlagManager(emu, this.questFlagsAddr);
    }

    //TODO: ADJUST FOR MM FLAGS

    /*
      Quest Items (bitfield)	BC	1  bit 0: Lullaby Intro; bits 4-7: heart pieces
      Quest Items (bitfield)	BD	1  bits 0-1: songs; bit 2: Bomber's Notebook; bit 3: unknown
                                     bit 0: Song of Storms; 
                                     bit 1: 2nd SoS icon
                                     bit 2: Bomeber's Notebook
      Quest Items (bitfield)	BE	1  bits 0-7: songs
                                     bit 0: New Wave Bossa Nova
                                     bit 1: Elegy of Emptiness
                                     bit 2: Oath to Order
                                     bit 3: Prelude Icon
                                     bit 4: Song of Time
                                     bit 5: Song of Healing
                                     bit 6: Eponas Song
                                     bit 7: Song of Soaring
  
      Quest Items (bitfield)	BF	1  bits 0-3: Remains; bits 6-7: songs
                                     bit 0: Odolwa Remains
                                     bit 1: Goht Remains
                                     bit 2: Gyorg Remains
                                     bit 3: Twinmold Remains
                                     bit 4: Nothing
                                     bit 5: Nothing
                                     bit 6: Sonata of Awakening
                                     bit 7: Goron Lullaby
  */


    private lullabyIntroFlag = new Flag(0x0, 0x0);
    get lullabyIntro(): boolean {
        return this.questFlags.isFlagSet(this.lullabyIntroFlag);
    }
    set lullabyIntro(bool: boolean) {
        this.questFlags.setFlag(this.lullabyIntroFlag, bool);
    }

    private unknown1Flag = new Flag(0x0, 0x1);
    get unknown1(): boolean {
        return this.questFlags.isFlagSet(this.unknown1Flag);
    }
    set unknown1(bool: boolean) {
        this.questFlags.setFlag(this.unknown1Flag, bool);
    }
    private unknown2Flag = new Flag(0x0, 0x2);
    get unknown2(): boolean {
        return this.questFlags.isFlagSet(this.unknown2Flag);
    }
    set unknown2(bool: boolean) {
        this.questFlags.setFlag(this.unknown2Flag, bool);
    }
    private unknown3Flag = new Flag(0x0, 0x3);
    get unknown3(): boolean {
        return this.questFlags.isFlagSet(this.unknown3Flag);
    }
    set unknown3(bool: boolean) {
        this.questFlags.setFlag(this.unknown3Flag, bool);
    }

    private heartPiecesFlag1 = new Flag(0x0, 0x4);
    get heartPieces1(): boolean {
        return this.questFlags.isFlagSet(this.heartPiecesFlag1);
    }
    set heartPieces1(bool: boolean) {
        this.questFlags.setFlag(this.heartPiecesFlag1, bool);
    }

    private heartPiecesFlag2 = new Flag(0x0, 0x5);
    get heartPieces2(): boolean {
        return this.questFlags.isFlagSet(this.heartPiecesFlag2);
    }
    set heartPieces2(bool: boolean) {
        this.questFlags.setFlag(this.heartPiecesFlag2, bool);
    }

    private heartPiecesFlag3 = new Flag(0x0, 0x6);
    get heartPieces3(): boolean {
        return this.questFlags.isFlagSet(this.heartPiecesFlag3);
    }
    set heartPieces3(bool: boolean) {
        this.questFlags.setFlag(this.heartPiecesFlag3, bool);
    }

    private heartPiecesFlag4 = new Flag(0x0, 0x7);
    get heartPieces4(): boolean {
        return this.questFlags.isFlagSet(this.heartPiecesFlag4);
    }
    set heartPieces4(bool: boolean) {
        this.questFlags.setFlag(this.heartPiecesFlag4, bool);
    }


    private songOfStormsFlag = new Flag(0x1, 0x0);
    get songOfStorms(): boolean {
        return this.questFlags.isFlagSet(this.songOfStormsFlag);
    }
    set songOfStorms(bool: boolean) {
        this.questFlags.setFlag(this.songOfStormsFlag, bool);
    }

    private bombersNotebookFlag = new Flag(0x1, 0x2);
    get bombersNotebook(): boolean {
        return this.questFlags.isFlagSet(this.bombersNotebookFlag);
    }
    set bombersNotebook(bool: boolean) {
        this.questFlags.setFlag(this.bombersNotebookFlag, bool);
    }

    private newWaveBossaNovaFlag = new Flag(0x2, 0x0);
    get newWaveBossaNova(): boolean {
        return this.questFlags.isFlagSet(this.newWaveBossaNovaFlag);
    }
    set newWaveBossaNova(bool: boolean) {
        this.questFlags.setFlag(this.newWaveBossaNovaFlag, bool);
    }
    private elegyOfEmptinessFlag = new Flag(0x2, 0x1);
    get elegyOfEmptiness(): boolean {
        return this.questFlags.isFlagSet(this.elegyOfEmptinessFlag);
    }
    set elegyOfEmptiness(bool: boolean) {
        this.questFlags.setFlag(this.elegyOfEmptinessFlag, bool);
    }
    private oathToOrderFlag = new Flag(0x2, 0x2);
    get oathToOrder(): boolean {
        return this.questFlags.isFlagSet(this.oathToOrderFlag);
    }
    set oathToOrder(bool: boolean) {
        this.questFlags.setFlag(this.oathToOrderFlag, bool);
    }

    private preludeIconFlag = new Flag(0x2, 0x3);
    get preludeIcon(): boolean {
        return this.questFlags.isFlagSet(this.preludeIconFlag);
    }
    set preludeIcon(bool: boolean) {
        this.questFlags.setFlag(this.preludeIconFlag, bool);
    }

    private songOfTimeFlag = new Flag(0x2, 0x4);
    get songOfTime(): boolean {
        return this.questFlags.isFlagSet(this.songOfTimeFlag);
    }
    set songOfTime(bool: boolean) {
        this.questFlags.setFlag(this.songOfTimeFlag, bool);
    }

    private songOfHealingFlag = new Flag(0x2, 0x5);
    get songOfHealing(): boolean {
        return this.questFlags.isFlagSet(this.songOfHealingFlag);
    }
    set songOfHealing(bool: boolean) {
        this.questFlags.setFlag(this.songOfHealingFlag, bool);
    }

    private eponaSongFlag = new Flag(0x2, 0x6);
    get eponaSong(): boolean {
        return this.questFlags.isFlagSet(this.eponaSongFlag);
    }
    set eponaSong(bool: boolean) {
        this.questFlags.setFlag(this.eponaSongFlag, bool);
    }

    private songOfSoaringFlag = new Flag(0x2, 0x7);
    get songOfSoaring(): boolean {
        return this.questFlags.isFlagSet(this.songOfSoaringFlag);
    }
    set songOfSoaring(bool: boolean) {
        this.questFlags.setFlag(this.songOfSoaringFlag, bool);
    }

    private odolwaRemainsFlag = new Flag(0x3, 0x0);
    get odolwaRemains(): boolean {
        return this.questFlags.isFlagSet(this.odolwaRemainsFlag);
    }
    set odolwaRemains(bool: boolean) {
        this.questFlags.setFlag(this.odolwaRemainsFlag, bool);
    }
    private gohtRemainsFlag = new Flag(0x3, 0x1);
    get gohtRemains(): boolean {
        return this.questFlags.isFlagSet(this.gohtRemainsFlag);
    }
    set gohtRemains(bool: boolean) {
        this.questFlags.setFlag(this.gohtRemainsFlag, bool);
    }
    private gyorgRemainsFlag = new Flag(0x3, 0x2);
    get gyorgRemains(): boolean {
        return this.questFlags.isFlagSet(this.gyorgRemainsFlag);
    }
    set gyorgRemains(bool: boolean) {
        this.questFlags.setFlag(this.gyorgRemainsFlag, bool);
    }
    private twinmoldRemainsFlag = new Flag(0x3, 0x3);
    get twinmoldRemains(): boolean {
        return this.questFlags.isFlagSet(this.twinmoldRemainsFlag);
    }
    set twinmoldRemains(bool: boolean) {
        this.questFlags.setFlag(this.twinmoldRemainsFlag, bool);
    }

    private unknown4Flag = new Flag(0x3, 0x4);
    get unknown4(): boolean {
        return this.questFlags.isFlagSet(this.unknown4Flag);
    }
    set unknown4(bool: boolean) {
        this.questFlags.setFlag(this.unknown4Flag, bool);
    }
    private unknown5Flag = new Flag(0x3, 0x5);
    get unknown5(): boolean {
        return this.questFlags.isFlagSet(this.unknown5Flag);
    }
    set unknown5(bool: boolean) {
        this.questFlags.setFlag(this.unknown5Flag, bool);
    }

    private sonataOfAwakeningFlag = new Flag(0x3, 0x6);
    get sonataOfAwakening(): boolean {
        return this.questFlags.isFlagSet(this.sonataOfAwakeningFlag);
    }
    set sonataOfAwakening(bool: boolean) {
        this.questFlags.setFlag(this.sonataOfAwakeningFlag, bool);
    }
    private goronLullabyFlag = new Flag(0x3, 0x7);
    get goronLullaby(): boolean {
        return this.questFlags.isFlagSet(this.goronLullabyFlag);
    }
    set goronLullaby(bool: boolean) {
        this.questFlags.setFlag(this.goronLullabyFlag, bool);
    }
}
