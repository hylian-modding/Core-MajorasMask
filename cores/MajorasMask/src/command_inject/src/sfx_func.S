.set    noreorder

/* compare source actor against player actor */
la      $t0, z64_ctxt
lw      $t0, 0x1CCC($t0) /* z64_game.actor_list[2].first (player) */
bne     $t0, $a0, 1f
lui     $t0, 0x8080
/* compare sfx id against voice bank */
andi    $t1, $a1, 0xFF00
ori     $t2, $zero, 0x6800
bnel    $t2, $t1, 0f
ori     $t2, $zero, 0x1800
/* voice bank; store id to 0x80800088 if not occupied */
lhu     $t1, 0x0088($t0)
beql    $zero, $t1, 1f
sh      $a1, 0x0088($t0)
beq     $zero, $zero, 1f
nop
0:
/* not voice bank; compare against item bank */
bne     $t2, $t1, 1f
lhu     $t1, 0x008A($t0)
/* item bank; store id to 0x8080008A if not occupied */
beql    $zero, $t1, 1f
sh      $a1, 0x008A($t0)
1:
jr      $ra
move    $t6, $a0
