function love.draw()
  love.graphics.print("Current FPS: "..tostring(love.timer.getFPS( )), 10, 10)
  love.graphics.setColor(RGB(255, 255, 255))
  love.graphics.draw(ship.image, ship.x, ship.y, 0 ,ship.scale.x, ship.scale.y, ship.image:getWidth() / 2, ship.image:getHeight() / 2)
  
  love.graphics.setColor(RGB(255, 0, 0))
  for _,e in pairs(enemies_controller.enemies) do
    love.graphics.rectangle("fill", e.x, e.y, 25, 30)
  end

  love.graphics.setColor(RGB(255, 255, 255))
  for _,b in pairs(ship.bullets) do
    love.graphics.draw(ship.bullet.image, b.x - ship.bullet:getDimensions().width / 2, b.y - ship.bullet:getDimensions().height / 2 - 10)
  end
end