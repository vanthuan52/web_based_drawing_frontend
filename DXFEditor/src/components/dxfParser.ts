self.onmessage = function (e) {
    const { entities, scale, offsetX, offsetY } = e.data;
  
    const result = entities.map((entity:any) => {
      if (entity.type === "LINE" && entity.vertices) {
        const x1 = entity.vertices[0].x * scale + offsetX;
        const y1 = entity.vertices[0].y * scale + offsetY;
        const x2 = entity.vertices[1].x * scale + offsetX;
        const y2 = entity.vertices[1].y * scale + offsetY;
        return { x1, y1, x2, y2 };
      }
      return null;
    }).filter(Boolean);
  
    self.postMessage(result); // Gửi kết quả về UI chính
  };