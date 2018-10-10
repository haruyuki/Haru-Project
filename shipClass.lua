-- Meta class
Ship = {}

-- Base class method new

function Ship:new (o, x, y, image, scale, speed, bullet)
   o = o or {}
   setmetatable(o, self)
   self.__index = self
   x = x or 0
   y = y or 0
   image = image or ''
   scale = scale or {x = 1, y = 1}
   speed = speed or 3
   bullet = bullet or ''
   self.image = love.graphics.newImage(image);
   self.scale = scale
   self.speed = speed
   self.bullet = love.graphics.newImage(bullet)
   return o
end

-- Base class method printArea

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
