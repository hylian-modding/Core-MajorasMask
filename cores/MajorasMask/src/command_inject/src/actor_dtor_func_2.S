/* restore notification context */
la      $t0, notif_ctxt
lw      $t1, 0x0010($sp)
sw      $t1, 0x0000($t0)

/* return from hooked function */
addiu   $sp, $sp, 0x0018  /* } */
jr      $ra               /* } copy of overwritten function epilogue */
