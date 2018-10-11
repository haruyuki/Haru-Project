EnemyController = {}
EnemyController.__index = EnemyController

setmetatable(EnemyController, {
  __call = function (cls, ...)
    return cls.new(...)
  end,
})

function EnemyController.new(image, scale, speed, bullet)
  local self = setmetatable({}, EnemyController)
  return self
end

function EnemyController:spawnEnemy(image, scale, speed, bullet)
	return Ship(image, scale, speed, bullet)
end

function EnemyController:getDimensions()  -- Returns the width and height of the enemy
   return {width = self.image:getWidth(), height = self.image:getHeight()}
end

function EnemyController:fire()  -- Function to fire bullets
  if self.bullet.cooldown <= 0 then
    self.bullet.cooldown = self.bullet.masterCooldown
    bullet = {
      x = self.x,
      y = self.y
    }
    table.insert(self.bullets, bullet)
  end
end
