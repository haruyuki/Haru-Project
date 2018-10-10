function love.draw()
  love.graphics.print("Current FPS: "..tostring(love.timer.getFPS( )), 10, 10)
  love.graphics.setColor(RGB(255, 255, 255))
  love.graphics.draw(ship.image, player.x, player.y, 0 ,ship.scale.x, ship.scale.y, ship.image:getWidth() / 2, ship.image:getHeight() / 2)
  -- love.graphics.rectangle("fill", player.x, player.y, ship_width, ship_height)
  
  love.graphics.setColor(RGB(255, 0, 0))
  for _,e in pairs(enemies_controller.enemies) do
    love.graphics.rectangle("fill", e.x, e.y, 25, 30)
  end

  love.graphics.setColor(RGB(255, 255, 255))
  for _,b in pairs(player.bullets) do
    love.graphics.draw(ship.bullet, b.x - ship.bullet:getWidth() / 2, b.y - ship.bullet:getHeight() / 2 - 10)
  end
end