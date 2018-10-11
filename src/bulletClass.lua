Bullet = {}
Bullet.__index = Bullet

setmetatable(Bullet, {
  __call = function (cls, ...)
    return cls.new(...)
  end,
})

function Bullet.new(image, scale, speed, cooldown)
  local self = setmetatable({}, Bullet)
  image = image or 'assets/weapons/default.png'
  self.image = love.graphics.newImage(image)
  self.scale = scale or {x = 1, y = 1}
  self.speed = speed or 3
  self.masterCooldown = cooldown or 20
  self.cooldown = cooldown or 20
  return self
end

function Bullet:getDimensions()  -- Returns the width and height of the bullet
   return {width = self.image:getWidth(), height = self.image:getHeight()}
end

function Bullet:decreaseSpeed(speed)  -- Decrease bullet speed
  if self.speed > 0 then
    self.speed = self.speed - speed
  end
end

function Bullet:increaseSpeed(speed)  -- Increase bullet speed
  if self.speed < 10 then
    self.speed = self.speed + speed
  end
end
