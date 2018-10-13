EnemyController = {}
EnemyController.__index = EnemyController

setmetatable(EnemyController, {
  __call = function (cls, ...)
    return cls.new(...)
  end,
})

function EnemyController.new(cooldown)
  local self = setmetatable({}, EnemyController)
  self.masterCooldown = cooldown
  self.cooldown = cooldown
  self.killed = 0
  self.enemies = {}
  return self
end

function EnemyController:spawnEnemy(x, y, image, scale, speed, bullet)
  enemy = Enemy(image, scale, speed, bullet)
	enemy.x = x
	enemy.y = y
	table.insert(self.enemies, enemy)
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
