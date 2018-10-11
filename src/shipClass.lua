Ship = {}
Ship.__index = Ship

setmetatable(Ship, {
  __call = function (cls, ...)
    return cls.new(...)
  end,
})

function Ship.new(image, scale, speed, bullet)
  local self = setmetatable({}, Ship)
  self.image = love.graphics.newImage(image);
  self.scale = scale or {x = 1, y = 1}
  self.speed = speed or 3
  self.bullet = bullet or Bullet:new(nil)
  self.bullets = {}
  self.x = love.graphics.getWidth() / 2
  self.y = love.graphics.getHeight() - self.image:getHeight() - 10
  return self
end

function Ship:getDimensions()  -- Returns the width and height of the ship
   return {width = self.image:getWidth(), height = self.image:getHeight()}
end

function Ship:decreaseSpeed(speed)  -- Decrease ship speed
  if self.speed > 0 then
    self.speed = self.speed - speed
  end
end

function Ship:increaseSpeed(speed)  -- Increase ship speed
  if self.speed < 10 then
    self.speed = self.speed + speed
  end
end

function Ship:fire()  -- Function to fire bullets
  if self.bullet.cooldown <= 0 then
    self.bullet.cooldown = self.bullet.masterCooldown
    bullet = {
      x = self.x,
      y = self.y
    }
    table.insert(self.bullets, bullet)
  end
end
