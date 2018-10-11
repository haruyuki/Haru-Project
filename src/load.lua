function love.load()
  ship_width = 30
  ship_height = 40

  bullet = Bullet('assets/weapons/red/laserRed01.png', {x = 1, y = 1}, 12, 8)
  ship = Ship('assets/ships/orange/ship2.png', {x = 0.45, y = 0.45}, 4.5, bullet)
  -- enemyController = EnemyController:new(nil)


  bg = love.graphics.newImage("assets/backgrounds/blue.png")
  bg:setWrap("repeat", "repeat")
  bg_quad = love.graphics.newQuad(0, 0, love.graphics.getWidth(), love.graphics.getHeight(), bg:getWidth(), bg:getHeight())


  -- enemyBullet = Bullet:new(nil, 'assets/weapons/green/laserGreen11.png', {x = 1, y = 1}, 12, 8)
  -- enemy = enemyController:createEnemy(nil, 'assets/enemies/enemyBlack1.png', {x = 1, y = 1}, 1.5, enemyBullet)
  -- enemies_controller:spawnEnemy(0, 0)
  -- enemies_controller:spawnEnemy(300, 0)
end