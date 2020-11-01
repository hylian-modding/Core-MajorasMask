import { IActor } from './IActor';
import { IDungeonItemManager } from './IDungeonItemManager';
import { ICore } from 'modloader64_api/IModLoaderAPI';
import { Command, ICommandBuffer } from 'modloader64_api/OOT/ICommandBuffer';
import Vector3 from 'modloader64_api/math/Vector3';
import { IPacketHeader } from 'modloader64_api/NetworkHandler';
import { IPosition } from './IPosition';

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
  Z_TARGETING,
  CAMERA
}

export const enum LinkState2 {
  UNKNOWN,
  IDLE,
  CRAWLSPACE,
  MOVING_FORWARD
}

export const enum MMForms {
  FD,
  GORON,
  ZORA,
  DEKU,
  HUMAN
}

export enum EventFlags {
  TIME_UNK_0,
  PERM_Entered_Termina_Field,
  PERM_Entered_Ikana_Graveyard,
  PERM_Entered_Romani_Ranch,
  PERM_Entered_Gorman_Racetrack,
  PERM_Entered_Mountain_Village,
  PERM_Entered_Goron_Shrine,
  PERM_Entered_Snowhead,
  PERM_Entered_Southern_Swamp,
  PERM_Entered_Woodfall,
  PERM_Entered_Deku_Palace,
  PERM_Entered_Great_Bay_Coast,
  PERM_Entered_Pirates_Fortress,
  PERM_Entered_Zora_Hall,
  PERM_Entered_Waterfall_Rapids,
  PERM_Entered_Ikana_Canyon,
  PERM_Entered_Ancient_Castle_of_Ikana,
  PERM_Entered_Stone_Tower,
  PERM_Entered_Inverted_Stone_Tower,
  PERM_Entered_East_Clock_Town,
  PERM_Entered_West_Clock_Town,
  PERM_Entered_North_Clock_Town,
  PERM_Entered_Woodfall_Temple,
  PERM_Entered_Snowhead_Temple,
  PERM_Entered_Pirates_Fortress_Exterior,
  PERM_Entered_Stone_Tower_Temple,
  PERM_Entered_Inverted_Stone_Tower_Temple,
  PERM_Entered_The_Moon,
  PERM_Entered_Deku_Trial,
  PERM_Entered_Goron_Trial,
  PERM_Entered_Zora_Trial,
  PERM_Entered_Link_Trial,
  TIME_UNK_1,
  TIME_Entered_Deku_Kings_Chamber,
  TIME_UNK_2,
  TIME_UNK_3,
  TIME_UNK_4,
  TIME_UNK_5,
  TIME_UNK_6,
  TIME_UNK_7,
  TIME_UNK_8,
  TIME_UNK_9,
  TIME_UNK_10,
  TIME_UNK_11,
  TIME_UNK_12,
  TIME_UNK_13,
  TIME_UNK_14,
  TIME_UNK_15,
  TIME_UNK_16,
  TIME_UNK_17,
  TIME_UNK_18,
  TIME_UNK_19,
  TIME_UNK_20,
  TIME_UNK_21,
  TIME_UNK_22,
  TIME_UNK_23,
  TIME_UNK_24,
  TIME_UNK_25,
  TIME_UNK_26,
  TIME_UNK_27,
  TIME_UNK_28,
  TIME_UNK_29,
  TIME_UNK_30,
  PERM_Learned_Oath_to_Order,
  DISABLE_Minigame_Disable_All_But_B_Button,
  TIME_Spoke_to_Monkey_Outside_Deku_Kings_Chamber,
  TIME_UNK_31,
  TIME_UNK_32,
  TIME_UNK_33,
  PERM_Obtained_Doggy_Racetrack_Piece_of_Heart,
  TIME_Clock_Tower_Opened,
  TIME_Retrieved_Clock_Town_Stray_Fairy,
  TIME_Spoke_to_Clock_Town_Fairies_Once,
  TIME_Spoke_to_Woodfall_Fairies_Once,
  TIME_Spoke_to_Snowhead_Fairies_Once,
  TIME_Spoke_to_Great_Bay_Fairies_Once,
  TIME_Spoke_to_Stone_Tower_Fairies_Once,
  TIME_Spoke_to_Gaebora_at_Goron_Village,
  TIME_Gaebora_Guides_the_Way_to_Lens_Cave,
  TIME_Taught_Sonata_of_Awakening,
  TIME_Kooloo_Limpah_Tingle_Related,
  TIME_UNK_34,
  TIME_UNK_35,
  PERM_Obtained_Adult_Wallet,
  TIME_UNK_36,
  TIME_UNK_37,
  TIME_UNK_38,
  TIME_UNK_39,
  TIME_Caught_Bomber_1,
  TIME_Caught_Bomber_2,
  TIME_Caught_Bomber_3,
  TIME_Caught_Bomber_4,
  TIME_Caught_Bomber_5,
  TIME_UNK_40,
  TIME_UNK_41,
  TIME_UNK_42,
  TIME_Water_Purified_in_Woodfall_Temple,
  TIME_Racing,
  TIME_Saw_at_Skull_Kid_in_Telescope,
  TIME_Gave_Red_Potion_to_Koume,
  PERM_Obtained_Red_Potion_Bottle,
  TIME_Clock_Town_Guards_Allow_Passage,
  TIME_Deku_Palace_Guards_Allow_Passage,
  TIME_Obtained_Magic_Jar, //confirm
  TIME_Killed_All_Eels,
  TIME_UNK_43,
  TIME_Spoke_to_Cremia_Once,
  TIME_Spoke_to_Cremia_in_Barn_Once,
  TIME_UNK_44,
  TIME_Spoke_to_Oceanside_Spider_House_Guy_Once,
  PERM_Obtained_Giants_Wallet,
  TIME_Completed_Oceanside_Spider_House,
  TIME_Protected_Cremia___Obtained_Romanis_Mask, //confirm
  TIME_Activated_Sharp,
  TIME_Water_Raised_in_Ikana_Canyon,
  TIME_Chateau_Romani_Infinite_Magic,
  TIME_Deku_Flower_Minigame_Beat_Day_1,
  TIME_Deku_Flower_Minigame_Beat_Day_2,
  TIME_Deku_Flower_Minigame_Beat_Day_3,
  PERM_Obtained_Deku_Flower_Minigame_Piece_of_Heart,
  TIME_UNK_45,
  TIME_UNK_46,
  TIME_UNK_47,
  TIME_Spoke_to_Orange_Gorman_Bro_Once,
  TIME_Spoke_to_Blue_Gorman_Bro_Once,
  PERM_UNK_48,
  TIME_UNK_49,
  TIME_Saw_Kotake_Leave_to_Look_for_Koume,
  TIME_UNK_50,
  TIME_Took_Off_Transformation_Mask_0,
  TIME_UNK_51,
  TIME_Took_Off_Transformation_Mask_1,
  TIME_Spoke_to_Koume_in_Woods,
  TIME_UNK_52,
  TIME_Spoke_to_Beaver_Little_Brother,
  TIME_UNK_53,
  TIME_UNK_54,
  TIME_UNK_55,
  TIME_Deku_Palace_Caught_in_Gardens,
  TIME_UNK_56,
  TIME_Spoke_to_Shikashi,
  TIME_Spoke_to_Clock_Town_Deku_Merchant_in_First_Cycle,
  TIME_UNK_57,
  TIME_Obtained_Land_Title_Deed,
  TIME_Spoke_to_Deku_King_Once,
  TIME_UNK_58,
  TIME_UNK_59,
  TIME_UNK_60,
  TIME_UNK_61,
  TIME_Spoke_to_Biggoron_as_Non_Goron_Once,
  TIME_Received_Powder_Keg_for_Racetrack,
  TIME_Received_Powder_Keg_for_Personal_Use,
  TIME_Powder_Keg_0,
  TIME_Powder_Keg_1,
  TIME_Spoke_to_Lake_Scientist_Once,
  TIME_Spoke_to_Lake_Scientist_as_Goron_Once,
  TIME_Spoke_to_Lake_Scientist_as_Deku_Once,
  TIME_Spoke_to_Lake_Scientist_as_Zora_Once,
  TIME_Zora_Eggs_Hatched,
  TIME_Played_Song_of_Healing_for_Darmani,
  TIME_Woodfall_Temple_Raised,
  TIME_Woodfall_Temple_Prison_Entrance_Raised___Water_Cleansed,
  TIME_Darmani_Waiting_at_Two_Islands,
  TIME_Darmani_Waiting_at_Mountain_Village,
  TIME_Darmani_Waiting_at_Grave,
  TIME_Raised_Water_in_Darmanis_Grave,
  TIME_Learning_New_Wave_Bossa_Nova,
  TIME_Spoke_to_Mountain_Smithy_Once,
  TIME_Mountain_Smithy_Hearth_Melted,
  TIME_UNK_62,
  TIME_Goron_Outside_Grave_Spoke_to_Goron_Link,
  TIME_Gorons_Outside_Grave_Conversed,
  TIME_UNK_63,
  TIME_Practiced_for_Aliens_with_Romani,
  TIME_Spoke_to_Romani_Once,
  TIME_UNK_64,
  TIME_Warded_Off_Aliens,
  PERM_Obtained_Milk_Bottle,
  TIME_Played_Lullaby_for_Goron_Elders_Son,
  TIME_Spoke_to_Goron_Elders_Son_Once,
  TIME_Honey__Darling_Beat_Day_1,
  TIME_Honey__Darling_Beat_Day_2,
  TIME_Honey__Darling_Beat_Day_3,
  PERM_Obtained_Honey__Darling_Piece_of_Heart,
  TIME_Spoke_to_Goron_in_Goron_Shrine_Top_As_Goron_Once,
  PERM_Woodfall_Great_Fairy_Spin_Attack,
  TIME_Dismissed_Captain_Keeta,
  TIME_Spoke_to_Swamp_Tourist_Guide_Once,
  TIME_UNK_65,
  TIME_Deku_Princess_Returned_to_Palace1,
  TIME_UNK_66,
  PERM_Obtained_Beaver_Bottle,
  SCENE_Won_Against_Big_Brother_Beaver,
  PERM_UNK_67,
  SCENE_Won_Against_Little_Brother_Beaver,
  TIME_UNK_68,
  TIME_Spoke_to_Goron_Elder_Twice,
  TIME_UNK_69, //nice
  TIME_Goron_Elder_Taught_Lullaby_Intro,
  TIME_Spoke_to_Goron_in_Goron_Shrine_Next_to_Baby_Right_Once,
  PERM_Obtained_Beaver_Piece_of_Heart,
  TIME_Giants_Called_to_Clock_Tower,
  TIME_UNK_70,
  TIME_Raised_Cuccos,
  TIME_Boat_Cruise,
  TIME_Boat_Cruise_Purified_Swamp,
  TIME_Spoke_to_Seahorse_at_Fishermans_Once_0,
  TIME_Spoke_to_Fisherman_Once_as_Zora,
  TIME_Spoke_to_Fisherman_Once_as_Link,
  TIME_Spoke_to_Seahorse_at_Fishermans_Once_1,
  TIME_UNK_71,
  TIME_Gave_Picture_of_Pirate_to_Fisherman,
  TIME_Spoke_to_Koume_for_Boat_Cruise_After_Swamp_Purification_Once,
  TIME_UNK_72,
  PERM_Obtained_Swamp_Cruise_Piece_of_Heart,
  TIME_UNK_73,
  TIME_Spoke_to_Deku_Butler_in_Deku_Kings_Chamber_Once,
  TIME_Postbox_1_Deposited_Letter_to_Kafei,
  TIME_Postbox_2_Deposited_Letter_to_Kafei,
  TIME_Postbox_3_Deposited_Letter_to_Kafei,
  TIME_Postbox_4_Deposited_Letter_to_Kafei,
  TIME_Postbox_5_Deposited_Letter_to_Kafei,
  TIME_Postman_Checked_Postbox_1_930_AM,
  TIME_Postman_Checked_Postbox_2_1003_AM,
  TIME_Postman_Checked_Postbox_3_1035_AM,
  TIME_Postman_Checked_Postbox_4_1052_AM,
  TIME_Postman_Checked_Postbox_5_1125_AM,
  TIME_Postman_Scheduled_to_Deliver_Letter_to_Kafei_Day_2,
  TIME_Postman_Scheduled_to_Deliver_Letter_to_Kafei_Day_3,
  TIME_UNK_74,
  TIME_Spoke_to_Left_Pot_Zora_As_Non_Zora_Once,
  TIME_Spoke_to_Left_Pot_Zora_As_Zora_Once,
  TIME_UNK_75,
  TIME_UNK_76,
  TIME_Spoke_to_Right_Pot_Zora_As_Zora_Once,
  TIME_Spoke_to_Right_Pot_Zora_As_Non_Zora_Once,
  TIME_Broke_Zora_Pots_Once,
  TIME_Mikau_Collapsed_on_Shore,
  TIME_Woodfall_Temple_Prison_Cut_Open,
  TIME_Deku_Princess_Returned_to_Palace2,
  TIME_Biggoron_Fell_Asleep,
  TIME_Spoke_to_Japas_As_Non_Zora_Once,
  TIME_Spoke_to_Japas_As_Zora_Once,
  TIME_Took_Out_Ocarina_for_Japas,
  PERM_Wore_Deku_Mask_Once,
  PERM_Wore_Goron_Mask_Once,
  PERM_Wore_Zora_Mask_Once,
  PERM_Wore_Fierce_Deity_Mask_Once,
  PERM_Tatls_Snowhead_Hint_Text_0,
  PERM_Tatls_Ocean_Hint_Text1,
  PERM_Tatls_Second_Cycle_Text,
  TIME_Played_for_Japas_Once,
  TIME_UNK_77,
  PERM_UNK_78,
  TIME_Rode_With_Cremia,
  SCENE_Rode_With_Cremia_Resets_After_Ride,
  PERM_Obtained_Seahorse_Piece_of_Heart,
  PERM_Obtained_Swamp_Archery_Piece_of_Heart,
  PERM_Obtained_Town_Archery_Piece_of_Heart,
  TIME_Spoke_to_Tijo_As_Non_Zora_Once,
  TIME_Spoke_to_Tijo_As_Zora_Once,
  TIME_Attempted_to_Obtain_Room_Key,
  TIME_Woodfall_Temple_Frog_Returned,
  TIME_Great_Bay_Temple_Frog_Returned,
  TIME_Southern_Swamp_Frog_Returned,
  TIME_Laundry_Pool_Frog_Returned,
  TIME_Obtained_All_Night_Mask, //confirm
  TIME_Saved_Bomb_Shop_Lady_0,
  TIME_Bought_Day_1_Lottery_Ticket,
  TIME_Bought_Day_2_Lottery_Ticket,
  TIME_Bought_Day_3_Lottery_Ticket,
  TIME_Mountain_Village_Unfrozen,
  TIME_Spoke_to_Mountain_Village_Frog,
  TIME_UNK_79,
  TIME_UNK_80,
  TIME_Obtained_Mask_of_Truth, //confirm
  TIME_UNK_81,
  TIME_UNK_82,
  TIME_UNK_83,
  TIME_UNK_84,
  PERM_Map_Clock_Town,
  PERM_Map_Woodfall,
  PERM_Map_Snowhead,
  PERM_Map_Romani_Ranch,
  PERM_Map_Great_Bay,
  PERM_Map_Stone_Tower,
  TIME_Saw_Don_Gero,
  PERM_Obtained_Frog_Piece_of_Heart,
  TIME_Spoke_to_Goron_in_Goron_Shrine_Bottom_Right_As_Non_Goron_Once,
  TIME_Spoke_to_Goron_in_Goron_Shrine_Bottom_Right_As_Goron_Once,
  TIME_UNK_85,
  TIME_UNK_86,
  TIME_UNK_87,
  TIME_Spoke_to_Goron_in_Goron_Shrine_Bottom_Left_As_Non_Goron_Once,
  TIME_Spoke_to_Goron_in_Goron_Shrine_Bottom_Left_As_Goron_Once,
  TIME_UNK_88,
  TIME_UNK_89,
  TIME_Spoke_to_Goron_in_Goron_Shrine_Next_to_Baby_Left_Once,
  TIME_UNK_90,
  TIME_Fed_Rock_Sirloin_to_Don_Gero,
  TIME_Rock_Sirloin_Dropped,
  TIME_Spoke_to_Zora_Guarding_Tijos_Room_As_Non_Zora_Once,
  TIME_Spoke_to_Zora_Guarding_Tijos_Room_Once,
  TIME_Spoke_to_Zora_Guarding_Japas_Room_As_Non_Zora_Once,
  TIME_Spoke_to_Zora_Guarding_Japas_Room_As_Zora_Once,
  TIME_Spoke_to_Zora_Guarding_Evans_Room_As_Non_Zora_Once,
  TIME_Spoke_to_Zora_Guarding_Evans_Room_As_Zora_Once,
  TIME_Caught_Peeping_Zora,
  TIME_Spoke_to_Guru_Guru_in_Stock_Pot_Inn_Once,
  PERM_UNK_91,
  TIME_Listened_to_Guru_Guru,
  TIME_Spoke_to_Zora_Sitting_at_Water_in_Zora_Hall_As_Non_Zora_Once,
  TIME_Spoke_to_Zora_Sitting_at_Water_in_Zora_Hall_As_Zora_Once,
  TIME_Spoke_to_Zora_Atop_Zora_Hall_As_Non_Zora_Once,
  TIME_Spoke_to_Zora_Atop_Zora_Hall_As_Zora_Once,
  TIME_Spoke_to_Evan_As_Zora_Once,
  TIME_Spoke_to_Evan_As_Non_Zora_Once,
  PERM_Obtained_Evans_Piece_of_Heart,
  TIME_Spoke_to_Sound_Check_Guy_As_Non_Zora_Once,
  TIME_Spoke_to_Sound_Check_Guy_As_Zora_Once,
  TIME_Spoke_to_Zora_on_Stage_Once_Before_Turning_on_Lights_As_Non_Zora,
  TIME_Spoke_to_Zora_on_Stage_Once_Before_Turning_on_Lights_As_Zora,
  TIME_Spoke_to_Zora_on_Stage_Once_After_Turning_on_Lights_As_Zora,
  TIME_Spoke_to_Zora_Wandering_Around_in_Zora_Hall_As_Non_Zora_Once,
  TIME_Spoke_to_Zora_Wandering_Around_in_Zora_Hall_As_Zora_Once,
  TIME_UNK_92,
  TIME_Opened_Goron_Racetrack,
  TIME_Spoke_to_Elders_Son_Outside_Goron_Racetrack_Once,
  TIME_UNK_93,
  TIME_Spoke_to_Elders_Son_at_Racetrack_Once,
  TIME_Entered_Goron_Race,
  PERM_Obtained_Gold_Dust_Bottle,
  TIME_Played_Song_for_Evan,
  TIME_UNK_94,
  TIME_Helped_Shiro,
  TIME_UNK_95,
  SCENE_Doggy_Racetrack_0,
  SCENE_Doggy_Racetrack_1,
  SCENE_Doggy_Racetrack_2,
  SCENE_Doggy_Racetrack_3,
  SCENE_Doggy_Racetrack_4,
  SCENE_Doggy_Racetrack_5,
  SCENE_Doggy_Racetrack_6,
  SCENE_Doggy_Racetrack_7,
  SCENE_Doggy_Racetrack_8,
  SCENE_Doggy_Racetrack_9,
  SCENE_Doggy_Racetrack_10,
  SCENE_Doggy_Racetrack_11,
  SCENE_Doggy_Racetrack_12,
  SCENE_Doggy_Racetrack_13,
  SCENE_Doggy_Racetrack_14,
  SCENE_Doggy_Racetrack_15,
  SCENE_Doggy_Racetrack_16,
  SCENE_Doggy_Racetrack_17,
  SCENE_Doggy_Racetrack_18,
  SCENE_Doggy_Racetrack_19,
  SCENE_Doggy_Racetrack_20,
  SCENE_Doggy_Racetrack_21,
  SCENE_Doggy_Racetrack_22,
  SCENE_Doggy_Racetrack_23,
  SCENE_Doggy_Racetrack_24,
  SCENE_Doggy_Racetrack_25,
  SCENE_Doggy_Racetrack_26,
  SCENE_Doggy_Racetrack_27,
  SCENE_Doggy_Racetrack_28,
  SCENE_Doggy_Racetrack_29,
  SCENE_Doggy_Racetrack_30,
  SCENE_Doggy_Racetrack_31,
  SCENE_Doggy_Racetrack_32,
  SCENE_Doggy_Racetrack_33,
  SCENE_Doggy_Racetrack_34,
  SCENE_Doggy_Racetrack_35,
  SCENE_Doggy_Racetrack_36,
  SCENE_Doggy_Racetrack_37,
  SCENE_Doggy_Racetrack_38,
  SCENE_Doggy_Racetrack_39,
  SCENE_Doggy_Racetrack_40,
  SCENE_Doggy_Racetrack_41,
  SCENE_Doggy_Racetrack_42,
  SCENE_Doggy_Racetrack_43,
  SCENE_Doggy_Racetrack_44,
  SCENE_Doggy_Racetrack_45,
  SCENE_Doggy_Racetrack_46,
  SCENE_Doggy_Racetrack_47,
  SCENE_Doggy_Racetrack_48,
  SCENE_Doggy_Racetrack_49,
  SCENE_Doggy_Racetrack_50,
  SCENE_Doggy_Racetrack_51,
  SCENE_Doggy_Racetrack_52,
  SCENE_Doggy_Racetrack_53,
  SCENE_Doggy_Racetrack_54,
  SCENE_Doggy_Racetrack_55,
  TIME_UNK_96,
  TIME_UNK_97,
  TIME_UNK_98,
  TIME_UNK_99,
  TIME_UNK_100,
  TIME_UNK_101,
  TIME_UNK_102,
  TIME_UNK_103,
  TIME_Played_Full_Ballad_of_the_Wind_Fish,
  PERM_Obtained_Carnival_of_Time_storytime_Piece_of_Heart,
  PERM_Obtained_Four_Giants_storytime_Piece_of_Heart,
  TIME_Promised_to_Meet_Anju,
  TIME_Obtained_Letter_to_Kafei1,
  TIME_Obtained_Letter_to_Kafei2,
  TIME_UNK_104,
  TIME_Spoke_to_Kafei_After_Delivering_Letter,
  TIME_Gave_Pendant_of_Memories_to_Anju,
  TIME_Letter_to_Kafei_Related,
  SCENE_Hit_Kafeis_Bell,
  TIME_Obtained_Pendant_of_Memories,
  TIME_Sakons_Hideout_Open,
  TIME_Saved_Suns_Mask,
  TIME_Couples_Mask_Cutscene_Finished,
  TIME_UNK_105,
  TIME_Protected_Cremia_0,
  TIME_UNK_106,
  TIME_UNK_107,
  TIME_UNK_108,
  SCENE_Approached_Evan,
  TIME_Beat_Stone_Tower_Temple,
  SCENE_Town_Scrub_Is_in_Grotto,
  TIME_Spoke_to_Dampe_Beneath_the_Graveyard_Once,
  TIME_UNK_109,
  PERM_Obtained_Grotto_Scrub_Piece_of_Heart,
  TIME_UNK_110,
  TIME_Gave_Mushrooms_to_Kotake,
  TIME_Obtained_Blue_Potion_Free,
  TIME_Woke_Turtle,
  PERM_Rode_Turtle_Once,
  TIME_UNK_111,
  TIME_UNK_112,
  TIME_UNK_113,
  TIME_UNK_114,
  TIME_UNK_115,
  TIME_UNK_116,
  TIME_Began_Ghost_Hut_Minigame,
  PERM_Obtained_Ghost_Hut_Piece_of_Heart,
  TIME_Mystery_Man_Disappeared,
  TIME_UNK_117,
  TIME_Link_the_Goron_Claims_His_Reservation_430_PM,
  TIME_UNK_118,
  TIME_UNK_119,
  TIME_UNK_120,
  TIME_Spoke_to_Anju_in_Laundry_Pool_Once,
  TIME_UNK_121,
  TIME_Beat_Great_Bay_Temple,
  TIME_UNK_122,
  PERM_Obtained_Marine_Lab_Piece_of_Heart,
  TIME_Spoke_to_Gorman_Bros__With_Horse_Once,
  TIME_Gorman_Bros_Race_In_Progress,
  TIME_Played_Ballad_of_the_Wind_Fish_as_Link,
  TIME_Played_Ballad_of_the_Wind_Fish_as_Deku,
  TIME_Played_Ballad_of_the_Wind_Fish_as_Zora,
  TIME_Played_Ballad_of_the_Wind_Fish_as_Goron,
  TIME_Started_Race_with_Gorman_Bros,
  TIME_UNK_123,
  TIME_Delivered_Letter_to_Mama_Directly,
  PERM_Obtained_Chateau_Romani_Bottle,
  TIME_Spoke_to_Zora_Shop_Owner_As_Non_Zora_Once,
  TIME_UNK_124,
  TIME_UNK_125,
  TIME_Spoke_to_Zora_Shop_Owner_As_Zora_Once,
  TIME_UNK_126,
  TIME_Spoke_to_Mr_Barten_Preparing_Milk_Bar_Once,
  TIME_Spoke_to_Goron_Shop_Owner_As_Non_Goron_Once,
  TIME_Spoke_to_Goron_Shop_Owner_As_Goron_Once,
  TIME_UNK_127,
  TIME_UNK_128,
  TIME_Bomb_Shop_Lady_Entered_North_Clock_Town,
  SCENE_Sakons_Hideout_Opening,
  SCENE_Pamela_Outside_House,
  TIME_UNK_129,
  PERM_Entered_South_Clock_Town,
  PERM_UNK_130,
  PERM_Obtained_Large_Quiver,
  PERM_Obtained_Largest_Quiver,
  TIME_Two_Hundred_Rupees_in_Bank, //confirm
  TIME_Protected_Cremia_1,
  TIME_UNK_131,
  TIME_UNK_132,
  TIME_UNK_133,
  TIME_Listened_to_Mayor_Dotour_Once,
  PERM_Obtained_Couples_Mask_Piece_of_Heart,
  TIME_UNK_134,
  TIME_UNK_135,
  TIME_Spoke_to_Mutoh_on_Final_Night_Once,
  TIME_Obtained_Don_Geros_Mask, //confirm
  TIME_Kicked_Out_by_Pamela,
  TIME_Spotted_by_Pamela_Once,
  TIME_Spotted_by_Sakon_On_His_Way_to_Hideout,
  TIME_Obtained_Swamp_Title_Deed,
  TIME_Spoke_to_Deku_Scrub_Once,
  TIME_UNK_136,
  TIME_Obtained_Mountain_Title_Deed,
  TIME_Spoke_to_Goron_Scrub_Once,
  TIME_UNK_137,
  TIME_Obtained_Ocean_Title_Deed,
  TIME_Spoke_to_Zora_Scrub_Once,
  TIME_UNK_138,
  TIME_Gave_Ocean_Title_Deed_to_Ikana_Scrub,
  TIME_Spoke_to_Ikana_Scrub_Once,
  TIME_UNK_139,
  SCENE_Minigame_Related,
  TIME_UNK_140,
  TIME_UNK_141,
  TIME_UNK_142,
  TIME_UNK_143,
  PERM_UNK_144,
  TIME_Spoke_to_Gorman_Bros_Wearing_Circus_Leader_Mask_Once,
  TIME_Showed_Couples_Mask_to_Mayor,
  TIME_UNK_145,
  TIME_UNK_146,
  TIME_UNK_147,
  TIME_Tingle_0,
  TIME_Tingle_1,
  TIME_UNK_148,
  TIME_UNK_149,
  TIME_UNK_150,
  TIME_UNK_151,
  TIME_UNK_152,
  TIME_UNK_153,
  TIME_Spoke_to_Mamamu_Yan_Once,
  TIME_UNK_154,
  TIME_UNK_155,
  TIME_UNK_156,
  TIME_UNK_157,
  PERM_Notebook_Row_Anju,
  PERM_Notebook_Row_Kafei,
  PERM_Notebook_Row_Curiosity_Shop,
  PERM_Notebook_Row_Bomb_Shop_Lady,
  PERM_Notebook_Row_Romani,
  PERM_Notebook_Row_Cremia,
  PERM_Notebook_Row_Mayor_Dotour,
  PERM_Notebook_Row_Madame_Aroma,
  PERM_Notebook_Row_Toto,
  PERM_Notebook_Row_Gorman,
  PERM_Notebook_Row_Postman,
  PERM_Notebook_Row_Rosa_Sisters,
  PERM_Notebook_Row_Toilet,
  PERM_Notebook_Row_Anjus_Mom,
  PERM_Notebook_Row_Kamaro,
  PERM_Notebook_Row_Grog,
  PERM_Notebook_Row_Gorman_Brothers,
  PERM_Notebook_Row_Shiro,
  PERM_Notebook_Row_Guru_Guru,
  PERM_Notebook_Row_Bombers,
  PERM_Notebook_Item_Room_Key,
  PERM_Notebook_Item_Promised_Anju_Meetup,
  PERM_Notebook_Item_Promised_to_Meet_Kafei,
  PERM_Notebook_Item_Letter_to_Kafei,
  PERM_Notebook_Item_Sent_Letter_to_Kafei,
  PERM_Notebook_Item_Pendant_of_Memories,
  PERM_Notebook_Item_Delivered_Pendant,
  PERM_Notebook_Item_Suns_Mask_Kafei,
  PERM_Notebook_Item_Promised_to_Romani,
  PERM_Notebook_Item_Protected_Cows,
  PERM_Notebook_Item_Milk_Bottle,
  PERM_Notebook_Item_Protected_Milk,
  PERM_Notebook_Item_Romanis_Mask,
  PERM_Notebook_Item_Keaton_Mask,
  PERM_Notebook_Item_Letter_to_Mama,
  PERM_Notebook_Item_Chateau_Romani,
  PERM_Obtained_Notebook,
  PERM_Notebook_Item_Bombers_Code,
  PERM_Notebook_Item_Mayor_Dotour_Piece_of_Heart,
  PERM_Notebook_Item_Rosa_Sisters_Piece_of_Heart,
  PERM_Notebook_Item_Toilets_Piece_of_Heart,
  PERM_Notebook_Item_Carnival_of_Time_Piece_of_Heart,
  PERM_Notebook_Item_Four_Giants_Piece_of_Heart,
  PERM_Notebook_Item_Postman_Piece_of_Heart,
  PERM_Notebook_Item_Kafeis_Mask,
  PERM_Notebook_Item_All_Night_Mask,
  PERM_Notebook_Item_Bunny_Mask,
  PERM_Notebook_Item_Garos_Mask,
  PERM_Notebook_Item_Circus_Leaders_Mask,
  PERM_Notebook_Item_Postmans_Hat,
  PERM_Notebook_Item_Couples_Mask,
  PERM_Notebook_Item_Blast_Mask,
  PERM_Notebook_Item_Kamaros_Mask,
  PERM_Notebook_Item_Stone_Mask,
  PERM_Notebook_Item_Bremen_Mask,
  PERM_UNK_158,
  TIME_UNK_159,
  TIME_Spoke_to_Bomb_Shop_Lady_Once,
  TIME_Clock_Town_Deku_Merchant_Landed,
  PERM_UNK_160,
  TIME_Began_Bombers_Hide__Seek_on_Day_1,
  TIME_Completed_Bombers_Hide__Seek,
  TIME_UNK_161,
  TIME_Entered_Bombers_Code,
  TIME_UNK_162,
  TIME_UNK_163,
  TIME_UNK_164,
  TIME_UNK_165,
  TIME_Shikashi_Automatically_Spoke_to_Link,
  TIME_Moons_Tear_Fell1,
  TIME_Obtained_Moons_Tear,
  TIME_Moons_Tear_Fell2,
  TIME_Overheard_Mr_Barten__Gorman_Conversation_Once,
  TIME_Spoke_to_Gorman_in_Milk_Bar_Once,
  TIME_UNK_166,
  TIME_Shikashi_Automatically_Spoke_to_Goron_or_Zora_Link,
  TIME_Obtained_Room_Key,
  TIME_Played_Song_of_Healing_for_Pamelas_Father,
  TIME_Completed_Bombers_Hide__Seek_Twice,
  TIME_Danced_for_Rosa_Sisters_0,
  TIME_Caught_Bomber_1_1,
  TIME_Caught_Bomber_2_1,
  TIME_Caught_Bomber_3_1,
  TIME_Caught_Bomber_4_1,
  TIME_Caught_Bomber_5_1,
  TIME_UNK_167,
  TIME_Caught_All_Bombers,
  TIME_Spoke_to_Ghost_in_Secret_Shrine,
  PERM_Obtained_Postman_Minigame_Piece_of_Heart,
  TIME_Bombers,
  PERM_Danced_for_Rosa_Sisters_1,
  TIME_Made_All_Grotto_Gossip_Stones_the_Same_Color,
  TIME_UNK_168,
  TIME_UNK_169,
  TIME_Moons_Tear_Quest_Related,
  TIME_Spoke_to_Goron_Elder_After_Beating_Goht_Once,
  TIME_UNK_170,
  TIME_Spoke_to_Zora_Near_Pinnacle_Rock_As_Zora_Once,
  TIME_UNK_171,
  TIME_Spoke_to_Zora_Near_Pirates_Fortress_As_Zora_Once,
  TIME_Spoke_to_Zora_Near_Pirates_Fortress_As_Non_Zora_Once,
  TIME_UNK_172,
  TIME_UNK_173,
  TIME_UNK_174,
  TIME_Spoke_to_Lulu_After_Beating_Gyorg_Once,
  TIME_Spoke_to_Monkeys_Outside_Lost_Woods,
  TIME_Spoke_to_Guru_Guru_As_Deku_Once,
  TIME_Scarecrow_Fled,
  TIME_Tatl_Spoke_About_Clock_Tower_Entrance,
  TIME_UNK_175,
  TIME_Killed_Sakon,
  PERM_Obtained_Keaton_Quiz_Piece_of_Heart,
  TIME_UNK_176,
  TIME_UNK_177,
  TIME_Clock_Town_Tatl,
  TIME_UNK_178,
  TIME_Obtained_Keaton_Mask, //confirm
  TIME_Spoke_to_Guy_Outside_Ikana_Hill,
  TIME_UNK_179,
  TIME_UNK_180,
  TIME_Tatl_Angered_by_Sakon,
  TIME_Saved_Bomb_Shop_Lady_1,
  TIME_UNK_181,
  PERM_Obtained_Postbox_Piece_of_Heart,
  SCENE_Fed_Marine_Lab_Fish_1_Once,
  SCENE_Fed_Marine_Lab_Fish_1_Twice,
  SCENE_Fed_Marine_Lab_Fish_1_Three_Times,
  SCENE_Fed_Marine_Lab_Fish_2_Once,
  SCENE_Fed_Marine_Lab_Fish_2_Twice,
  SCENE_Fed_Marine_Lab_Fish_2_Three_Times,
  TIME_Played_Song_of_Healing_for_Kamaro,
  DISABLE_Disable__Hide_C_Buttons1,
  PERM_Obtained_Fisherman_Piece_of_Heart,
  DISABLE_Disable__Hide_C_Buttons2,
  TIME_UNK_182,
  TIME_Spoke_to_Postman_on_Final_Night_Once,
  TIME_Dancing_With_Scarecrow,
  TIME_Pirates_Fled_Hookshot_Room,
  SCENE_Popped_Jims_Balloon,
  TIME_Began_Swordsmans_Lesson,
  TIME_UNK_183,
  TIME_Pirate_Related,
  TIME_UNK_184,
  TIME_UNK_185,
  TIME_UNK_186,
  TIME_UNK_187,
  TIME_UNK_188,
  TIME_UNK_189,
  TIME_Reunited_Seahorses,
  TIME_Obtained_Fierce_Deity_Mask, //confirm
  TIME_Obtained_Red_Potion_for_Koume,
  TIME_Jim_Left_East_Clock_Town,
  TIME_Bomber_Related,
  SCENE_Bombers_Hide__Seek_in_Progress,
  TIME_Overheard_Employees_Room_Conversation,
  TIME_UNK_190,
  TIME_UNK_191,
  TIME_Killed_All_Eels___Seahorse_Position,
  SCENE_Triggered_Fight_With_Captain_Keeta,
  TIME_Postman_Showing_Priority_Mail_to_Madame_Aroma,
  TIME_Postman_Delivering_Priority_Mail,
  TIME_Spoke_to_Bomber_Guarding_Passage,
  TIME_Spoke_to_Town_Scrub_Once_as_Deku,
  TIME_Overheard_Anju__Postman_Conversation_Once,
  TIME_Overheard_Anju__Link_the_Goron_Conversation_Once,
  TIME_Listened_to_Aroma_Toto_Gorman_Once,
  TIME_Overheard_Gorman__Mayors_Receptionist_Conversation_Once,
  PERM_Entered_Any_Temple_With_Appropriate_Remains,
  TIME_UNK_192,
  TIME_Triggered_Couples_Mask_Cutscene,
  PERM_Obtained_Tingle_Picture_Piece_of_Heart,
  PERM_Tatls_Swamp_Hint_Text,
  PERM_Tatls_Snowhead_Hint_Text_1,
  PERM_Tatls_Ocean_Hint_Text,
  PERM_Tatls_Mountain_Hint_Text,
  PERM_UNK_193,
  TIME_Spoke_to_Captured_Monkey_Once,
  TIME_Spoke_to_Postman_Giving_Letter_to_Kafei,
  TIME_UNK_194,
  TIME_UNK_195,
  TIME_Pushed_Mikau_to_Shore,
  TIME_Tatl_Tells_Link_to_Hurry_at_Clock_Tower,
  TIME_Goron_Shrine_Opened,
  TIME_UNK_196,
  TIME_UNK_197,
  TIME_UNK_198,
  TIME_Spoke_to_Goron_Guarding_Goron_Shrine_Once,
  TIME_Postman_Delivered_Priority_Mail,
  TIME_UNK_199,
  TIME_Isnt_that_your_horse,
  TIME_Postman_Preparing_to_Flee_Town,
  TIME_Kafei_in_Sakons_Hideout,
  TIME_Postman_Fled_Town,
  TIME_Kafei_Leaves_to_See_Anju,
  TIME_Obtained_Postmans_Hat, //confirm
  TIME_Letter_to_Kafei_Picked_up_by_Postman,
  PERM_Obtained_Gossip_Stone_Piece_of_Heart,
  TIME_B_Button_Only_Hides_Others,
  TIME_Boat_at_Deku_Palace,
  TIME_Helped_Toilet,
  TIME_Mikau_Requested_Help,
  TIME_Mikau_Performed_His_Song,
  TIME_Sent_Letter_to_Kafei_On_Time,
  TIME_Sent_Letter_to_Kafei_Late,
  TIME_Saw_Darmani_at_Grave,
  TIME_UNK_200,
  TIME_UNK_201,
  TIME_UNK_202,
  PERM_Started_Gorman_Bros_Race_Once,
  TIME_Finished_Gorman_Bros_Race,
  TIME_UNK_203,
  TIME_Spoke_to_Madame_Aroma_as_Deku_Once,
  TIME_UNK_204,
  TIME_UNK_205,
  TIME_UNK_206,
  SCENE_Triggered_Each_Time_a_Scene_Is_Loaded,
  TIME_Beavers_On_Shore_After_First_Two_Races,
  TIME_Completed_Deku_Shrine,
  PERM_UNK_207,
  PERM_Woke_Turtle_Once,
  TIME_UNK_208,
  TIME_UNK_209,
  TIME_UNK_210,
  TIME_UNK_211,
  TIME_UNK_212,
  TIME_UNK_213,
  TIME_UNK_214,
  TIME_UNK_215,
  TIME_UNK_216,
  TIME_UNK_217,
  TIME_UNK_218,
  TIME_UNK_219,
  TIME_UNK_220,
  TIME_UNK_221,
  TIME_UNK_222,
  TIME_UNK_223,
  TIME_UNK_224,
  TIME_UNK_225,
  TIME_UNK_226,
  TIME_UNK_227,
  TIME_UNK_228,
  TIME_UNK_229,
  TIME_UNK_230,
  TIME_UNK_231,
  TIME_UNK_232,
  TIME_UNK_233,
  TIME_UNK_234,
  TIME_UNK_235,
  TIME_UNK_236,
  TIME_UNK_237,
  TIME_UNK_238,
  TIME_UNK_239,
  TIME_UNK_240,
  TIME_UNK_241,
  TIME_UNK_242,
  TIME_UNK_243,
  TIME_UNK_244,
  TIME_UNK_245,
  TIME_UNK_246,
  TIME_UNK_247,
  TIME_UNK_248,
  TIME_UNK_249,
  TIME_UNK_250,
  TIME_UNK_251,
  TIME_UNK_252,
  TIME_UNK_253,
  TIME_UNK_254,
  TIME_UNK_255,
  TIME_UNK_256,
  TIME_UNK_257,
  TIME_UNK_258,
  TIME_UNK_259
}

export const enum Scene {
  NONE = 0xFF,
  SOUTHERN_SWAMP = 0x00,
  UNKNOWN_0X01 = 0x01,
  UNKNOWN_0X02 = 0x02,
  UNKNOWN_0X03 = 0x03,
  UNKNOWN_0X04 = 0x04,
  UNKNOWN_0X05 = 0x05,
  UNKNOWN_0X06 = 0x06,
  GROTTOS = 0x07,
  LENS_OF_TRUTH_CAVERN = 0x07,
  TITLE_SCREEN = 0x08,
  VARIOUS_CUTSCENES = 0x08,
  UNKNOWN_0X09 = 0x09,
  MAGIC_HAGS_POTION_SHOP = 0x0A,
  MAJORAS_MASK_BOSS_ROOM = 0x0B,
  BENEATH_THE_GRAVEYARD = 0x0C,
  CURIOSITY_SHOP = 0x0D,
  UNKNOWN_0X0E = 0x0E,
  UNKNOWN_0X0F = 0x0F,
  MAMAS_HOUSE = 0x10,
  HONEY_AND_DARLINGS_SHOP = 0x11,
  MAYORS_RESIDENCE = 0x12,
  IKANA_CANYON = 0x13,
  PIRATES_FORTRESS = 0x14,
  MILK_BAR = 0x15,
  STONE_TOWER_TEMPLE_NORMAL = 0x16,
  TREASURE_CHEST_SHOP = 0x17,
  STONE_TOWER_TEMPLE_INVERTED = 0x18,
  ON_TOP_OF_CLOCK_TOWER = 0x19,
  CAVE_BEFORE_CLOCK_TOWER = 0x1A,
  WOODFALL_TEMPLE = 0x1B,
  PATH_TO_MOUNTAIN_VILLAGE = 0x1C,
  ANCIENT_CASTLE_OF_IKANA = 0x1D,
  CLOCK_TOWN_GROTTO_MINIGAME = 0x1E,
  WOODFALL_TEMPLE_BOSS_ROOM = 0x1F,
  CLOCK_TOWN_SHOOTING_GALLERY = 0x20,
  SNOWHEAD_TEMPLE = 0x21,
  MILK_ROAD = 0x22,
  PIRATES_FORTRESS_INDOOR = 0x23,
  SWAMP_SHOOTING_GALLERY = 0x24,
  PINNACLE_ROCK = 0x25,
  GREAT_FAIRY_FOUNTAIN = 0x26,
  SPIDER_SWAMP_HOUSE = 0x27,
  OCEAN_SIDE_SPIDER_HOUSE = 0x28,
  ASTRAL_OBSERVATORY = 0x29,
  ODOLWAS_TRIAL_MOON = 0x2A,
  OUTSIDE_DEKU_PALACE = 0x2B,
  MOUNTAIN_SMITHY = 0x2C,
  TERMINA_FIELDS = 0x2D,
  POST_OFFICE = 0x2E,
  MARINE_RESEARCH_LAB = 0x2F,
  DAMPES_HOUSE = 0x30,
  UNKNOWN_0X31 = 0x31,
  GORON_SHRINE = 0x32,
  ZORAS_DOMAIN = 0x33,
  TRADING_POST = 0x34,
  ROMANI_RANCH = 0x35,
  STONE_TOWER_TEMPLE_BOSS_ROOM = 0x36,
  GREAT_BAY_COAST_WEST = 0x37,
  GREAT_BAY_COAST_EAST = 0x38,
  LOTTERY_SHOP = 0x39,
  UNKNOWN_0X3A = 0x3A,
  PIRATES_FORTRESS_ENTRANCE = 0x3B,
  FISHERMANS_HUT = 0x3C,
  GORON_SHOP = 0x3D,
  INSIDE_THE_DEKU_PALACE = 0x3E,
  GOHTS_TRIAL_MOON = 0x3F,
  PATH_TO_SOUTHERN_SWAMPS = 0x40,
  ROMANI_RANCH_DOG_TRACK = 0x41,
  ROMANI_RANCH_CUCCO_AREA = 0x42,
  IKANI_CANYONS_GRAVEYARD = 0x43,
  SNOWHEAD_TEMPLE_BOSS_ROOM = 0x44,
  SOUTHERN_SWAMPS = 0x45,
  WOODFALL = 0x46,
  GYORGS_TRIAL_MOON = 0x47,
  GORON_VILLAGE_SPRING = 0x48,
  GREAT_BAY_TEMPLE = 0x49,
  BEAVER_RACE_MINIGAME = 0x4A,
  BENEATH_THE_WELL = 0x48,
  ZORAS_DOMAIN_ROOMS = 0x4C,
  GORON_VILLAGE_WINTER = 0x4D,
  DARMANIS_GRAVE = 0x4E,
  SAKONS_HIDEOUT = 0x4F,
  MOUNTAIN_VILLAGE_WINTER = 0x50,
  INSIDE_A_POT = 0x51, //Ghost sounds (Beta)
  DEKU_SHRINE = 0x52,
  PATH_TO_IKANA_CANYON = 0x53,
  SWORDSMANS_SCHOOL = 0x54,
  MUSIC_BOX_HOUSE = 0x55,
  ANCIENT_CASTLE_OF_IKANA_THRONE_ROOM = 0x56,
  SOUTHERN_SWAMMP_HOUSE = 0x57,
  STONE_TOWER_NORMAL = 0x58,
  STONE_TOWER_INVERTED_CUTSCENE = 0x59,
  MOUNTAIN_VILLAGE_SPRING = 0x5A,
  PATH_TO_GORON_VILLAGE_WINTER = 0x5B,
  SNOWHEAD = 0x5C,
  UNKNOWN_0X5D = 0x5D,
  PATH_TO_GORON_VILLAGE_SPRING = 0x5E,
  GREAT_BAY_TEMPLE_BOSS_ROOM = 0x5F,
  SECRET_SHRINE = 0x60,
  STOCK_POT_IN = 0x61,
  GREAT_BAY_PIRATE_CUTSCENE = 0x62,
  CLOCK_TOWER_SEWER = 0x63,
  WOODS_OF_MYSTERY = 0x64,
  STARTING_AREA = 0x65,
  TWINMOLDS_TRIAL_MOON = 0x66,
  MOON = 0x67,
  BOMB_SHOP = 0x68,
  GIANTS_ROOM_CUTSCENE = 0x69,
  GORMANS_TRACK = 0x6A,
  GORON_RACETRACK = 0x6B,
  CLOCK_TOWN_EAST = 0x6C,
  CLOCK_TOWN_WEST = 0x6D,
  CLOCK_TOWN_NORTH = 0x6E,
  CLOCK_TOWN_SOUTH = 0x6F,
  LAUNDRY_POOL = 0x70
}

export interface ISceneInfo { }

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
  photoCount: number;
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

  /*
  3E 38 47 45 40 32 3A 46
  39 42 48 33 3C 3D 37 3F
  36 34 43 41 3B 44 49 35
*/
  MASK_POSTMAN = 0x3E,
  MASK_ALL_NIGHT = 0x38,
  MASK_BLAST = 0x47,
  MASK_STONE = 0x45,
  MASK_GREAT_FAIRY = 0x40,
  MASK_DEKU = 0x32,
  MASK_KEATON = 0x3A,
  MASK_BREMEN = 0x46,
  MASK_BUNNY_HOOD = 0x39,
  MASK_DON_GERO = 0x42,
  MASK_OF_SCENTS = 0x48,
  MASK_GORON = 0x33,
  MASK_ROMANI = 0x3C,
  MASK_CIRCUS_LEADER = 0x3D,
  MASK_KAFEI = 0x37,
  MASK_COUPLES = 0x3F,
  MASK_OF_TRUTH = 0x36,
  MASK_ZORA = 0x34,
  MASK_KAMERO = 0x43,
  MASK_GIBDO = 0x41,
  MASK_GARO = 0x3B,
  MASK_CAPTAIN = 0x44,
  MASK_GIANT = 0x49,
  MASK_FIERCE_DEITY = 0x35,
  NONE = 0xFF,
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
  swordLevel: Sword;
}

export interface IPhoto {
  pictograph_photoChunk: Buffer;
  pictograph_spec: number;
  pictograph_quality: number;
  pictograph_unk: number;
  pictograph_used: boolean;
}

export interface IShields {
  shieldLevel: Shield;
}

export interface IInventoryCounts {
  dekuSticksCount: number;
  dekuNutsCount: number;
  bombsCount: number;
  bombchuCount: number;
  magicBeansCount: number;
  photoCount: number;
  arrows: number;
}

export interface IInventoryFields {
  dekuSticksCapacity: AmmoUpgrade;
  dekuNutsCapacity: AmmoUpgrade;
  bombBag: AmmoUpgrade;
  quiver: AmmoUpgrade;
  photoCount: number;
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

  preludeIcon: boolean;
  unknown1: boolean;
  unknown2: boolean;
  unknown3: boolean;
  unknown4: boolean;
  unknown5: boolean;

  lullabyIntro: boolean;

  bombersNotebook: boolean;

  heartPieceCount: number;
  heartPieces1: boolean;
  heartPieces2: boolean;
  heartPieces3: boolean;
  heartPieces4: boolean;
}

export interface ISaveContext {
  scene_flags: Buffer;
  inventory: IInventory;
  swords: ISwords;
  shields: IShields;
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
  owl_statues: number;
  map_visited: number;
  map_visible: number;
  bank: number;
  photo: IPhoto;

  day_time: number;
  day_night: number;
  time_speed: number;
  current_day: number;

  intro_flag: number;
  have_tatl: number;

  lottery_numbers_day1: Buffer;
  lottery_numbers_day2: Buffer;
  lottery_numbers_day3: Buffer;
  spider_house_mask_order: Buffer;
  bomber_code: Buffer;

  pictoboxUsed: boolean;

  permFlags: Buffer;
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
  rot: Buffer;
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
  photo: IPhoto;
  commandBuffer: ICommandBuffer;
  actorManager: IActorManager;
}

// Note: ON_ACTOR_SPAWN/ON_ACTOR_DESPAWN won't detect anything created by ICommandBuffer This is intentional behavior

export enum MMEvents {
  ON_SAVE_LOADED = 'onSaveLoaded',
  ON_SCENE_CHANGE = 'onSceneChange',
  ON_LOADING_ZONE = 'onLoadingZone',
  ON_ACTOR_SPAWN = 'onActorSpawn',
  ON_ACTOR_DESPAWN = 'onActorDespawn',
  ON_ROOM_CHANGE = 'onRoomChange',
  ON_ROOM_CHANGE_PRE = 'onPreRoomChange',
  ON_AGE_CHANGE = 'onAgeChange'
}

export interface IActorManager {
  // Returns IActor if the actor exists or undefined if the pointer doesn't lead to an actor
  createIActorFromPointer(pointer: number): IActor;
}

export const NO_KEYS = 0xFF;

export const enum VANILLA_KEY_INDEXES { //TODO: Figure this shit out
  WOODFALL_TEMPLE = 3,
  SNOWHEAD_TEMPLE = 4,
  GREAT_BAY_TEMPLE = 5,
  STONE_TOWER_TEMPLE = 6,
  SHADOW_TEMPLE = 7,
  BOTTOM_OF_THE_WELL = 8,
  GERUDO_TRAINING_GROUND = 11,
  GERUDO_FORTRESS = 12,
  GANONS_CASTLE = 13,
  TREASURE_CHEST_SHOP = 16
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

export enum Spider_House_Masks {
  RED,
  BLUE,
  YELLOW,
  GREEN,
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

export interface IOvlPayloadResult {
  file: string;
  slot: number;
  addr: number;
  params: number;
  buf: Buffer;
  relocate: number;

  spawn(obj: IOvlPayloadResult, callback?: (success: boolean, result: number) => {}): void;
}

