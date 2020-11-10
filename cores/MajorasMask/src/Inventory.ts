import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { FlagManager } from 'modloader64_api/FlagManager';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { ILogger } from 'modloader64_api/IModLoaderAPI';
import { NONAME } from 'dns';

export class Inventory extends JSONTemplate implements API.IInventory {
    private emulator: IMemory;
    private offsets = new API.MMOffsets;
    private instance: number = this.offsets.save_context;
    private inventory_addr: number = this.instance + 0x0070;
    private inventory_ammo_addr: number = this.instance + 0x00A0;
    private inventory_upgrades_addr: number = this.instance + 0x00B8;
    private log: ILogger;
    jsonFields: string[] = [
        'dekuSticksCapacity',
        'dekuNutsCapacity',
        'bombBag',
        'quiver',
        'FIELD_OCARINA',
        'FIELD_HEROES_BOW',
        'FIELD_FIRE_ARROW',
        'FIELD_ICE_ARROW',
        'FIELD_LIGHT_ARROW',
        'FIELD_QUEST_ITEM_1',
        'FIELD_BOMB',
        'FIELD_BOMBCHU',
        'FIELD_DEKU_STICKS',
        'FIELD_DEKU_NUT',
        'FIELD_MAGIC_BEAN',
        'FIELD_QUEST_ITEM_2',
        'FIELD_POWDER_KEG',
        'FIELD_PICTOGRAPH_BOX',
        'FIELD_LENS_OF_TRUTH',
        'FIELD_HOOKSHOT',
        'FIELD_GREAT_FAIRYS_SWORD',
        'FIELD_QUEST_ITEM_3',
        'FIELD_BOTTLE1',
        'FIELD_BOTTLE2',
        'FIELD_BOTTLE3',
        'FIELD_BOTTLE4',
        'FIELD_BOTTLE5',
        'FIELD_BOTTLE6',
        'FIELD_MASK_POSTMAN',
        'FIELD_MASK_ALL_NIGHT',
        'FIELD_MASK_BLAST',
        'FIELD_MASK_STONE',
        'FIELD_MASK_GREAT_FAIRY',
        'FIELD_MASK_DEKU',
        'FIELD_MASK_KEATON',
        'FIELD_MASK_BREMEN',
        'FIELD_MASK_BUNNY_HOOD',
        'FIELD_MASK_DON_GERO',
        'FIELD_MASK_OF_SCENTS',
        'FIELD_MASK_GORON',
        'FIELD_MASK_ROMANI',
        'FIELD_MASK_CIRCUS_LEADER',
        'FIELD_MASK_KAFEI',
        'FIELD_MASK_COUPLES',
        'FIELD_MASK_OF_TRUTH',
        'FIELD_MASK_ZORA',
        'FIELD_MASK_KAMERO',
        'FIELD_MASK_GIBDO',
        'FIELD_MASK_GARO',
        'FIELD_MASK_CAPTAIN',
        'FIELD_MASK_GIANT',
        'FIELD_MASK_FIERCE_DEITY',
    ];

    constructor(emu: IMemory, log: ILogger) {
        super();
        this.emulator = emu;
        this.log = log;
    }

    get FIELD_OCARINA(): API.Ocarina {
        let val = this.getItemInSlot(API.InventorySlots.OCARINA_OF_TIME);
        switch (val) {
            case API.InventoryItem.OCARINA_OF_TIME:
                return API.Ocarina.OCARINA_OF_TIME;
            default:
                return API.Ocarina.NONE;
        }
    }
    set FIELD_OCARINA(item: API.Ocarina) {
        if (item === this.FIELD_OCARINA) return;

        switch (item) {
            case API.Ocarina.NONE:
                this.setItemInSlot(API.InventoryItem.NONE, API.InventorySlots.OCARINA_OF_TIME);
                break;
            case API.Ocarina.OCARINA_OF_TIME:
                this.setItemInSlot(
                    API.InventoryItem.OCARINA_OF_TIME,
                    API.InventorySlots.OCARINA_OF_TIME
                );
                break;
        }
    }

    get FIELD_HEROES_BOW(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.HEROES_BOW)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_HEROES_BOW(bow: boolean) {
        let value = bow ? API.InventoryItem.HEROES_BOW : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.HEROES_BOW)
    }

    get FIELD_FIRE_ARROW(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.FIRE_ARROWS)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_FIRE_ARROW(bool: boolean) {
        let value = bool ? API.InventoryItem.FIRE_ARROW : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.FIRE_ARROWS)
    }

    get FIELD_ICE_ARROW(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.ICE_ARROWS)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_ICE_ARROW(bool: boolean) {
        let value = bool ? API.InventoryItem.ICE_ARROW : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.ICE_ARROWS)
    }

    get FIELD_LIGHT_ARROW(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.LIGHT_ARROWS)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_LIGHT_ARROW(lightA: boolean) {
        let value = lightA ? API.InventoryItem.LIGHT_ARROW : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.LIGHT_ARROWS)
    }

    get FIELD_BOMB(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.BOMBS)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_BOMB(bool: boolean) {
        let value = bool ? API.InventoryItem.BOMB : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.BOMBS)
    }

    get FIELD_BOMBCHU(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.BOMBCHUS)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_BOMBCHU(bool: boolean) {
        let value = bool ? API.InventoryItem.BOMBCHU : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.BOMBCHUS)
    }

    get FIELD_DEKU_STICKS(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.DEKU_STICKS)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_DEKU_STICKS(bool: boolean) {
        let value = bool ? API.InventoryItem.DEKU_STICK : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.DEKU_STICKS)
    }

    get FIELD_DEKU_NUT(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.DEKU_NUTS)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_DEKU_NUT(bool: boolean) {
        let value = bool ? API.InventoryItem.DEKU_NUT : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.DEKU_NUTS)
    }

    get FIELD_MAGIC_BEAN(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MAGIC_BEANS)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MAGIC_BEAN(bool: boolean) {
        let value = bool ? API.InventoryItem.MAGIC_BEANS : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MAGIC_BEANS)
    }

    get FIELD_POWDER_KEG(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.POWDER_KEG)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_POWDER_KEG(bool: boolean) {
        let value = bool ? API.InventoryItem.POWDER_KEG : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.POWDER_KEG)
    }

    get FIELD_PICTOGRAPH_BOX(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.PICTOGRAPH_BOX)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_PICTOGRAPH_BOX(bool: boolean) {
        let value = bool ? API.InventoryItem.PICTOGRAPH_BOX : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.PICTOGRAPH_BOX)
    }

    get FIELD_LENS_OF_TRUTH(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.LENS_OF_TRUTH)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_LENS_OF_TRUTH(bool: boolean) {
        let value = bool ? API.InventoryItem.LENS_OF_TRUTH : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.LENS_OF_TRUTH)
    }

    get FIELD_HOOKSHOT(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.HOOKSHOT)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_HOOKSHOT(bool: boolean) {
        let value = bool ? API.InventoryItem.HOOKSHOT : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.HOOKSHOT)
    }

    get FIELD_GREAT_FAIRYS_SWORD(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.GREAT_FAIRYS_SWORD)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_GREAT_FAIRYS_SWORD(bool: boolean) {
        let value = bool ? API.InventoryItem.GREAT_FAIRYS_SWORD : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.GREAT_FAIRYS_SWORD)
    }

    get FIELD_MASK_POSTMAN(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_POSTMAN)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_POSTMAN(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_POSTMAN : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_POSTMAN)
    }

    get FIELD_MASK_ALL_NIGHT(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_ALL_NIGHT)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_ALL_NIGHT(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_ALL_NIGHT : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_ALL_NIGHT)
    }

    get FIELD_MASK_BLAST(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_BLAST)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_BLAST(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_BLAST : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_BLAST)
    }

    get FIELD_MASK_STONE(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_STONE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_STONE(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_STONE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_STONE)
    }

    get FIELD_MASK_GREAT_FAIRY(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_GREAT_FAIRY)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_GREAT_FAIRY(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_GREAT_FAIRY : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_GREAT_FAIRY)
    }

    get FIELD_MASK_DEKU(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_DEKU)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_DEKU(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_DEKU : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_DEKU)
    }

    get FIELD_MASK_KEATON(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_KEATON)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_KEATON(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_KEATON : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_KEATON)
    }

    get FIELD_MASK_BREMEN(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_BREMEN)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_BREMEN(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_BREMEN : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_BREMEN)
    }

    get FIELD_MASK_BUNNY_HOOD(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_BUNNY_HOOD)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_BUNNY_HOOD(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_BUNNY_HOOD : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_BUNNY_HOOD)
    }

    get FIELD_MASK_DON_GERO(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_DON_GERO)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_DON_GERO(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_DON_GERO : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_DON_GERO)
    }

    get FIELD_MASK_OF_SCENTS(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_OF_SCENTS)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_OF_SCENTS(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_OF_SCENTS : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_OF_SCENTS)
    }

    get FIELD_MASK_GORON(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_GORON)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_GORON(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_GORON : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_GORON)
    }

    get FIELD_MASK_ROMANI(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_ROMANI)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_ROMANI(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_ROMANI : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_ROMANI)
    }

    get FIELD_MASK_CIRCUS_LEADER(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_CIRCUS_LEADER)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_CIRCUS_LEADER(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_CIRCUS_LEADER : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_CIRCUS_LEADER)
    }

    get FIELD_MASK_KAFEI(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_KAFEI)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_KAFEI(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_KAFEI : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_KAFEI)
    }

    get FIELD_MASK_COUPLES(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_COUPLES)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_COUPLES(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_COUPLES : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_COUPLES)
    }

    get FIELD_MASK_OF_TRUTH(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_OF_TRUTH)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_OF_TRUTH(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_OF_TRUTH : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_OF_TRUTH)
    }

    get FIELD_MASK_ZORA(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_ZORA)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_ZORA(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_ZORA : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_ZORA)
    }

    get FIELD_MASK_KAMERO(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_KAMERO)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_KAMERO(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_KAMERO : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_KAMERO)
    }


    get FIELD_MASK_GIBDO(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_GIBDO)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_GIBDO(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_GIBDO : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_GIBDO)
    }

    get FIELD_MASK_GARO(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_GARO)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_GARO(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_GARO : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_GARO)
    }


    get FIELD_MASK_CAPTAIN(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_CAPTAIN)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_CAPTAIN(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_CAPTAIN : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_CAPTAIN)
    }

    get FIELD_MASK_GIANT(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_GIANT)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_GIANT(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_GIANT : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_GIANT)
    }

    get FIELD_MASK_FIERCE_DEITY(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MASK_FIERCE_DEITY)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MASK_FIERCE_DEITY(bool: boolean) {
        let value = bool ? API.InventoryItem.MASK_FIERCE_DEITY : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MASK_FIERCE_DEITY)
    }


    isChildTradeFinished(): boolean {
        throw new Error("Method not implemented.");
    }
    isAdultTradeFinished(): boolean {
        throw new Error("Method not implemented.");
    }

    set bombBag(bb: API.AmmoUpgrade) {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x3
        );
        switch (bb) {
            case API.AmmoUpgrade.NONE:
                buf[0x3] = 0x00;
                buf[0x4] = 0x00;
                break;
            case API.AmmoUpgrade.BASE:
                buf[0x3] = 0x00;
                buf[0x4] = 0x01;
                break;
            case API.AmmoUpgrade.UPGRADED:
                buf[0x3] = 0x01;
                buf[0x4] = 0x00;
                break;
            case API.AmmoUpgrade.MAX:
                buf[0x3] = 0x01;
                buf[0x4] = 0x01;
                break;
        }
        this.emulator.rdramWriteBits8(this.inventory_upgrades_addr + 0x3, buf);
    }

    get bombBag(): API.AmmoUpgrade {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x3
        );
        let str = buf.slice(3, 5).toString('hex');
        switch (str) {
            case '0000':
                return API.AmmoUpgrade.NONE;
            case '0001':
                return API.AmmoUpgrade.BASE;
            case '0100':
                return API.AmmoUpgrade.UPGRADED;
            case '0101':
                return API.AmmoUpgrade.MAX;
        }
        return API.AmmoUpgrade.NONE;
    }

    set dekuSticksCapacity(bb: API.AmmoUpgrade) {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x1
        );
        switch (bb) {
            case API.AmmoUpgrade.NONE:
                buf[0x5] = 0x00;
                buf[0x6] = 0x00;
                break;
            case API.AmmoUpgrade.BASE:
                buf[0x5] = 0x00;
                buf[0x6] = 0x01;
                break;
            case API.AmmoUpgrade.UPGRADED:
                buf[0x5] = 0x01;
                buf[0x6] = 0x00;
                break;
            case API.AmmoUpgrade.MAX:
                buf[0x5] = 0x01;
                buf[0x6] = 0x01;
                break;
        }
        this.emulator.rdramWriteBits8(this.inventory_upgrades_addr + 0x1, buf);
    }

    get dekuSticksCapacity(): API.AmmoUpgrade {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x1
        );
        let str = buf.slice(5, 7).toString('hex');
        switch (str) {
            case '0000':
                return API.AmmoUpgrade.NONE;
            case '0001':
                return API.AmmoUpgrade.BASE;
            case '0100':
                return API.AmmoUpgrade.UPGRADED;
            case '0101':
                return API.AmmoUpgrade.MAX;
        }
        return API.AmmoUpgrade.NONE;
    }

    set dekuNutsCapacity(bb: API.AmmoUpgrade) {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x1
        );
        switch (bb) {
            case API.AmmoUpgrade.NONE:
                buf[0x2] = 0x00;
                buf[0x3] = 0x00;
                break;
            case API.AmmoUpgrade.BASE:
                buf[0x2] = 0x00;
                buf[0x3] = 0x01;
                break;
            case API.AmmoUpgrade.UPGRADED:
                buf[0x2] = 0x01;
                buf[0x3] = 0x00;
                break;
            case API.AmmoUpgrade.MAX:
                buf[0x2] = 0x01;
                buf[0x3] = 0x01;
                break;
        }
        this.emulator.rdramWriteBits8(this.inventory_upgrades_addr + 0x1, buf);
    }

    get dekuNutsCapacity(): API.AmmoUpgrade {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x1
        );
        let str = buf.slice(2, 4).toString('hex');
        switch (str) {
            case '0000':
                return API.AmmoUpgrade.NONE;
            case '0001':
                return API.AmmoUpgrade.BASE;
            case '0100':
                return API.AmmoUpgrade.UPGRADED;
            case '0101':
                return API.AmmoUpgrade.MAX;
        }
        return API.AmmoUpgrade.NONE;
    }

    get bulletBag(): API.AmmoUpgrade {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x2
        );
        let str = buf.slice(0, 2).toString('hex');
        switch (str) {
            case '0000':
                return API.AmmoUpgrade.NONE;
            case '0001':
                return API.AmmoUpgrade.BASE;
            case '0100':
                return API.AmmoUpgrade.UPGRADED;
            case '0101':
                return API.AmmoUpgrade.MAX;
        }
        return API.AmmoUpgrade.NONE;
    }

    set bulletBag(bb: API.AmmoUpgrade) {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x2
        );
        switch (bb) {
            case API.AmmoUpgrade.NONE:
                buf[0x0] = 0x00;
                buf[0x1] = 0x00;
                break;
            case API.AmmoUpgrade.BASE:
                buf[0x0] = 0x00;
                buf[0x1] = 0x01;
                break;
            case API.AmmoUpgrade.UPGRADED:
                buf[0x0] = 0x01;
                buf[0x1] = 0x00;
                break;
            case API.AmmoUpgrade.MAX:
                buf[0x0] = 0x01;
                buf[0x1] = 0x01;
                break;
        }
        this.emulator.rdramWriteBits8(this.inventory_upgrades_addr + 0x2, buf);
    }

    get quiver(): API.AmmoUpgrade {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x3
        );
        let str = buf.slice(6, 8).toString('hex');
        switch (str) {
            case '0000':
                return API.AmmoUpgrade.NONE;
            case '0001':
                return API.AmmoUpgrade.BASE;
            case '0100':
                return API.AmmoUpgrade.UPGRADED;
            case '0101':
                return API.AmmoUpgrade.MAX;
        }
        return API.AmmoUpgrade.NONE;
    }

    set quiver(q: API.AmmoUpgrade) {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x3
        );
        switch (q) {
            case API.AmmoUpgrade.NONE:
                buf[0x6] = 0x00;
                buf[0x7] = 0x00;
                break;
            case API.AmmoUpgrade.BASE:
                buf[0x6] = 0x00;
                buf[0x7] = 0x01;
                break;
            case API.AmmoUpgrade.UPGRADED:
                buf[0x6] = 0x01;
                buf[0x7] = 0x00;
                break;
            case API.AmmoUpgrade.MAX:
                buf[0x6] = 0x01;
                buf[0x7] = 0x01;
                break;
        }
        this.emulator.rdramWriteBits8(this.inventory_upgrades_addr + 0x3, buf);
    }

    get wallet(): API.Wallet {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x2
        );
        let str = buf.slice(2, 4).toString('hex');
        switch (str) {
            case '0000':
                return API.Wallet.CHILD;
            case '0001':
                return API.Wallet.ADULT;
            case '0100':
                return API.Wallet.GIANT;
        }
        return API.Wallet.CHILD;
    }

    set wallet(w: API.Wallet) {
        let buf: Buffer = this.emulator.rdramReadBits8(
            this.inventory_upgrades_addr + 0x2
        );
        switch (w) {
            case API.Wallet.CHILD:
                buf[0x2] = 0x00;
                buf[0x3] = 0x00;
                break;
            case API.Wallet.ADULT:
                buf[0x2] = 0x00;
                buf[0x3] = 0x01;
                break;
            case API.Wallet.GIANT:
                buf[0x2] = 0x10;
                buf[0x3] = 0x00;
                break;
        }
        this.emulator.rdramWriteBits8(this.inventory_upgrades_addr + 0x2, buf);
    }

    getMaxRupeeCount(): number {
        let addr: number = 0x800F8CEC;
        let capacities: Array<number> = [];
        for (let i = 0; i < 8; i += 2) {
            capacities.push(this.emulator.rdramRead16(addr + i));
        }
        return capacities[this.wallet];
    }

    get dekuSticksCount(): number {
        return this.getAmmoForSlot(API.InventorySlots.DEKU_STICKS);
    }
    set dekuSticksCount(count: number) {
        this.setAmmoInSlot(API.InventorySlots.DEKU_STICKS, count);
    }

    get bombsCount(): number {
        return this.getAmmoForSlot(API.InventorySlots.BOMBS);
    }
    set bombsCount(count: number) {
        this.setAmmoInSlot(API.InventorySlots.BOMBS, count);
    }

    get bombchuCount(): number {
        return this.getAmmoForSlot(API.InventorySlots.BOMBCHUS);
    }
    set bombchuCount(count: number) {
        this.setAmmoInSlot(API.InventorySlots.BOMBCHUS, count);
    }

    get powderKegCount(): number {
        return this.getAmmoForSlot(API.InventorySlots.POWDER_KEG);
    }
    set powderKegCount(count: number) {
        this.setAmmoInSlot(API.InventorySlots.POWDER_KEG, count);
    }

    get magicBeansCount(): number {
        return this.getAmmoForSlot(API.InventorySlots.MAGIC_BEANS);
    }
    set magicBeansCount(count: number) {
        this.setAmmoInSlot(API.InventorySlots.MAGIC_BEANS, count);
    }

    get arrows(): number {
        return this.getAmmoForSlot(API.InventorySlots.HEROES_BOW);
    }
    set arrows(count: number) {
        this.setAmmoInSlot(API.InventorySlots.HEROES_BOW, count);
    }

    get dekuNutsCount(): number {
        return this.getAmmoForSlot(API.InventorySlots.DEKU_NUTS);
    }
    set dekuNutsCount(count: number) {
        this.setAmmoInSlot(API.InventorySlots.DEKU_NUTS, count);
    }

    get photoCount(): number {
        return this.getAmmoForSlot(API.InventorySlots.PICTOGRAPH_BOX);
    }
    set photoCount(count: number) {
        this.setAmmoInSlot(API.InventorySlots.PICTOGRAPH_BOX, count);
    }

    get FIELD_BOTTLE1(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE1);
    }
    set FIELD_BOTTLE1(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_CHATEAU_ROMANI
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE1);
    }
    get FIELD_BOTTLE2(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE2);
    }
    set FIELD_BOTTLE2(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_CHATEAU_ROMANI
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE2);
    }
    get FIELD_BOTTLE3(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE3);
    }
    set FIELD_BOTTLE3(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_CHATEAU_ROMANI
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE3);
    }
    get FIELD_BOTTLE4(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE4);
    }
    set FIELD_BOTTLE4(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_CHATEAU_ROMANI
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE4);
    }

    get FIELD_BOTTLE5(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE5);
    }
    set FIELD_BOTTLE5(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_CHATEAU_ROMANI
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE5);
    }

    get FIELD_BOTTLE6(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE6);
    }
    set FIELD_BOTTLE6(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_CHATEAU_ROMANI
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE6);
    }

    hasBottle(): boolean {
        for (let i = API.InventorySlots.BOTTLE1; i <= API.InventorySlots.BOTTLE6; i++) {
            let item: API.InventoryItem = this.getItemInSlot(i);
            if (
                item >= API.InventoryItem.BOTTLE_EMPTY &&
                item <= API.InventoryItem.BOTTLE_CHATEAU_ROMANI //TODO: Check if Big or Small Poe in-game
            ) {
                return true;
            }
        }
        return false;
    }
    getBottleCount(): number {
        let bottles = 0;
        for (let i = API.InventorySlots.BOTTLE1; i <= API.InventorySlots.BOTTLE6; i++) {
            let item: API.InventoryItem = this.getItemInSlot(i);
            if (
                item >= API.InventoryItem.BOTTLE_EMPTY &&
                item <= API.InventoryItem.BOTTLE_CHATEAU_ROMANI
            ) {
                bottles++;
            }
        }
        return bottles;
    }
    getBottledItems(): API.InventoryItem[] {
        let bottles: API.InventoryItem[] = new Array();
        for (let i = API.InventorySlots.BOTTLE1; i <= API.InventorySlots.BOTTLE6; i++) {
            let item: API.InventoryItem = this.getItemInSlot(i);
            if (
                item >= API.InventoryItem.BOTTLE_EMPTY &&
                item <= API.InventoryItem.BOTTLE_CHATEAU_ROMANI
            ) {
                bottles.push(item);
            }
        }
        return bottles;
    }

    get FIELD_QUEST_ITEM_1(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.QUEST_ITEM_1);
    }
    set FIELD_QUEST_ITEM_1(item: API.InventoryItem) {
        if (item < API.InventoryItem.QSLOT1_MOONS_TEAR || item > API.InventoryItem.QSLOT1_TITLE_DEED_OCEAN) return;
        this.setItemInSlot(item, API.InventorySlots.QUEST_ITEM_1);
    }

    get FIELD_QUEST_ITEM_2(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.QUEST_ITEM_2);
    }
    set FIELD_QUEST_ITEM_2(item: API.InventoryItem) {
        if (item < API.InventoryItem.QSLOT2_ROOM_KEY || item > API.InventoryItem.QSLOT2_SPECIAL_DELIVERY_TO_MAMA) {
            return;
        }
        this.setItemInSlot(item, API.InventorySlots.QUEST_ITEM_2);
    }

    get FIELD_QUEST_ITEM_3(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.QUEST_ITEM_3);
    }
    set FIELD_QUEST_ITEM_3(item: API.InventoryItem) {
        if (item < API.InventoryItem.QSLOT3_LETTER_TO_KAFEI || item > API.InventoryItem.QSLOT3_PENDANT_OF_MEMORIES) {
            return;
        }
        this.setItemInSlot(item, API.InventorySlots.QUEST_ITEM_3);
    }

    isEvt1TradeFinished(): boolean {
        // This is going to require more complex flag checks
        return true;
    }
    isEvt2TradeFinished(): boolean {
        // This should be done with flags also
        return true;
    }
    isEvt3TradeFinished(): boolean {
        // This should be done with flags also
        return true;
    }

    getItemInSlot(slotId: number): API.InventoryItem {
        if (slotId < 0 || slotId > API.InventorySlots.MASK_FIERCE_DEITY) {
            return API.InventoryItem.NONE;
        }

        let itemId: number = this.emulator.rdramRead8(this.inventory_addr + slotId);
        return itemId as API.InventoryItem;
    }
    getSlotForItem(item: API.InventoryItem): number {
        for (let i = 0; i <= API.InventorySlots.MASK_FIERCE_DEITY; i++) {
            if (this.getItemInSlot(i) == item) {
                return i;
            }
        }
        return -1;
    }
    getSlotsForItem(item: API.InventoryItem): number[] {
        let slots: number[] = new Array();
        for (let i = 0; i <= API.InventorySlots.MASK_FIERCE_DEITY; i++) {
            if (this.getItemInSlot(i) == item) {
                slots.push(i);
            }
        }
        return slots;
    }

    hasItem(item: API.InventoryItem): boolean {
        return this.getSlotForItem(item) != -1;
    }

    getAmmoForItem(item: API.InventoryItem): number {
        if (!this.hasAmmo(item)) return 0;

        let ammo = 0;
        let slots: number[] = this.getSlotsForItem(item);
        for (let i = 0; i < slots.length; i++) {
            ammo += this.getAmmoForSlot(slots[i]);
        }
        return ammo;
    }
    hasAmmo(item: API.InventoryItem): boolean {
        switch (item) {
            case API.InventoryItem.DEKU_STICK:
            case API.InventoryItem.DEKU_NUT:
            case API.InventoryItem.HEROES_BOW:
            case API.InventoryItem.BOMB:
            case API.InventoryItem.BOMBCHU:
            case API.InventoryItem.MAGIC_BEANS:
                return true;
        }
        return false;
    }
    getAmmoForSlot(slotId: number): number {
        if (slotId < 0 || slotId > 0xf) return 0;
        return this.emulator.rdramRead8(this.inventory_ammo_addr + slotId);
    }
    setAmmoInSlot(slot: number, amount: number): void {
        if (slot < 0 || slot >= 0xf) return;
        this.emulator.rdramWrite8(this.inventory_ammo_addr + slot, amount);
    }

    setItemInSlot(item: API.InventoryItem, slot: number): void {
        if (slot < 0 || slot > API.InventorySlots.MASK_FIERCE_DEITY) {
            return;
        }
        this.emulator.rdramWrite8(this.inventory_addr + slot, item.valueOf());
    }

    giveItem(item: API.InventoryItem, desiredSlot: API.InventorySlots) {
        if (
            this.getItemInSlot(desiredSlot) == API.InventoryItem.NONE ||
            this.getItemInSlot(desiredSlot) == item
        ) {
            this.setItemInSlot(item, desiredSlot);
        }
    }
    removeItem(item: API.InventoryItem): void {
        let slots = this.getSlotsForItem(item);
        for (let i = 0; i < slots.length; i++) {
            this.setItemInSlot(API.InventoryItem.NONE, i);
        }
    }
    getEmptySlots(): number[] {
        let slots: number[] = new Array();
        for (let i = 0; i <= API.InventorySlots.MASK_FIERCE_DEITY; i++) {
            if (this.getItemInSlot(i) == API.InventoryItem.NONE) {
                slots.push(i);
            }
        }
        return slots;
    }
}