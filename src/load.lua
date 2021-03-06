function love.load()
  music = love.audio.newSource('assets/music/background.mp3', 'stream')
  music:setLooping(true)
  love.audio.play(music)

  cursor = love.graphics.newImage("assets/ui/cursor.png")
  love.mouse.setVisible(false)

  game_over = false
  game_win = false

  bullet = Bullet('assets/weapons/red/laserRed01.png', {x = 1, y = 1}, 12, 15)
  ship = Ship('assets/ships/ship2/orange.png', {x = 0.45, y = 0.45}, 4.5, bullet)
  enemyBullet = Bullet('assets/weapons/green/laserGreen11.png', {x = 1, y = 1}, 12, 8)
  enemyController = EnemyController(10)

  bg = love.graphics.newImage("assets/backgrounds/blue.png")
  bg:setWrap("repeat", "repeat")
  bg_quad = love.graphics.newQuad(0, 0, love.graphics.getWidth(), love.graphics.getHeight(), bg:getWidth(), bg:getHeight())

  light_bg = love.graphics.newImage("assets/backgrounds/purple.png")
  light_bg:setWrap("repeat", "repeat")
  light_bg_quad = love.graphics.newQuad(0, 0, love.graphics.getWidth(), love.graphics.getHeight(), light_bg:getWidth(), light_bg:getHeight())

  dark_bg = love.graphics.newImage("assets/backgrounds/black.png")
  bg:setWrap("repeat", "repeat")
  dark_bg_quad = love.graphics.newQuad(0, 0, love.graphics.getWidth(), love.graphics.getHeight(), dark_bg:getWidth(), dark_bg:getHeight())
end