-- Meta class
Bullet = {}

-- Base class method new

function Bullet:new (o, image, scale, speed)
   o = o or {}
   setmetatable(o, self)
   self.__index = self
   image = image or ''
   scale = scale or {x = 1, y = 1}
   speed = speed or 3
   self.image = love.graphics.newImage(image);
   self.scale = scale
   self.speed = speed
   return o
end

-- Base class method printArea

function Bullet:increaseSpeed ()
   print("Speed increased from "..self.speed)
end