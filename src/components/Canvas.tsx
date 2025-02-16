// import React, {useEffect, useRef} from 'react';
// import {fabric} from 'fabric';
// import {useDispatch, useSelector} from 'react-redux';
// import {addObject, removeObject, setCanvas} from '@/redux/slice/drawingSlice';
// import {RootState} from '@/redux/store';

// const Canvas: React.FC = () => {
//   const canvasRef = useRef<fabric.Canvas | null>(null);
//   const dispatch = useDispatch();
//   const objects = useSelector((state: RootState) => state.canvas.objects);

//   useEffect(() => {
//     const canvas = new fabric.Canvas('canvas', {
//       width: window.innerWidth - 250,
//       height: window.innerHeight - 50,
//       backgroundColor: '#fff',
//     });

//     canvasRef.current = canvas;
//     dispatch(setCanvas(canvas));

//     canvas.on('object:added', (event) => {
//       if (event.target) {
//         dispatch(addObject(event.target));
//       }
//     });

//     canvas.on('object:removed', (event) => {
//       if (event.target) {
//         dispatch(removeObject(event.target));
//       }
//     });

//     return () => {
//       canvas.dispose();
//     };
//   }, [dispatch]);

//   return <canvas id="canvas" />;
// };

// export default Canvas;
