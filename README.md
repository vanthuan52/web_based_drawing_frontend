Em cần phần hoàn thành gấp web vẽ đồ họa 2D/3D kiến trúc xây dựng mô phỏng các chức năng cơ bản của AutoCAD trên canvas viết bằng ReactJS (với Backend là Java Spring Boot theo format MVC (với Docker và RestAPI nếu được), hoặc NodeJS, và Database là PostgreSQL).


Hiện tại web bên em cần có các chức năng cơ bản:
1.	Vẽ đường thẳng, vẽ đa giác (polygon), vẽ hình tròn. Mỗi loại anh có thể vẽ dạng liền, dạng nứt, và cần edit được ạ.
2.	Chức năng thay đổi thuộc tính của đường thẳng/đa giác/hình tròn.
3.	Chức năng thêm văn bản vào bản vẽ.
4.	Có khả năng zoom nhỏ zoom to bản vẽ bằng cách lăn chuột (Bên anh/chị có thể tham khảo AutoCad).
5.	Chức năng import file DXF và DWG và hiện bản vẽ lên web từ những file đó (Cần hoạt động giống hệt như link này ạ: https://vagran.github.io/dxf-viewer-example/).
6.	Có khả năng edit được những element trong bản vẽ mà anh/chị import từ file. Bản vẽ anh import từ file DXF và DWG có thể chỉnh sửa được ạ.
7.	Có khả năng export bản vẽ từ canvas ra file PDF, DXF và DWG. 
8. 	Khi anh select một phần tử, phần tử đó sẽ đổi thành màu đỏ (rgb 255,0,0), và anh có thể ấn nút Delete trên bàn phím để xoá nó.
9. 	Mỗi lần vẽ sẽ auto save cái phần đó vào database.
10. Khả năng mở được 3,4 bản vẽ cùng lúc mà ko ảnh hưởng đến hiệu năng.
11. Khả năng add hình ảnh nhỏ (Icon) vào bản vẽ.

Hiện tại web bên bọn em đã viết bằng ReactJS với NodeJS là backend. Web hiện tại đã có phần lớn các chức năng bên trên, bọn em đang gặp lỗi sau khi import thì elements toàn render ra hình tròn.

Đây là link web hiện tại của bọn em: [https://dxf-editor.vercel.app/](https://dxf-editor-secondknifes-projects.vercel.app/)
Username: kid97yv, Password: 1
Đây là link video hướng dẫn cách dùng: https://drive.google.com/file/d/10ZiskWfCY60FJcyKL1Jzw-nbKyFWQcxT/view
Đây là source code hiện tại của bọn em: Thư mục DXFEditor
Đây là file PostgreSQL database của bọn em: db/Autocad.tar


Yêu cầu kĩ thuật:
1.	Tốc độ nhanh, hoạt động trơn tru.
2.	Không lỗi/Ít lỗi nhất có thể (Bên em biết cái này khó có thể lường trước được).
3.	Clean code.
4.	Tất cả cần phải viết bằng tiếng anh (codes, comments, …).
5.	Cần responsive cho mọi máy tính với bất kì độ phân giải nào (kể cả 800x600).
6.	Hiệu năng sẽ không bị ảnh hưởng kể cả có 100 người truy cập vào web của bọn em để vẽ drawing.
7.	Em cần luôn có access vào codebase và tự deploy 24/7.



Yêu cầu chức năng:

Phần I: 
Trước hết khi người dùng vừa bắt đầu truy cập vào website, 1 trang login cơ bản (username và password) để người dùng đăng nhập vào hệ thống sẽ xuất hiện:

![image alt](https://github.com/quangtorres/Web-based-Drawing/blob/b446e6de585cbbc158962c97a128c85f2eda0ef4/img/login-page.png)

Sau khi đăng nhập cái trang ở dưới sẽ xuất hiện:

![image alt](https://github.com/quangtorres/Web-based-Drawing/blob/bf23318feb436c7387a495b2d7ca0dfd622d138d/Designs/Canvas%201.jpg)



Bên tay trái là thanh công cụ, còn bên tay phải là bản vẽ ạ.

![image alt](https://github.com/quangtorres/Web-based-Drawing/blob/3299daa33266925b863f59f0cbc2dd1b9ab1f5af/img/drawing-tool-icon.PNG) Khi bấm vào nút này (Bên tay trái của thanh dropdown với dòng chữ Jefferson Elementary School) thì sẽ hiện lên cửa sổ như trong Drawings window.jpg.

Trong Drawings window.jpg:
-	Khi anh/chị highlight 1 cái drawing, rồi bấm nút Open bên tay phải trên cùng, drawing sẽ được mở ra như thế này:
![image alt](https://github.com/quangtorres/Web-based-Drawing/blob/3299daa33266925b863f59f0cbc2dd1b9ab1f5af/Designs/Canvas.jpg)
 

Khi bấm vào nút này sẽ Import file DXF/DWG vào bản vẽ. Những element import từ file có thể edit được.
  Khi bấm vào nút này sẽ Export những elements ở bản vẽ ra dưới dạng file DXF/DWG.
  Cái thanh dropdown bên tay trái nó sẽ có option đường thẳng (Lines), hình tròn (Circle), đa giác (polygon). Anh/chị chọn cái nào thì nó sẽ vẽ cái đấy. 
Nếu bấm vào nút màu xanh lá cây trên cùng phía tay phải ở trong Drawings window.jpg, bản vẽ sẽ được save vào database. Mỗi khi em mở lại web và mở drawing thì sẽ thấy phần đã saved của bản vẽ ạ.


Phần II: 

Khi bấm vào nút bên tay trái thanh dropdown “Floor Plan - Architectural” thí sẽ hiện lên cửa sổ như trong Maps window.jpg.
 	Khi bấm vào nút này (bên tay trái của hình máy ảnh), sẽ hiên lên cửa sổ như trong Symbols window.jpg
  Khi bấm vào hình này (bên trái của dropdown Walls – Blue Heavy Line), cửa sổ Attributes 
window.jpg sẽ hiện lên.

  Khi ấn vào hình này (bên trái của dropdown Walls), cửa sổ Layers window.jpg sẽ hiện lên.

  Khi bấm vào cái bút chì nó sẽ hiện lên cửa sổ như trong Drawing Tools window.jpg.



