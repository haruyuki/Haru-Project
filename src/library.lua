function RGB(r, g, b, a)
  r = r / 255
  g = g / 255
  b = b / 255
  return r, g, b, a
end

function checkCollisions(enemies, bullets)
  for i,e in ipairs(enemies) do
    for _,b in pairs(bullets) do
      if b.y <= e.y + (e.image:getHeight() * e.scale.y) and b.y >= e.y and b.x >= e.x and b.x <= e.x + (e.image:getWidth() * e.scale.x) then
      	table.remove(enemies, i)
        enemyController.killed = enemyController.killed + 1
      end
    end
  end
end