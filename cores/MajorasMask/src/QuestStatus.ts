import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { FlagManager, Flag } from 'modloader64_api/FlagManager';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import IUtils from 'modloader64_api/IUtils';

export class QuestStatus extends JSONTemplate implements API.IQuestStatus {
    private utils: IUtils;
    private emulator: IMemory;
    private offsets = new API.MMOffsets;
    private instance: number = this.offsets.save_context;
    private questFlags: FlagManager;
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
        'heartPieces1',
        'heartPieces2',
        'heartPieces3',
        'heartPieces4'
    ];
    constructor(emu: IMemory, utils: IUtils) {
        super();
        this.emulator = emu;
        this.utils = utils;
        this.questFlags = new FlagManager(emu, this.questFlagsAddr);
    }

    /*
      Quest Items (bitfield)	BC	1  bit 0: Lullaby Intro; bits 4-7: heart pieces
                                       bit 7: Lullaby Intro;
                                       bit 6: Nothing;
                                       bit 5: Nothing;
                                       bit 4: Nothing;
                                       bit 3, 2, 1, 0: HPieces
      Quest Items (bitfield)	BD	1  bits 0-1: songs; bit 2: Bomber's Notebook; bit 3: unknown
                                     bit 3: Song of Storms; 
                                     bit 2: 2nd SoS icon
                                     bit 1: Bomeber's Notebook
                                     bit 0: Nothing
      Quest Items (bitfield)	BE	1  bits 0-7: songs
                                     bit 7: New Wave Bossa Nova
                                     bit 6: Elegy of Emptiness
                                     bit 5: Oath to Order
                                     bit 4: Prelude Icon
                                     bit 3: Song of Time
                                     bit 2: Song of Healing
                                     bit 1: Eponas Song
                                     bit 0: Song of Soaring
  
      Quest Items (bitfield)	BF	1  bits 0-3: Remains; bits 6-7: songs
                                     bit 7: Odolwa Remains
                                     bit 6: Goht Remains
                                     bit 5: Gyorg Remains
                                     bit 4: Twinmold Remains
                                     bit 3: Nothing
                                     bit 2: Nothing
                                     bit 1: Sonata of Awakening
                                     bit 0: Goron Lullaby
  */


    private lullabyIntroFlag = new Flag(0x0, 0x7);
    get lullabyIntro(): boolean {
        return this.questFlags.isFlagSet(this.lullabyIntroFlag);
    }
    set lullabyIntro(bool: boolean) {
        this.questFlags.setFlag(this.lullabyIntroFlag, bool);
    }

    private unknown1Flag = new Flag(0x0, 0x6);
    get unknown1(): boolean {
        return this.questFlags.isFlagSet(this.unknown1Flag);
    }
    set unknown1(bool: boolean) {
        this.questFlags.setFlag(this.unknown1Flag, bool);
    }
    private unknown2Flag = new Flag(0x0, 0x5);
    get unknown2(): boolean {
        return this.questFlags.isFlagSet(this.unknown2Flag);
    }
    set unknown2(bool: boolean) {
        this.questFlags.setFlag(this.unknown2Flag, bool);
    }
    private unknown3Flag = new Flag(0x0, 0x4);
    get unknown3(): boolean {
        return this.questFlags.isFlagSet(this.unknown3Flag);
    }
    set unknown3(bool: boolean) {
        this.questFlags.setFlag(this.unknown3Flag, bool);
    }

    get heartPieceCount(): number {
        let bits: Buffer = this.emulator.rdramReadBits8(0x801EF72C); // your addr here
        let hp: Buffer = bits.slice(0, 5);
        let count: number = (() => { let t = 0; if (hp[3] > 0 && hp[2] < 1) { t++; } if (hp[2] > 0 && hp[3] < 1) { t += 2; } if (hp[2] > 0 && hp[3] > 0) { t += 3; } return t; })();
        return count;
    }

    set heartPieceCount(count: number)  {
        let bits: Buffer = this.emulator.rdramReadBits8(0x801EF72C); // your addr here
        let hp: Buffer = bits.slice(0, 5);
        (()=>{if (count === 3){hp[2] = 1; hp[3] = 1;}else if (count === 2){hp[2] = 1; hp[3] = 0}else if (count === 1){hp[3] = 1; hp[2] = 0}else if (count <= 0){hp[3] = 0; hp[2] = 0}})();
        this.emulator.rdramWriteBits8(0x801EF72C, bits);
    }

    private heartPiecesFlag1 = new Flag(0x0, 0x3);
    get heartPieces1(): boolean {
        return this.questFlags.isFlagSet(this.heartPiecesFlag1);
    }
    set heartPieces1(bool: boolean) {
        this.questFlags.setFlag(this.heartPiecesFlag1, bool);
    }

    private heartPiecesFlag2 = new Flag(0x0, 0x2);
    get heartPieces2(): boolean {
        return this.questFlags.isFlagSet(this.heartPiecesFlag2);
    }
    set heartPieces2(bool: boolean) {
        this.questFlags.setFlag(this.heartPiecesFlag2, bool);
    }

    private heartPiecesFlag3 = new Flag(0x0, 0x1);
    get heartPieces3(): boolean {
        return this.questFlags.isFlagSet(this.heartPiecesFlag3);
    }
    set heartPieces3(bool: boolean) {
        this.questFlags.setFlag(this.heartPiecesFlag3, bool);
    }

    private heartPiecesFlag4 = new Flag(0x0, 0x0);
    get heartPieces4(): boolean {
        return this.questFlags.isFlagSet(this.heartPiecesFlag4);
    }
    set heartPieces4(bool: boolean) {
        this.questFlags.setFlag(this.heartPiecesFlag4, bool);
    }


    private songOfStormsFlag = new Flag(0x1, 0x7);
    get songOfStorms(): boolean {
        return this.questFlags.isFlagSet(this.songOfStormsFlag);
    }
    set songOfStorms(bool: boolean) {
        this.questFlags.setFlag(this.songOfStormsFlag, bool);
    }

    private songOfStormsIconFlag = new Flag(0x1, 0x6);
    get songOfStormsIcon(): boolean {
        return this.questFlags.isFlagSet(this.songOfStormsIconFlag);
    }
    set songOfStormsIcon(bool: boolean) {
        this.questFlags.setFlag(this.songOfStormsIconFlag, bool);
    }

    private bombersNotebookFlag = new Flag(0x1, 0x5);
    get bombersNotebook(): boolean {
        return this.questFlags.isFlagSet(this.bombersNotebookFlag);
    }
    set bombersNotebook(bool: boolean) {
        this.questFlags.setFlag(this.bombersNotebookFlag, bool);
    }

    private unknown4Flag = new Flag(0x1, 0x4);
    get unknown4(): boolean {
        return this.questFlags.isFlagSet(this.unknown4Flag);
    }
    set unknown4(bool: boolean) {
        this.questFlags.setFlag(this.unknown4Flag, bool);
    }

    private newWaveBossaNovaFlag = new Flag(0x2, 0x7);
    get newWaveBossaNova(): boolean {
        return this.questFlags.isFlagSet(this.newWaveBossaNovaFlag);
    }
    set newWaveBossaNova(bool: boolean) {
        this.questFlags.setFlag(this.newWaveBossaNovaFlag, bool);
    }
    private elegyOfEmptinessFlag = new Flag(0x2, 0x6);
    get elegyOfEmptiness(): boolean {
        return this.questFlags.isFlagSet(this.elegyOfEmptinessFlag);
    }
    set elegyOfEmptiness(bool: boolean) {
        this.questFlags.setFlag(this.elegyOfEmptinessFlag, bool);
    }
    private oathToOrderFlag = new Flag(0x2, 0x5);
    get oathToOrder(): boolean {
        return this.questFlags.isFlagSet(this.oathToOrderFlag);
    }
    set oathToOrder(bool: boolean) {
        this.questFlags.setFlag(this.oathToOrderFlag, bool);
    }

    private preludeIconFlag = new Flag(0x2, 0x4);
    get preludeIcon(): boolean {
        return this.questFlags.isFlagSet(this.preludeIconFlag);
    }
    set preludeIcon(bool: boolean) {
        this.questFlags.setFlag(this.preludeIconFlag, bool);
    }

    private songOfTimeFlag = new Flag(0x2, 0x3);
    get songOfTime(): boolean {
        return this.questFlags.isFlagSet(this.songOfTimeFlag);
    }
    set songOfTime(bool: boolean) {
        this.questFlags.setFlag(this.songOfTimeFlag, bool);
    }

    private songOfHealingFlag = new Flag(0x2, 0x2);
    get songOfHealing(): boolean {
        return this.questFlags.isFlagSet(this.songOfHealingFlag);
    }
    set songOfHealing(bool: boolean) {
        this.questFlags.setFlag(this.songOfHealingFlag, bool);
    }

    private eponaSongFlag = new Flag(0x2, 0x1);
    get eponaSong(): boolean {
        return this.questFlags.isFlagSet(this.eponaSongFlag);
    }
    set eponaSong(bool: boolean) {
        this.questFlags.setFlag(this.eponaSongFlag, bool);
    }

    private songOfSoaringFlag = new Flag(0x2, 0x0);
    get songOfSoaring(): boolean {
        return this.questFlags.isFlagSet(this.songOfSoaringFlag);
    }
    set songOfSoaring(bool: boolean) {
        this.questFlags.setFlag(this.songOfSoaringFlag, bool);
    }

    private odolwaRemainsFlag = new Flag(0x3, 0x7);
    get odolwaRemains(): boolean {
        return this.questFlags.isFlagSet(this.odolwaRemainsFlag);
    }
    set odolwaRemains(bool: boolean) {
        this.questFlags.setFlag(this.odolwaRemainsFlag, bool);
    }
    private gohtRemainsFlag = new Flag(0x3, 0x6);
    get gohtRemains(): boolean {
        return this.questFlags.isFlagSet(this.gohtRemainsFlag);
    }
    set gohtRemains(bool: boolean) {
        this.questFlags.setFlag(this.gohtRemainsFlag, bool);
    }
    private gyorgRemainsFlag = new Flag(0x3, 0x5);
    get gyorgRemains(): boolean {
        return this.questFlags.isFlagSet(this.gyorgRemainsFlag);
    }
    set gyorgRemains(bool: boolean) {
        this.questFlags.setFlag(this.gyorgRemainsFlag, bool);
    }
    private twinmoldRemainsFlag = new Flag(0x3, 0x4);
    get twinmoldRemains(): boolean {
        return this.questFlags.isFlagSet(this.twinmoldRemainsFlag);
    }
    set twinmoldRemains(bool: boolean) {
        this.questFlags.setFlag(this.twinmoldRemainsFlag, bool);
    }

    private unknown5Flag = new Flag(0x3, 0x3);
    get unknown5(): boolean {
        return this.questFlags.isFlagSet(this.unknown5Flag);
    }
    set unknown5(bool: boolean) {
        this.questFlags.setFlag(this.unknown5Flag, bool);
    }
    private unknown6Flag = new Flag(0x3, 0x2);
    get unknown6(): boolean {
        return this.questFlags.isFlagSet(this.unknown6Flag);
    }
    set unknown6(bool: boolean) {
        this.questFlags.setFlag(this.unknown6Flag, bool);
    }

    private sonataOfAwakeningFlag = new Flag(0x3, 0x1);
    get sonataOfAwakening(): boolean {
        return this.questFlags.isFlagSet(this.sonataOfAwakeningFlag);
    }
    set sonataOfAwakening(bool: boolean) {
        this.questFlags.setFlag(this.sonataOfAwakeningFlag, bool);
    }
    private goronLullabyFlag = new Flag(0x3, 0x0);
    get goronLullaby(): boolean {
        return this.questFlags.isFlagSet(this.goronLullabyFlag);
    }
    set goronLullaby(bool: boolean) {
        this.questFlags.setFlag(this.goronLullabyFlag, bool);
    }
}
