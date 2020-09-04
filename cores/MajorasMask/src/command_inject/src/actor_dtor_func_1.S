/* save and update notification context */
la      $t0, notif_ctxt
lw      $t1, 0x0000($t0)
sw      $a0, 0x0000($t0)
sw      $t1, -0x0008($sp) /* 0x0010($sp) in hooked function frame (unused) */

/* continue hooked function */
move    $t9, $ra
move    $ra, $t8
addiu   $sp, $sp, -0x0018 /* } */
sw      $ra, 0x0014($sp)  /* } */
lw      $t6, 0x0130($a0)  /* } copy of overwritten function prologue */
jr      $t9
