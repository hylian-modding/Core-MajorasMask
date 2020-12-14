export class MMOffsets {
    link_instance: number = 0x803FFDB0;
    link_state: number = 0xA6C;
    current_scene: number = 0x803e6bc4;
    scene_framecount: number = 0x803FF360;
    checksum: number = 0x801EF694;
    paused: number = 0x801D1500;
    interface_shown: number = 0x803FD77B;
    save_context: number = 0x801EF670;
    mask_offset: number = 0x0020;
    anim: number = 0x400500;

    continue_state_addr: number = 0x0; //TODO: Find for MM

    sword_addr: number = 0x801EF6DD;
    shield_addr: number = 0x801EF6DD;
    
    current_room_addr: number = 0x803FF20C;

    global_context_pointer: number = 0x801F9C60;

    overlay_table: number = 0x801AEFD0;
    gui_isShown: number = 0x803FD77B;
    //Save Context

    intro_flag: number = 0x801EF675; //0x1
    have_tatl: number = 0x801EF692; //0x1
    /*
    0x0000 = 12:00 AM
    0x1000 = 01:30 AM
    0x2000 = 03:00 AM
    0x3000 = 04:30 AM
    0x4000 = 06:00 AM
    0x402D = Dawn of Day
    0x5000 = 07:30 AM
    0x6000 = 09:00 AM
    0x7000 = 10:30 AM
    0x8000 = 12:00 PM
    0x9000 = 01:30 PM
    0xA000 = 03:00 PM
    0xB000 = 04:30 PM
    0xC000 = 06:00 PM
    0xD000 = 07:30 PM
    0xE000 = 09:00 PM
    0xF000 = 10:30 PM
    0xFFFF = 11:59 PM
    */
    day_time: number = 0x801EF67C; //0x2 
    day_night: number = 0x801EF680; //0x4 // set to 0 during day, 1 at night
    time_speed: number = 0x801EF684; //0x4 // normally 1 when inverted song of time and 3 at normal speed; rando can change this
    current_day: number = 0x801EF688; //0x4 //0 to 4. modulo 5?

    current_transformation: number = 0x801EF690; //0x1 //from 0: fierce deity, goron, zora, deku, human

    pictograph_photo_addr: number = 0x801F0750; //0x2BC0
    pictograph_spec: number = 0x801F04EA; //0x1
    pictograph_quality: number = 0x801F04EB; //0x1
    pictograph_unk: number = 0x801F04EC; //0x1

    map_visited: number = 0x801F05CC; //0x4
    map_visible: number = 0x801F05D0; //0x4
    minimap_flags: number = 0x801F0514; //0xE

    max_heart_flag: number = 0x801EF6A4; //0x2
    hearts: number = 0x801EF6A6; //0x2
    health_mod: number = 0x801F35CA; //0x1
    magic: number = 0x801EF6A9; //0x1
    rupees: number = 0x801EF6AA; //0x2

    magic_meter_size_addr: number = 0x801EF6A8;
    magic_current_addr: number = 0x801F35A0;
    magic_limit_addr: number = 0x801F359E;
    magic_flag_1_addr: number = 0x801EF6B0;
    magic_flag_2_addr: number = 0x801EF6B1;

    deku_b_addr: number = 0x801EF6C8;

    razor_hits: number = 0x801EF6AC; // 0x2

    owl_statues: number = 0x801EF6B6; //0x2
    sword_equip: number = 0x801EF6BC; // 0x1
    tunic_boots: number = 0x801EF6DC; //0x1
    sword_sheild: number = 0x801EF6DD;
    inventory: number = 0x801EF6E0; //0x18
    masks: number = 0x801EF6F8; //0x18
    item_amts: number = 0x801EF710; //0x18
    upgrades: number = 0x801EF728; //0x4
    
    //quest items
    questflg1: number = 0x801EF72C; //0x1 bit 0: Lullaby Intro; bits 4-7: heart pieces
    questflg2: number = 0x801EF72D; //0x1 bits 0-1: songs; bit 2: Bomber's Notebook; bit 3: unknown
    questflg3: number = 0x801EF72E; //0x1 bits 0-7: songs
    questflg4: number = 0x801EF72F; //0x1 bits 0-3: Remains; bits 6-7: songs

    woodfall_item: number = 0x801EF730; //0x1 bitfield
    snowhead_item: number = 0x801EF731; //0x1 bitfield
    bay_item: number = 0x801EF732; //0x1 bitfield
    stone_item: number = 0x801EF733; //0x1 bitfield

    double_defense: number = 0x801EF743; //0x1
    scene_flags = 0x801EF768; //0xD20 dig chest flags out of here
    bank_rupees = 0x801F054E; //0x2

    event_flg: number = 0x801F0568;
    event_inf: number = 0x801F067C;

    switch_flags_addr = 0x803E8978; //Might be wrong
    temp_switch_flags_addr = 0x803E8988; //Wrong
    chest_flags_addr = 0x803E8988;
    room_clear_flags_addr = 0x803E8994; //Wrong
    collectable_flag_addr = 0x803E8994;

    woodfall_fairies = 0x801EF744; //0x1
    snowhead_fairies = 0x801EF745; //0x1
    bay_fairies = 0x801EF746; //0x1
    stone_fairies = 0x801EF747; //0x1

    swamp_skulltula = 0x801F0530; //0x2
    bay_skulltula = 0x801F0532; //0x2
    
    //misc
    mask_object_vram = 0x80402B50;
    mask_props = 0x801F58B0;

    lottery_numbers_day1 = 0x801F065C; //0x3
    lottery_numbers_day2 = 0x801F065F; //0x3
    lottery_numbers_day3 = 0x801F0662; //0x3
    spider_house_mask_order = 0x801F0665; //0x6
    bomber_code = 0x801F066B; //0x5

    permFlags = 0x801F35D8; // 0x960
}
