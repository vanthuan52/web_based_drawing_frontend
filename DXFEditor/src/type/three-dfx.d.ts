declare module 'three-dxf' {
    import * as THREE from 'three';
  
    export interface ViewerOptions {
      container?: HTMLDivElement;
      width?: number;
      height?: number;
    }
  
    export class Viewer {
      constructor(data: string, container: HTMLDivElement, three: typeof THREE, options?: ViewerOptions);
      render(scene: THREE.Scene, camera: THREE.Camera): void;
      resize(width: number, height: number): void;
    }
  }
  