rect_width = 100
rect_height = 100
rect_x = (love.graphics.getWidth() - rect_width) / 2
rect_y = (love.graphics.getHeight() - rect_height) / 2

function love.load()
  rect = {
    width = rect_width,
    height = rect_height,
    x = rect_x,
    y = rect_y,
    dragging = { active = false, diffX = 0, diffY = 0 }
  }
end

function love.update(dt)
  if rect.dragging.active then
    rect.x = love.mouse.getX() - rect.dragging.diffX
    rect.y = love.mouse.getY() - rect.dragging.diffY
  end
end

function love.draw()
  love.graphics.rectangle("fill", rect.x, rect.y, rect.width, rect.height)
end

function love.mousepressed(x, y, button, istouch)
  if button == 1
  and x > rect.x and x < rect.x + rect.width
  and y > rect.y and y < rect.y + rect.height
  then
    rect.dragging.active = true
    rect.dragging.diffX = x - rect.x
    rect.dragging.diffY = y - rect.y
  end
end

function love.mousereleased(x, y, button, istouch)
  if button == 1 then rect.dragging.active = false end
end
