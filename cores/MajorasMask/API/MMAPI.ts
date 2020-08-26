import { IActor } from './IActor';
import { IDungeonItemManager } from './IDungeonItemManager';
import { ICore } from 'modloader64_api/IModLoaderAPI';
import { Command, ICommandBuffer } from 'modloader64_api/OOT/ICommandBuffer';
import Vector3 from 'modloader64_api/math/Vector3';
import { IPacketHeader } from 'modloader64_api/NetworkHandler';

export const enum LinkState {
  UNKNOWN,
  STANDING,
  SWIMMING,
  OCARINA,
  BUSY,
  LOADING_ZONE,
  ENTERING_GROTTO,
  FIRST_PERSON,
  JUMPING,
  CLIMBING_OUT_OF_WATER,
  HANGING_FROM_LEDGE,
  CHARGING_SPIN_ATTACK,
  HOLDING_ACTOR,
  GETTING_ITEM,
  SHOOTING_BOW_OR_HOOKSHOT,
  RIDING_EPONA,
  DYING,
  TAKING_DAMAGE,
  FALLING,
  VOIDING_OUT,
  TALKING,
  HOVERING,
  Z_TARGETING
}

export const enum LinkState2 {
  UNKNOWN,
  IDLE,
  CRAWLSPACE,
  MOVING_FORWARD
}

export const enum MMForms{
  HUMAN,
  DEKU,
  ZORA,
  GORON,
  FD
}

export const enum Scene {
  NONE                                = 0xFF,
  SOUTHERN_SWAMP                      = 0x00,
  UNKNOWN_0X01                        = 0x01,
  UNKNOWN_0X02                        = 0x02,
  UNKNOWN_0X03                        = 0x03,
  UNKNOWN_0X04                        = 0x04,
  UNKNOWN_0X05                        = 0x05,
  UNKNOWN_0X06                        = 0x06,
  GROTTOS                             = 0x07,
  LENS_OF_TRUTH_CAVERN                = 0x07,
  TITLE_SCREEN                        = 0x08,
  VARIOUS_CUTSCENES                   = 0x08,
  UNKNOWN_0X09                        = 0x09,
  MAGIC_HAGS_POTION_SHOP              = 0x0A,
  MAJORAS_MASK_BOSS_ROOM              = 0x0B,
  BENEATH_THE_GRAVEYARD               = 0x0C,
  CURIOSITY_SHOP                      = 0x0D,
  UNKNOWN_0X0E                        = 0x0E,
  UNKNOWN_0X0F                        = 0x0F,
  MAMAS_HOUSE                         = 0x10,
  HONEY_AND_DARLINGS_SHOP             = 0x11,
  MAYORS_RESIDENCE                    = 0x12,
  IKANA_CANYON                        = 0x13,
  PIRATES_FORTRESS                    = 0x14,
  MILK_BAR                            = 0x15,
  STONE_TOWER_TEMPLE_NORMAL           = 0x16,
  TREASURE_CHEST_SHOP                 = 0x17,
  STONE_TOWER_TEMPLE_INVERTED         = 0x18,
  ON_TOP_OF_CLOCK_TOWER               = 0x19,
  CAVE_BEFORE_CLOCK_TOWER             = 0x1A,
  WOODFALL_TEMPLE                     = 0x1B,
  PATH_TO_MOUNTAIN_VILLAGE            = 0x1C,
  ANCIENT_CASTLE_OF_IKANA             = 0x1D,
  CLOCK_TOWN_GROTTO_MINIGAME          = 0x1E,
  WOODFALL_TEMPLE_BOSS_ROOM           = 0x1F,
  CLOCK_TOWN_SHOOTING_GALLERY         = 0x20,
  SNOWHEAD_TEMPLE                     = 0x21,
  MILK_ROAD                           = 0x22,
  PIRATES_FORTRESS_INDOOR             = 0x23,
  SWAMP_SHOOTING_GALLERY              = 0x24,
  PINNACLE_ROCK                       = 0x25,
  GREAT_FAIRY_FOUNTAIN                = 0x26,
  SPIDER_SWAMP_HOUSE                  = 0x27,
  OCEAN_SIDE_SPIDER_HOUSE             = 0x28,
  ASTRAL_OBSERVATORY                  = 0x29,
  ODOLWAS_TRIAL_MOON                  = 0x2A,
  OUTSIDE_DEKU_PALACE                 = 0x2B,
  MOUNTAIN_SMITHY                     = 0x2C,
  TERMINA_FIELDS                      = 0x2D,
  POST_OFFICE                         = 0x2E,
  MARINE_RESEARCH_LAB                 = 0x2F,
  DAMPES_HOUSE                        = 0x30,
  UNKNOWN_0X31                        = 0x31,
  GORON_SHRINE                        = 0x32,
  ZORAS_DOMAIN                        = 0x33,
  TRADING_POST                        = 0x34,
  ROMANI_RANCH                        = 0x35,
  STONE_TOWER_TEMPLE_BOSS_ROOM        = 0x36,
  GREAT_BAY_COAST_WEST                = 0x37,
  GREAT_BAY_COAST_EAST                = 0x38,
  LOTTERY_SHOP                        = 0x39,
  UNKNOWN_0X3A                        = 0x3A,
  PIRATES_FORTRESS_ENTRANCE           = 0x3B,
  FISHERMANS_HUT                      = 0x3C,
  GORON_SHOP                          = 0x3D,
  INSIDE_THE_DEKU_PALACE              = 0x3E,
  GOHTS_TRIAL_MOON                    = 0x3F,
  PATH_TO_SOUTHERN_SWAMPS             = 0x40,
  ROMANI_RANCH_DOG_TRACK              = 0x41,
  ROMANI_RANCH_CUCCO_AREA             = 0x42,
  IKANI_CANYONS_GRAVEYARD             = 0x43,
  SNOWHEAD_TEMPLE_BOSS_ROOM           = 0x44,
  SOUTHERN_SWAMPS                     = 0x45,
  WOODFALL                            = 0x46,
  GYORGS_TRIAL_MOON                   = 0x47,
  GORON_VILLAGE_SPRING                = 0x48,
  GREAT_BAY_TEMPLE                    = 0x49,
  BEAVER_RACE_MINIGAME                = 0x4A,
  BENEATH_THE_WELL                    = 0x48,
  ZORAS_DOMAIN_ROOMS                  = 0x4C,
  GORON_VILLAGE_WINTER                = 0x4D,
  DARMANIS_GRAVE                      = 0x4E,
  SAKONS_HIDEOUT                      = 0x4F,
  MOUNTAIN_VILLAGE_WINTER             = 0x50,
  INSIDE_A_POT                        = 0x51, //Ghost sounds (Beta)
  DEKU_SHRINE                         = 0x52,
  PATH_TO_IKANA_CANYON                = 0x53,
  SWORDSMANS_SCHOOL                   = 0x54,
  MUSIC_BOX_HOUSE                     = 0x55,
  ANCIENT_CASTLE_OF_IKANA_THRONE_ROOM = 0x56,
  SOUTHERN_SWAMMP_HOUSE               = 0x57,
  STONE_TOWER_NORMAL                  = 0x58,
  STONE_TOWER_INVERTED_CUTSCENE       = 0x59,
  MOUNTAIN_VILLAGE_SPRING             = 0x5A,
  PATH_TO_GORON_VILLAGE_WINTER        = 0x5B,
  SNOWHEAD                            = 0x5C,
  UNKNOWN_0X5D                        = 0x5D,
  PATH_TO_GORON_VILLAGE_SPRING        = 0x5E,
  GREAT_BAY_TEMPLE_BOSS_ROOM          = 0x5F,
  SECRET_SHRINE                       = 0x60,
  STOCK_POT_IN                        = 0x61,
  GREAT_BAY_PIRATE_CUTSCENE           = 0x62,
  CLOCK_TOWER_SEWER                   = 0x63,
  WOODS_OF_MYSTERY                    = 0x64,
  STARTING_AREA                       = 0x65,
  TWINMOLDS_TRIAL_MOON                = 0x66,
  MOON                                = 0x67,
  BOMB_SHOP                           = 0x68,
  GIANTS_ROOM_CUTSCENE                = 0x69,
  GORMANS_TRACK                       = 0x6A,
  GORON_RACETRACK                     = 0x6B,
  CLOCK_TOWN_EAST                     = 0x6C,
  CLOCK_TOWN_WEST                     = 0x6D,
  CLOCK_TOWN_NORTH                    = 0x6E,
  CLOCK_TOWN_SOUTH                    = 0x6F,
  LAUNDRY_POOL                        = 0x70
}

export interface ISceneInfo {}

export const enum Sword {
  NONE,
  KOKIRI,
  RAZOR,
  GILDED
}

export const enum Shield {
  NONE,
  HERO,
  MIRROR
}

export const enum Mask {
  NONE,
  KEATON,
  SKULL,
  SPOOKY,
  BUNNY
}

export const enum Magic {
  NONE,
  NORMAL,
  EXTENDED
}

export const enum MagicQuantities {
  NONE = 0,
  NORMAL = 0x30,
  EXTENDED = 0x60
}

export const enum AmmoUpgrade {
  NONE,
  BASE,
  UPGRADED,
  MAX
}

export interface IInventoryCounts {
  dekuSticksCount: number;
  dekuNutsCount: number;
  bombsCount: number;
  bombchuCount: number;
  magicBeansCount: number;
  arrows: number;
}

export enum InventoryItem {
  OCARINA_OF_TIME = 0,
  HEROES_BOW = 1,
  FIRE_ARROW = 2,
  ICE_ARROW = 3,
  LIGHT_ARROW = 4,

  OCARINA_FAIRY = 5, // Japanese

  BOMB = 6,
  BOMBCHU = 7,
  DEKU_STICK = 8,
  DEKU_NUT = 9,
  MAGIC_BEANS = 10,

  FAIRY_SLINGSHOT = 11, // Japanese

  POWDER_KEG = 12,
  PICTOGRAPH_BOX = 13,
  LENS_OF_TRUTH = 14,
  HOOKSHOT = 15,
  GREAT_FAIRYS_SWORD = 16,

  HOOKSHOT_JP = 17, // Japanese

  BOTTLE_EMPTY = 18,
  BOTTLE_POTION_RED = 19,
  BOTTLE_POTION_GREEN = 20,
  BOTTLE_POTION_BLUE = 21,
  BOTTLE_FAIRY = 22,
  BOTTLE_DEKU_PRINCESS = 23,
  BOTTLE_MILK_FULL = 24,
  BOTTLE_MILK_HALF = 25,
  BOTTLE_FISH = 26,
  BOTTLE_BUGS = 27,
  BOTTLE_BLUE_FIRE = 28,
  BOTTLE_POE_SMALL = 29,
  BOTTLE_POE_BIG = 30,
  BOTTLE_SPRING_WATER_COLD = 31,
  BOTTLE_SPRING_WATER_HOT = 32,
  BOTTLE_ZORA_EGG = 33,
  BOTTLE_GOLD_DUST = 34,
  BOTTLE_MAGICAL_MUSHROOM = 35,
  BOTTLE_SEA_HORSE = 36,
  BOTTLE_CHATEAU_ROMANI = 37,

  BOTTLE_EEL = 38, // Japanese
  BOTTLE_GRANNYS_DRINK = 39, // Japanese

  QSLOT1_MOONS_TEAR = 40,
  QSLOT1_TITLE_DEED_LAND = 41,
  QSLOT1_TITLE_DEED_SWAMP = 42,
  QSLOT1_TITLE_DEED_MOUNTAIN = 43,
  QSLOT1_TITLE_DEED_OCEAN = 44,
  QSLOT2_ROOM_KEY = 45,
  QSLOT2_SPECIAL_DELIVERY_TO_MAMA = 46,
  QSLOT3_LETTER_TO_KAFEI = 47,
  QSLOT3_PENDANT_OF_MEMORIES = 48,
  LUNAR_ROCK = 49, // Japanese Map

  MASK_POSTMAN = 50,
  MASK_ALL_NIGHT = 51,
  MASK_BLAST = 52,
  MASK_STONE = 53,
  MASK_GREAT_FAIRY = 54,
  MASK_DEKU = 55,
  MASK_KEATON = 56,
  MASK_BREMEN = 57,
  MASK_BUNNY_HOOD = 58,
  MASK_DON_GERO = 59,
  MASK_OF_SCENTS = 60,
  MASK_GORON = 60,
  MASK_ROMANI = 61,
  MASK_CIRCUS_LEADER = 62,
  MASK_KAFEI = 63,
  MASK_COUPLES = 64,
  MASK_OF_TRUTH = 65,
  MASK_ZORA = 66,
  MASK_KAMERO = 67,
  MASK_GIBDO = 68,
  MASK_GARO = 69,
  MASK_CAPTAIN = 70,
  MASK_GIANT = 71,
  MASK_FIERCE_DEITY  = 72,
  NONE = 0xFF,

  SLOT_OCARINA_OF_TIME = 0,
  SLOT_HEROES_BOW = 1,
  SLOT_FIRE_ARROWS = 2,
  SLOT_ICE_ARROWS = 3,
  SLOT_LIGHT_ARROWS = 4,
  SLOT_QUEST_ITEM_1 = 5,
  SLOT_BOMBS = 6,
  SLOT_BOMBCHUS = 7,
  SLOT_DEKU_STICKS = 8,
  SLOT_DEKU_NUTS = 9,
  SLOT_MAGIC_BEANS = 10,
  SLOT_QUEST_ITEM_2 = 11,
  SLOT_POWDER_KEG = 12,
  SLOT_PICTOGRAPH_BOX = 13,
  SLOT_LENS_OF_TRUTH = 14,
  SLOT_HOOKSHOT = 15,
  SLOT_GREAT_FAIRYS_SWORD = 16,
  QUEST_ITEM_3 = 17,
  SLOT_BOTTLE1 = 18,
  SLOT_BOTTLE2 = 19,
  SLOT_BOTTLE3 = 20,
  SLOT_BOTTLE4 = 21,
  SLOT_BOTTLE5 = 22,
  SLOT_BOTTLE6 = 23,
  
  SLOT_MASK_POSTMAN = 24,
  SLOT_MASK_ALL_NIGHT = 25,
  SLOT_MASK_BLAST = 26,
  SLOT_MASK_STONE = 27,
  SLOT_MASK_GREAT_FAIRY = 28,
  SLOT_MASK_DEKU = 29,
  SLOT_MASK_KEATON = 30,
  SLOT_MASK_BREMEN = 31,
  SLOT_MASK_BUNNY_HOOD = 32,
  SLOT_MASK_DON_GERO = 33,
  SLOT_MASK_OF_SCENTS = 34,
  SLOT_MASK_GORON = 35,
  SLOT_MASK_ROMANI = 36,
  SLOT_MASK_CIRCUS_LEADER = 37,
  SLOT_MASK_KAFEI = 38,
  SLOT_MASK_COUPLES = 39,
  SLOT_MASK_OF_TRUTH = 40,
  SLOT_MASK_ZORA = 41,
  SLOT_MASK_KAMERO = 42,
  SLOT_MASK_GIBDO = 43,
  SLOT_MASK_GARO = 44,
  SLOT_MASK_CAPTAIN = 45,
  SLOT_MASK_GIANT = 46,
  SLOT_MASK_FIERCE_DEITY = 47,
}

export const enum Ocarina {
  NONE,
  OCARINA_OF_TIME
}

export const enum Wallet {
  CHILD,
  ADULT,
  GIANT
}

export interface ISwords {
  kokiriSword: boolean;
  razorSword: boolean;
  gilded: boolean;
}

export interface IShields {
  heroesShield: boolean;
  mirrorShield: boolean;
}

export interface IInventoryCounts {
  dekuSticksCount: number;
  dekuNutsCount: number;
  bombsCount: number;
  bombchuCount: number;
  magicBeansCount: number;
  arrows: number;
}

export interface IInventoryFields {
  dekuSticksCapacity: AmmoUpgrade;
  dekuNutsCapacity: AmmoUpgrade;
  bombBag: AmmoUpgrade;
  quiver: AmmoUpgrade;

  FIELD_OCARINA: Ocarina;
  FIELD_HEROES_BOW: boolean;
  FIELD_FIRE_ARROW: boolean;
  FIELD_ICE_ARROW: boolean;
  FIELD_LIGHT_ARROW: boolean;
  FIELD_QUEST_ITEM_1: InventoryItem;
  FIELD_BOMB: boolean;
  FIELD_BOMBCHU: boolean;
  FIELD_DEKU_STICKS: boolean;
  FIELD_DEKU_NUT: boolean;
  FIELD_MAGIC_BEAN: boolean;
  FIELD_QUEST_ITEM_2: InventoryItem;
  FIELD_POWDER_KEG: boolean;
  FIELD_PICTOGRAPH_BOX: boolean;
  FIELD_LENS_OF_TRUTH: boolean;
  FIELD_HOOKSHOT: boolean;
  FIELD_GREAT_FAIRYS_SWORD: boolean;
  FIELD_QUEST_ITEM_3: InventoryItem;
  FIELD_BOTTLE1: InventoryItem;
  FIELD_BOTTLE2: InventoryItem;
  FIELD_BOTTLE3: InventoryItem;
  FIELD_BOTTLE4: InventoryItem;
  FIELD_BOTTLE5: InventoryItem;
  FIELD_BOTTLE6: InventoryItem;

  
  FIELD_MASK_POSTMAN: boolean;
  FIELD_MASK_ALL_NIGHT: boolean;
  FIELD_MASK_BLAST: boolean;
  FIELD_MASK_STONE: boolean;
  FIELD_MASK_GREAT_FAIRY: boolean;
  FIELD_MASK_DEKU: boolean;
  FIELD_MASK_KEATON: boolean;
  FIELD_MASK_BREMEN: boolean;
  FIELD_MASK_BUNNY_HOOD: boolean;
  FIELD_MASK_DON_GERO: boolean;
  FIELD_MASK_OF_SCENTS: boolean;
  FIELD_MASK_GORON: boolean;
  FIELD_MASK_ROMANI: boolean;
  FIELD_MASK_CIRCUS_LEADER: boolean;
  FIELD_MASK_KAFEI: boolean;
  FIELD_MASK_COUPLES: boolean;
  FIELD_MASK_OF_TRUTH: boolean;
  FIELD_MASK_ZORA: boolean;
  FIELD_MASK_KAMERO: boolean;
  FIELD_MASK_GIBDO: boolean;
  FIELD_MASK_GARO: boolean;
  FIELD_MASK_CAPTAIN: boolean;
  FIELD_MASK_GIANT: boolean;
  FIELD_MASK_FIERCE_DEITY: boolean;
}

export interface IInventory extends IInventoryFields, IInventoryCounts {
  wallet: Wallet;
  hasBottle(): boolean;
  getBottleCount(): number;
  getBottledItems(): InventoryItem[];
  isChildTradeFinished(): boolean;
  isAdultTradeFinished(): boolean;
  getItemInSlot(slotId: number): InventoryItem;
  getSlotForItem(item: InventoryItem): number;
  getSlotsForItem(item: InventoryItem): number[];
  hasItem(item: InventoryItem): boolean;
  hasAmmo(item: InventoryItem): boolean;
  getAmmoForItem(item: InventoryItem): number;
  getAmmoForSlot(slotId: number): number;
  setAmmoInSlot(slot: number, amount: number): void;
  setItemInSlot(item: InventoryItem, slot: number): void;
  giveItem(item: InventoryItem, desiredSlot: number): void;
  removeItem(item: InventoryItem): void;
  getEmptySlots(): number[];
  getMaxRupeeCount(): number;
}

export interface IQuestStatus {
  odolwaRemains: boolean;
  gohtRemains: boolean;
  gyorgRemains: boolean;
  twinmoldRemains: boolean;

  songOfTime: boolean;
  songOfHealing: boolean;
  eponaSong: boolean;
  songOfSoaring: boolean;
  songOfStorms: boolean;

  sonataOfAwakening: boolean;
  goronLullaby: boolean;
  newWaveBossaNova: boolean;
  elegyOfEmptiness: boolean;
  oathToOrder: boolean;

  bombersNotebook: boolean;

  heartPieces: number;
}

export interface ISaveContext {
  scene_flags: Buffer;
  event_flags: Buffer;
  swords: ISwords;
  shields: IShields;
  inventory: IInventory;
  questStatus: IQuestStatus;
  checksum: number;
  form: MMForms;
  keyManager: IKeyManager;
  dungeonItemManager: IDungeonItemManager;
  heart_containers: number;
  magic_meter_size: Magic;
  magic_current: number;
  magic: number;
  deku_b_state: number;
  double_defense: number;
}

export interface ILink extends IActor {
  state: LinkState;
  //state2: LinkState2;
  rawStateValue: number;
  shield: Shield;
  mask: Mask;
  anim_data: Buffer;
  current_sound_id: number;
  sword: Sword;
  rawPos: Buffer;
  get_anim_id(): number;
  get_anim_frame(): number;
}

export interface IGlobalContext {
  current_scene: number;
  room: number;
  scene_framecount: number;
  continue_state: boolean;
  liveSceneData_chests: Buffer;
  liveSceneData_clear: Buffer;
  liveSceneData_switch: Buffer;
  liveSceneData_temp: Buffer;
  liveSceneData_collectable: Buffer;
  getSaveDataForCurrentScene(): Buffer;
  writeSaveDataForCurrentScene(buf: Buffer): void;
  viewStruct: IViewStruct;
}

export interface IViewStruct {
  readonly VIEW: string;
  gfx_ctx_pointer: number;
  fov: number;
  near_clip: number;
  far_clip: number;
  position: Vector3;
  focus: Vector3;
  axis: Vector3;
}

export interface IMMHelper {
  isTitleScreen(): boolean;
  isSceneNumberValid(): boolean;
  isLinkEnteringLoadingZone(): boolean;
  isPaused(): boolean;
  isInterfaceShown(): boolean;
}

export interface IMMCore extends ICore {
  link: ILink;
  save: ISaveContext;
  helper: IMMHelper;
  global: IGlobalContext;
  commandBuffer: ICommandBuffer;
  actorManager: IActorManager;
}

// Note: ON_ACTOR_SPAWN/ON_ACTOR_DESPAWN won't detect anything created by ICommandBuffer. This is intentional behavior.

export enum MMEvents {
  ON_SAVE_LOADED      = 'onSaveLoaded',
  ON_SCENE_CHANGE     = 'onSceneChange',
  ON_LOADING_ZONE     = 'onLoadingZone',
  ON_ACTOR_SPAWN      = 'onActorSpawn',
  ON_ACTOR_DESPAWN    = 'onActorDespawn',
  ON_ROOM_CHANGE      = 'onRoomChange',
  ON_ROOM_CHANGE_PRE  = 'onPreRoomChange',
  ON_AGE_CHANGE       = 'onAgeChange'
}

export interface IActorManager {
  // Returns IActor if the actor exists or undefined if the pointer doesn't lead to an actor.
  createIActorFromPointer(pointer: number): IActor;
}

export const NO_KEYS = 0xFF;

export const enum VANILLA_KEY_INDEXES { //TODO: Figure this shit out
  WOODFALL_TEMPLE         = 3,
  SNOWHEAD_TEMPLE         = 4,
  GREAT_BAY_TEMPLE        = 5,
  STONE_TOWER_TEMPLE      = 6,
  SHADOW_TEMPLE           = 7,
  BOTTOM_OF_THE_WELL      = 8,
  GERUDO_TRAINING_GROUND  = 11,
  GERUDO_FORTRESS         = 12,
  GANONS_CASTLE           = 13,
  TREASURE_CHEST_SHOP     = 16
}

export const enum VANILLA_DUNGEON_ITEM_INDEXES { //TODO: Figure this shit out
  WOODFALL_TEMPLE,
  SNOWHEAD_TEMPLE,
  GREAT_BAY_TEMPLE,
  STONE_TOWER_TEMPLE
}

export interface IKeyManager {
  getKeyCountForIndex(index: number): number;
  setKeyCountByIndex(index: number, count: number): void;
  getRawKeyBuffer(): Buffer;
}

export const enum InventorySlots {
  OCARINA_OF_TIME,
  HEROES_BOW,
  FIRE_ARROWS,
  ICE_ARROWS,
  LIGHT_ARROWS,
  QUEST_ITEM_1,
  BOMBS,
  BOMBCHUS,
  DEKU_STICKS,
  DEKU_NUTS,
  MAGIC_BEANS,
  QUEST_ITEM_2,
  POWDER_KEG,
  PICTOGRAPH_BOX,
  LENS_OF_TRUTH,
  HOOKSHOT,
  GREAT_FAIRYS_SWORD,
  QUEST_ITEM_3,
  BOTTLE1,
  BOTTLE2,
  BOTTLE3,
  BOTTLE4,
  BOTTLE5,
  BOTTLE6,
  
  MASK_POSTMAN,
  MASK_ALL_NIGHT,
  MASK_BLAST,
  MASK_STONE,
  MASK_GREAT_FAIRY,
  MASK_DEKU,
  MASK_KEATON,
  MASK_BREMEN,
  MASK_BUNNY_HOOD,
  MASK_DON_GERO,
  MASK_OF_SCENTS,
  MASK_GORON,
  MASK_ROMANI,
  MASK_CIRCUS_LEADER,
  MASK_KAFEI,
  MASK_COUPLES,
  MASK_OF_TRUTH,
  MASK_ZORA,
  MASK_KAMERO,
  MASK_GIBDO,
  MASK_GARO,
  MASK_CAPTAIN,
  MASK_GIANT,
  MASK_FIERCE_DEITY,
  NONE = 0xFF,
}

class UpgradeCount {
  item: InventoryItem;
  level: AmmoUpgrade;
  count: number;

  constructor(item: InventoryItem, level: AmmoUpgrade, count: number) {
    this.item = item;
    this.level = level;
    this.count = count;
  }

  isMatch(inst: UpgradeCount) {
    return inst.item === this.item && inst.level === this.level;
  }
}

const UpgradeCountLookupTable: UpgradeCount[] = [
  // Bombs
  new UpgradeCount(InventoryItem.BOMB, AmmoUpgrade.NONE, 0),
  new UpgradeCount(InventoryItem.BOMB, AmmoUpgrade.BASE, 20),
  new UpgradeCount(InventoryItem.BOMB, AmmoUpgrade.UPGRADED, 30),
  new UpgradeCount(InventoryItem.BOMB, AmmoUpgrade.MAX, 40),

  // Sticks
  new UpgradeCount(InventoryItem.DEKU_STICK, AmmoUpgrade.NONE, 0),
  new UpgradeCount(InventoryItem.DEKU_STICK, AmmoUpgrade.BASE, 10),
  new UpgradeCount(InventoryItem.DEKU_STICK, AmmoUpgrade.UPGRADED, 20),
  new UpgradeCount(InventoryItem.DEKU_STICK, AmmoUpgrade.MAX, 30),

  // Nuts
  new UpgradeCount(InventoryItem.DEKU_NUT, AmmoUpgrade.NONE, 0),
  new UpgradeCount(InventoryItem.DEKU_NUT, AmmoUpgrade.BASE, 20),
  new UpgradeCount(InventoryItem.DEKU_NUT, AmmoUpgrade.UPGRADED, 30),
  new UpgradeCount(InventoryItem.DEKU_NUT, AmmoUpgrade.MAX, 40),

  // Arrows
  new UpgradeCount(InventoryItem.HEROES_BOW, AmmoUpgrade.NONE, 0),
  new UpgradeCount(InventoryItem.HEROES_BOW, AmmoUpgrade.BASE, 30),
  new UpgradeCount(InventoryItem.HEROES_BOW, AmmoUpgrade.UPGRADED, 40),
  new UpgradeCount(InventoryItem.HEROES_BOW, AmmoUpgrade.MAX, 50),

  // Bombchu
  new UpgradeCount(InventoryItem.BOMBCHU, AmmoUpgrade.NONE, 0),
  new UpgradeCount(InventoryItem.BOMBCHU, AmmoUpgrade.BASE, 5),
  new UpgradeCount(InventoryItem.BOMBCHU, AmmoUpgrade.UPGRADED, 10),
  new UpgradeCount(InventoryItem.BOMBCHU, AmmoUpgrade.MAX, 20)
];

export function UpgradeCountLookup(item: InventoryItem, level: AmmoUpgrade): number {
  let inst: UpgradeCount = new UpgradeCount(item, level, -1);
  for (let i = 0; i < UpgradeCountLookupTable.length; i++) {
    if (inst.isMatch(UpgradeCountLookupTable[i])) {
      return UpgradeCountLookupTable[i].count;
    }
  }
  return 0;
}

export interface IOvlPayloadResult{
  file: string;
  slot: number;
  addr: number;
  params: number;
  buf: Buffer;
  relocate: number;
  
  spawn(obj: IOvlPayloadResult, callback?: (success: boolean, result: number)=>{}): void;
}

