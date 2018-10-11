require "library"
require "draw"
require "load"
require "enemyClass"
require "enemyControllerClass"
require "bulletClass"
require "shipClass"

function love.update(dt)
  if ship.bullet.cooldown > 0 then
    ship.bullet.cooldown = ship.bullet.cooldown - 1
  end

  if love.keyboard.isDown("up") then
    if ship.y >= 0 then
      if love.keyboard.isDown("lshift") then
        ship.y = ship.y - ship.speed / 2
      else
        ship.y = ship.y - ship.speed
      end
    end

  elseif love.keyboard.isDown("down") then
    if ship.y <= love.graphics.getHeight() then
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

  -- for _,e in pairs(enemies_controller.enemies) do
  --   e.y = e.y + 1.5
  -- end

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