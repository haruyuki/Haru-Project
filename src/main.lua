require "library"
require "draw"
require "load"
require "classes/Enemy"
require "classes/enemyController"
require "classes/Bullet"
require "classes/Ship"

function love.update(dt)
  checkCollisions(enemyController.enemies, ship.bullets)
  if ship.bullet.cooldown > 0 then
    ship.bullet.cooldown = ship.bullet.cooldown - 1
  end

  if love.keyboard.isDown("up") then
    if ship.y >= ship.image:getHeight() * ship.scale.y then
      if love.keyboard.isDown("lshift") then
        ship.y = ship.y - ship.speed / 2
      else
        ship.y = ship.y - ship.speed
      end
    end

  elseif love.keyboard.isDown("down") then
    if ship.y <= love.graphics.getHeight() - ship.image:getHeight() * ship.scale.y then
      if love.keyboard.isDown("lshift") then
        ship.y = ship.y + ship.speed / 2
      else
        ship.y = ship.y + ship.speed
      end
    end
  end

  if love.keyboard.isDown("right") then
    if ship.x <= love.graphics.getWidth() then
      if love.keyboard.isDown("lshift") then
        ship.x = ship.x + ship.speed / 2
      else
        ship.x = ship.x + ship.speed
      end
    end

  elseif love.keyboard.isDown("left") then
    if ship.x >= 0 then
      if love.keyboard.isDown("lshift") then
        ship.x = ship.x - ship.speed / 2
      else
        ship.x = ship.x - ship.speed
      end
    end
  end

  if love.keyboard.isDown("z") then
    ship:fire()
  end


  if not game_win or not game_over then
    enemyController.cooldown = enemyController.cooldown - 1
    if enemyController.cooldown < 0 then
      enemyController.cooldown = enemyController.masterCooldown
      random = math.random(10, love.graphics.getWidth() - 10)
      enemyController:spawnEnemy(random, -50, 'assets/enemies/default/black.png', {x = 0.45, y = 0.45}, 1.5)
    end
  end

  if enemyController.killed > 10 then
    for k,v in pairs(enemyController.enemies) do enemyController.enemies[k]=nil end
    game_win = true
  end


  for i,e in ipairs(enemyController.enemies) do
    if e.y > love.graphics.getHeight() + 10 then
      -- table.remove(enemyController.enemies, i)
      for k,v in pairs(enemyController.enemies) do enemyController.enemies[k]=nil end
      game_over = true
    end
    e.y = e.y + e.speed
  end

  for i,b in ipairs(ship.bullets) do
    if b.y < - 10 then
      table.remove(ship.bullets, i)
    end
    b.y = b.y - ship.bullet.speed
  end
end

function love.quit()
  print("Thanks for playing!")
end