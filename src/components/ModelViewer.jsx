import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }) {
  const { scene, materials } = useGLTF(url);

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

export default function ModelViewer({ modelPath = '/model/triespada.glb' }) {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [90, 45, 5], fov: 45 }}
        shadows
        onCreated={(state) => state.gl.setClearColor(0xffffff)}
      >
        {/* Iluminação */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        {/* Stage - Melhora a iluminação global */}
        <Stage environment="city" intensity={0.6}>
          <Model url={modelPath} />
        </Stage>

        {/* Controles de câmera */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}
