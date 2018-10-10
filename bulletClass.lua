-- Meta class
Bullet = {}

-- Base class method new

function Bullet:new (o, image, scale, speed, cooldown)
   o = o or {}
   setmetatable(o, self)
   self.__index = self
   image = image or ''
   scale = scale or {x = 1, y = 1}
   speed = speed or 3
   cooldown = cooldown or 10
   self.image = love.graphics.newImage(image);
   self.scale = scale
   self.speed = speed
   self.masterCooldown = cooldown
   self.cooldown = cooldown
   return o
end

-- Base class method printArea

function Bullet:increaseSpeed ()
   print("Speed increased from "..self.speed)
end

function Bullet:getDimensions ()
   return {width = self.image:getWidth(), height = self.image:getHeight()}
end