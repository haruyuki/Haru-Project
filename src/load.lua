function love.load()
  ship_width = 30
  ship_height = 40

  bullet = Bullet('assets/weapons/red/laserRed01.png', {x = 1, y = 1}, 12, 8)
  ship = Ship('assets/ships/ship2/orange.png', {x = 0.45, y = 0.45}, 4.5, bullet)
  enemyBullet = Bullet('assets/weapons/green/laserGreen11.png', {x = 1, y = 1}, 12, 8)
  enemyController = EnemyController()
  enemy = enemyController:createEnemy('assets/enemies/default/black.png', {x = 0.45, y = 0.45}, 1.5)
  enemy2 = enemyController:createEnemy('assets/enemies/default/black.png', {x = 0.45, y = 0.45}, 1.5)

  bg = love.graphics.newImage("assets/backgrounds/blue.png")
  bg:setWrap("repeat", "repeat")
  bg_quad = love.graphics.newQuad(0, 0, love.graphics.getWidth(), love.graphics.getHeight(), bg:getWidth(), bg:getHeight())

  enemyController:spawnEnemy(enemy, 300, 0)
  enemyController:spawnEnemy(enemy2, 0, 0)
end