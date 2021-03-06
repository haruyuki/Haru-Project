function love.draw()
  love.graphics.draw(bg, bg_quad, 0, 0)
  love.graphics.print("Current FPS: "..tostring(love.timer.getFPS( )), 10, 10)

  if game_over then
    love.audio.stop()
    love.graphics.draw(dark_bg, dark_bg_quad, 0, 0)
    love.graphics.print("Game Over!", love.graphics.getWidth() / 2, love.graphics.getHeight() / 2)
  elseif game_win then
    love.audio.stop()
    love.graphics.draw(light_bg, light_bg_quad, 0, 0)
    love.graphics.print("You win!", love.graphics.getWidth() / 2, love.graphics.getHeight() / 2)
  end

  love.graphics.setColor(RGB(255, 255, 255))
  love.graphics.draw(ship.image, ship.x, ship.y, 0 ,ship.scale.x, ship.scale.y, ship.image:getWidth() / 2, ship.image:getHeight() / 2)
  
  for _,e in pairs(enemyController.enemies) do
    love.graphics.draw(e.image, e.x, e.y, 0, e.scale.x, e.scale.y)
  end

  love.graphics.setColor(RGB(255, 255, 255))
  for _,b in pairs(ship.bullets) do
    love.graphics.draw(ship.bullet.image, b.x - ship.bullet:getDimensions().width / 2, b.y - ship.bullet:getDimensions().height / 2 - 10)
  end

  love.graphics.draw(cursor, love.mouse.getX() - cursor:getWidth() / 2, love.mouse.getY() - cursor:getHeight() / 2)
end