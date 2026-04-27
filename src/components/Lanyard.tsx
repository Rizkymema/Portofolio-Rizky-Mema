/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, RapierRigidBody } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

const cardGLB = '/assets/Lanyard/card.glb';
const lanyard = '/assets/Lanyard/lanyard.png';

export default function Lanyard({ 
  position = [0, 0, 20], 
  gravity = [0, -40, 0], 
  fov = 20, 
  transparent = true 
}: { 
  position?: [number, number, number], 
  gravity?: [number, number, number], 
  fov?: number, 
  transparent?: boolean 
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-full flex justify-center items-center z-50 overflow-visible">
      <Canvas
        style={{ overflow: 'visible' }}
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const { size } = useThree();
  const band = useRef<THREE.Mesh>(null),
    fixed = useRef<RapierRigidBody>(null),
    j1 = useRef<RapierRigidBody>(null),
    j2 = useRef<RapierRigidBody>(null),
    j3 = useRef<RapierRigidBody>(null),
    card = useRef<RapierRigidBody>(null);
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyard);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1] as any);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1] as any);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1] as any);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ] as any);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    } else if (card.current) {
      // Auto idle sway
      const t = state.clock.getElapsedTime();
      // Apply very subtle continuous forces to simulate wind/idle floating
      card.current.applyImpulse({ x: Math.sin(t) * 0.005, y: 0, z: Math.cos(t) * 0.005 }, true);
    }
    
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      let isReady = true;
      const joints = [j1, j2];
      
      for (const ref of joints) {
        const trans = ref.current?.translation();
        if (!trans || isNaN(trans.x) || isNaN(trans.y) || isNaN(trans.z)) {
          isReady = false;
          break;
        }
        
        const anyRef = ref.current as any;
        if (!anyRef.lerped) anyRef.lerped = new THREE.Vector3().copy(trans as any);
        if (isNaN(anyRef.lerped.x)) anyRef.lerped.copy(trans as any);
        
        const clampedDistance = Math.max(0.1, Math.min(1, anyRef.lerped.distanceTo(trans as any)));
        const alpha = Math.min(1, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
        anyRef.lerped.lerp(trans as any, alpha);
      }
      
      const t3 = j3.current?.translation();
      const t0 = fixed.current?.translation();
      
      if (!t3 || isNaN(t3.x) || !t0 || isNaN(t0.x)) isReady = false;
      
      if (isReady) {
        curve.points[0].copy(t3 as any);
        curve.points[1].copy((j2.current as any).lerped);
        curve.points[2].copy((j1.current as any).lerped);
        curve.points[3].copy(t0 as any);
        
        const pts = curve.getPoints(isMobile ? 16 : 32);
        
        let validCurve = true;
        let curveLength = 0;
        
        for (let i = 0; i < pts.length; i++) {
          if (isNaN(pts[i].x) || isNaN(pts[i].y) || isNaN(pts[i].z)) {
            validCurve = false;
            break;
          }
          if (i > 0) {
            curveLength += pts[i].distanceTo(pts[i - 1]);
          }
        }
        
        // MeshLine will throw NaN inside computeBoundingSphere if curve length is ~0
        if (validCurve && curveLength > 0.001) {
          try {
            (band.current as any).geometry.setPoints(pts);
          } catch (err) {
            // Ignore internal MeshLine errors
          }
        }
      }
      
      const cardAngvel = card.current?.angvel();
      const cardRot = card.current?.rotation();
      if (cardAngvel && cardRot && !isNaN(cardAngvel.x) && !isNaN(cardRot.y)) {
        ang.copy(cardAngvel as any);
        rot.copy(cardRot as any);
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
      }
    }
  });

  (curve as any).curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e: any) => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current?.translation() as any)))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={2}
        />
      </mesh>
    </>
  );
}

