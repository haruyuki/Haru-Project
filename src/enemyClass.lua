Enemy = {}
Enemy.__index = Enemy

setmetatable(Enemy, {
  __call = function (cls, ...)
    return cls.new(...)
  end,
})

function Enemy.new(image, scale, speed, bullet)
  local self = setmetatable({}, Enemy)
  image = image or 'assets/enemies/default.png'
  self.image = love.graphics.newImage(image);
  self.scale = scale or {x = 1, y = 1}
  self.speed = speed or 3
  self.bullet = bullet or Bullet(nil)
  self.bullets = {}
  self.x = 0
  self.y = 0
  return self
end

function Enemy:getDimensions()  -- Returns the width and height of the Enemy
   return {width = self.image:getWidth(), height = self.image:getHeight()}
end

function Enemy:fire()  -- Function to fire bullets
  if self.bullet.cooldown <= 0 then
    self.bullet.cooldown = self.bullet.masterCooldown
    bullet = {
      x = self.x,
      y = self.y
    }
    table.insert(self.bullets, bullet)
  end
end
