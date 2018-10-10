function love.load()
  ship_width = 30
  ship_height = 40

  bullet = Bullet:new(nil, 'assets/weapons/red/laserRed01.png', {x = 1, y = 1}, 12)
  ship = Ship:new(nil, 'assets/ships/orange/ship2.png', {x = 0.45, y = 0.45}, 4.5, bullet)

  enemy = {
    x = 0,
    y = 0,
    bullets = {},
    cooldown = 0,
    speed = 1
  }
  -- enemies_controller:spawnEnemy(0, 0)
  -- enemies_controller:spawnEnemy(300, 0)
end