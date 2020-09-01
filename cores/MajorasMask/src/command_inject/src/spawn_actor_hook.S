.set    noreorder

/* jump to hook function */
move    $t8, $ra
la      $t9, spawn_actor_func
jalr    $t9
nop
