enemy = {}
enemies_controller = {}
enemies_controller.enemies = {}

require("library")
require("draw")
require("load")
require("shipClass")

function enemies_controller:spawnEnemy(x, y)
  enemy = {
    x = x,
    y = y,
    bullets = {},
    cooldown = 20,
    speed = 10
  }
  table.insert(self.enemies, enemy)
end

function enemy:fire()
  if self.cooldown <= 0 then
    self.cooldown = 20
    bullet = {
      x = self.x + 35,
      y = self.y
    }
    table.insert(self.bullets, bullet)
  end
end

function love.update(dt)
  player.cooldown = player.cooldown - 1

  if love.keyboard.isDown("up") then
    if player.y >= 0 then
      if love.keyboard.isDown("lshift") then
        player.y = player.y - ship.speed / 2
      else
        player.y = player.y - ship.speed
      end
    end

  elseif love.keyboard.isDown("down") then
    if player.y <= love.graphics.getHeight() - ship_height then
      if love.keyboard.isDown("lshift") then
        player.y = player.y + ship.speed / 2
      else
        player.y = player.y + ship.speed
      end
    end
  end

  if love.keyboard.isDown("right") then
    if player.x <= love.graphics.getWidth() - ship_width then
      if love.keyboard.isDown("lshift") then
        player.x = player.x + ship.speed / 2
      else
        player.x = player.x + ship.speed
      end
    end

  elseif love.keyboard.isDown("left") then
    if player.x >= 0 then
      if love.keyboard.isDown("lshift") then
        player.x = player.x - ship.speed / 2
      else
        player.x = player.x - ship.speed
      end
    end
  end

  if love.keyboard.isDown("z") then
    player.fire()
  end

  for _,e in pairs(enemies_controller.enemies) do
    e.y = e.y + 1.5
  end

  for i,b in ipairs(player.bullets) do
    if b.y < - 10 then
      table.remove(player.bullets, i)
    end
    b.y = b.y - 12
  end
end

function love.quit()
  print("Thanks for playing!")
end