function love.load()
  ship_width = 30
  ship_height = 40

  ship = Ship:new(nil, 0, 0, 'assets/ships/orange/ship2.png', {x = 0.45, y = 0.45}, 4.5, 'assets/weapons/red/laserRed01.png')

  player = {
    x = (love.graphics.getWidth() - ship_width) / 2,
    y = love.graphics.getHeight() - 20 - ship_height,
    speed = 4.5,
    cooldown = 0,
    bullets = {},
    fire = function()
      if player.cooldown <= 0 then
        player.cooldown = 8
        bullet = {
          x = player.x,
          y = player.y
        }
        table.insert(player.bullets, bullet)
      end
    end
  }

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