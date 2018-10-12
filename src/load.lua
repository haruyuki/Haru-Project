function love.load()
  cursor = love.graphics.newImage("assets/ui/cursor.png")
  love.mouse.setVisible(false)

  game_over = false

  bullet = Bullet('assets/weapons/red/laserRed01.png', {x = 1, y = 1}, 12, 8)
  ship = Ship('assets/ships/ship2/orange.png', {x = 0.45, y = 0.45}, 4.5, bullet)
  enemyBullet = Bullet('assets/weapons/green/laserGreen11.png', {x = 1, y = 1}, 12, 8)
  enemyController = EnemyController()

  bg = love.graphics.newImage("assets/backgrounds/blue.png")
  bg:setWrap("repeat", "repeat")
  bg_quad = love.graphics.newQuad(0, 0, love.graphics.getWidth(), love.graphics.getHeight(), bg:getWidth(), bg:getHeight())

  dark_bg = love.graphics.newImage("assets/backgrounds/black.png")
  bg:setWrap("repeat", "repeat")
  dark_bg_quad = love.graphics.newQuad(0, 0, love.graphics.getWidth(), love.graphics.getHeight(), dark_bg:getWidth(), dark_bg:getHeight())

  for i=0, 10 do
    enemyController:spawnEnemy(i * 45, 0, 'assets/enemies/default/black.png', {x = 0.45, y = 0.45}, 1.5)
  end
end