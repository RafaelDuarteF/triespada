import { useEffect, useRef, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';
import styles from './ModelViewer.module.css';

function Model({ url, onLoad }) {
  const { scene, materials } = useGLTF(url);
  
  useEffect(() => {
    if (scene) {
      onLoad();
    }
  }, [scene, onLoad]);

  // Ajusta os materiais e texturas se necessário
  scene.traverse((child) => {
    if (child.isMesh) {
      if (child.material.map) {
        // Se o modelo possui uma textura, podemos ajustar as configurações dela
        child.material.map.encoding = THREE.sRGBEncoding;
        child.material.map.needsUpdate = true;
      }

      // Melhorar o material (pode ser ajustado conforme a necessidade)
      child.material = new THREE.MeshStandardMaterial({
        color: child.material.color || 0xffffff,
        map: child.material.map,
        metalness: 0.5,
        roughness: 0.5,
      });

      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={scene} />;
}

function LoadingScreen() {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        <div className={styles.sword}>⚔️</div>
        <div className={styles.loadingText}>Carregando sua espada lendária...</div>
        <div className={styles.loadingBar}>
          <div className={styles.loadingProgress}></div>
        </div>
      </div>
    </div>
  );
}

export default function ModelViewer({ modelPath = '/model/triespada.glb' }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleModelLoad = () => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.modelViewer}>
      <Canvas
        camera={{ position: [90, 45, 5], fov: 45 }}
        shadows
        onCreated={(state) => state.gl.setClearColor(0xffffff)}
      >
        <Suspense fallback={null}>
          {/* Iluminação */}
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

          {/* Stage - Melhora a iluminação global */}
          <Stage environment="city" intensity={0.6}>
            <Model url={modelPath} onLoad={handleModelLoad} />
          </Stage>

          {/* Controles de câmera */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Suspense>
      </Canvas>
      {isLoading && <LoadingScreen />}
    </div>
  );
}
