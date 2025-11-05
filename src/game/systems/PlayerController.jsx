import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useGameStore, usePlayerStore } from '../../store/gameStore';
import * as THREE from 'three';

export function PlayerController() {
  const { camera, gl } = useThree();
  const rigidBodyRef = useRef();

  // Store references
  const playerRef = useRef();
  const cameraRef = useRef();
  const movementRef = useRef({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    run: false,
    currentAction: 'idle'
  });

  // Player state
  const [isGrounded, setIsGrounded] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(5);

  // Store state
  const updatePlayerPosition = useGameStore((state) => state.updatePlayerPosition);
  const updatePlayerRotation = useGameStore((state) => state.updatePlayerRotation);
  const equippedTool = usePlayerStore((state) => state.equippedItems.tool);

  // Movement settings
  const MOVEMENT_SPEED = {
    walk: 5,
    run: 10,
    jump: 8,
    turnSpeed: 0.003
  };

  // Initialize input handlers
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          movementRef.current.moveForward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          movementRef.current.moveBackward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          movementRef.current.moveLeft = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          movementRef.current.moveRight = true;
          break;
        case 'Space':
          movementRef.current.jump = true;
          event.preventDefault();
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          movementRef.current.run = true;
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          movementRef.current.moveForward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          movementRef.current.moveBackward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          movementRef.current.moveLeft = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          movementRef.current.moveRight = false;
          break;
        case 'Space':
          movementRef.current.jump = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          movementRef.current.run = false;
          break;
      }
    };

    const handleMouseMove = (event) => {
      if (document.pointerLockElement === gl.domElement) {
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        // Update camera rotation based on mouse movement
        if (cameraRef.current) {
          const euler = new THREE.Euler(0, 0, 0, 'YXZ');
          const currentRotation = cameraRef.current.rotation.clone();

          euler.setFromQuaternion(currentRotation);
          euler.y -= movementX * MOVEMENT_SPEED.turnSpeed;
          euler.x -= movementY * MOVEMENT_SPEED.turnSpeed;

          // Clamp vertical rotation
          euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));

          cameraRef.current.quaternion.setFromEuler(euler);
          updatePlayerRotation([euler.x, euler.y, euler.z]);
        }
      }
    };

    const handleClick = () => {
      // Request pointer lock on canvas click
      gl.domElement.requestPointerLock();
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('click', handleClick);
    };
  }, [gl, updatePlayerRotation]);

  // Handle character controller setup
  useEffect(() => {
    if (characterController && playerRef.current) {
      characterController.setCharacterController(playerRef.current);
    }
  }, [characterController]);

  // Update movement based on input
  useFrame((state, delta) => {
    if (!playerRef.current || !characterController) return;

    const movement = movementRef.current;
    const speed = movement.run ? MOVEMENT_SPEED.run : MOVEMENT_SPEED.walk;
    setCurrentSpeed(speed);

    // Calculate movement direction
    let moveX = 0;
    let moveZ = 0;

    if (movement.moveForward) moveZ -= 1;
    if (movement.moveBackward) moveZ += 1;
    if (movement.moveLeft) moveX -= 1;
    if (movement.moveRight) moveX += 1;

    // Normalize diagonal movement
    if (moveX !== 0 && moveZ !== 0) {
      const length = Math.sqrt(moveX * moveX + moveZ * moveZ);
      moveX /= length;
      moveZ /= length;
    }

    // Get camera direction for movement
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    // Calculate right vector
    const rightVector = new THREE.Vector3();
    rightVector.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0));

    // Calculate movement vector
    const movementVector = new THREE.Vector3();
    movementVector.addScaledVector(cameraDirection, moveZ * speed * delta);
    movementVector.addScaledVector(rightVector, moveX * speed * delta);

    // Apply movement
    if (movementVector.length() > 0) {
      characterController.move(movementVector);
    }

    // Handle jumping
    if (movement.jump && isGrounded) {
      characterController.jump({ impulse: { x: 0, y: MOVEMENT_SPEED.jump, z: 0 } });
      setIsGrounded(false);
    }

    // Check if grounded
    const groundCheck = characterController.groundIntersections();
    setIsGrounded(groundCheck.length > 0);

    // Update player position in store
    const position = playerRef.current.translation();
    updatePlayerPosition([position.x, position.y, position.z]);

    // Update action state
    if (moveX !== 0 || moveZ !== 0) {
      movement.currentAction = movement.run ? 'running' : 'walking';
    } else {
      movement.currentAction = 'idle';
    }
  });

  return (
    <RigidBody
      ref={playerRef}
      type="dynamic"
      position={[0, 5, 0]}
      enabledRotations={[false, false, false]}
      linearDamping={5}
      angularDamping={5}
      colliders={false}
    >
      <CapsuleCollider
        position={[0, 0, 0]}
        args={[0.5, 1]} // radius, height
      />

      {/* Player Camera */}
      <CameraController ref={cameraRef} />

      {/* Player Model (placeholder) */}
      <mesh position={[0, -1, 0]} visible={false}>
        <boxGeometry args={[0.8, 1.8, 0.8]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
    </RigidBody>
  );
}

// Camera controller component
const CameraController = React.forwardRef((props, ref) => {
  const { camera } = useThree();

  useEffect(() => {
    if (ref.current) {
      camera.position.set(0, 1.6, 0); // Eye level
      camera.rotation.set(0, 0, 0);
      ref.current = camera;
    }
  }, [camera]);

  return null;
});