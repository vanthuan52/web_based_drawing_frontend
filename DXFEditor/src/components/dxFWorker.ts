import { DxfParser } from 'dxf-parser';

self.onmessage = (event) => {
  const file = event.data;  

  if (file instanceof Blob) {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;
      const dxfParser = new DxfParser();

      try {
        const parsedData = dxfParser.parseSync(text);  
        self.postMessage({ success: true, data: parsedData });  
      } catch (error:any) {
        self.postMessage({ success: false, error: error.message }); 
      }
    };

    reader.onerror = (error:any) => {
      self.postMessage({ success: false, error: error.message });
    };

    reader.readAsText(file);  // Đọc file dưới dạng text
  } else {
    self.postMessage({ success: false, error: 'Invalid file type' });
  }
};



