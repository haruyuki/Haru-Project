-- Meta class
Ship = {}

-- Base class method new

function Ship:new (o, image, scale, speed, bullet)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  image = image or ''
  scale = scale or {x = 1, y = 1}
  speed = speed or 3
  bullet = bullet or Bullet:new(nil)
  self.image = love.graphics.newImage(image);
  self.scale = scale
  self.speed = speed
  self.bullet = bullet
  self.bullets = {}
  self.x = love.graphics.getWidth() / 2
  self.y = love.graphics.getHeight() - self.image:getHeight() - 10
  return o
end

-- Base class method printArea

function Ship:getDimensions ()
   return {width = self.image:getWidth(), height = self.image:getHeight()}
end

function Ship:decreaseSpeed (speed)
  if self.speed > 0 then
    self.speed = self.speed - speed
  end
end

function Ship:increaseSpeed (speed)
  if self.speed < 10 then
    self.speed = self.speed + speed
  end
end

function Ship:fire ()
  cooldown = self.bullet.cooldown
  if self.bullet.cooldown <= 0 then
    self.bullet.cooldown = 8
    bullet = {
      x = self.x,
      y = self.y
    }
    table.insert(self.bullets, bullet)
  end
end
