<script setup lang="ts">
import type * as ThreeTypes from "three";

const container = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const failed = ref(false);
let cleanup: (() => void) | undefined;

onMounted(async () => {
  const containerElement = container.value;
  const canvasElement = canvas.value;
  if (!containerElement || !canvasElement) return;
  canvasElement.dataset.sceneState = "mounting";

  try {
    const THREE = await import("three");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7.4);
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    const textures: ThreeTypes.Texture[] = [];
    const makeTexture = (
      width: number,
      height: number,
      draw: (context: CanvasRenderingContext2D) => void,
    ) => {
      const surface = document.createElement("canvas");
      surface.width = width;
      surface.height = height;
      const context = surface.getContext("2d");
      if (!context) throw new Error("Canvas texture context unavailable");
      draw(context);
      const texture = new THREE.CanvasTexture(surface);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(
        4,
        renderer.capabilities.getMaxAnisotropy(),
      );
      textures.push(texture);
      return texture;
    };

    const roundRect = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
    ) => {
      context.beginPath();
      context.roundRect(x, y, width, height, radius);
      context.closePath();
    };

    const webonovaLogo = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Webonova logo could not be loaded"));
      image.src = "/images/webonova-logo.png";
    });

    const panelTexture = makeTexture(900, 570, (context) => {
      const gradient = context.createLinearGradient(0, 0, 900, 570);
      gradient.addColorStop(0, "rgba(19,38,53,.98)");
      gradient.addColorStop(1, "rgba(3,12,19,.98)");
      roundRect(context, 10, 10, 880, 550, 38);
      context.fillStyle = gradient;
      context.fill();
      context.lineWidth = 3;
      context.strokeStyle = "rgba(244,241,236,.72)";
      context.stroke();
      context.fillStyle = "#ff6a22";
      context.beginPath();
      context.arc(55, 52, 10, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#b8c3cc";
      [86, 117].forEach((x) => {
        context.beginPath();
        context.arc(x, 52, 10, 0, Math.PI * 2);
        context.fill();
      });
      context.drawImage(webonovaLogo, 315, 70, 270, 270);
      context.textAlign = "center";
      context.fillStyle = "#c4cbd1";
      context.font = "400 31px Manrope, sans-serif";
      context.fillText("Websites engineered", 450, 364);
      context.fillText("for ambitious brands.", 450, 405);
      context.fillStyle = "#ff6a22";
      context.font = "700 22px Manrope, sans-serif";
      context.fillText("VISIT WEBONOVA.COM ↗", 450, 482);
    });

    const panelGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 1.82),
      new THREE.MeshBasicMaterial({
        color: 0xff5a0a,
        transparent: true,
        opacity: 0.11,
        depthWrite: false,
      }),
    );
    panelGlow.position.z = -0.025;
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(2.65, 1.68),
      new THREE.MeshBasicMaterial({ map: panelTexture, transparent: true }),
    );
    panel.rotation.set(-0.08, -0.13, -0.025);
    panelGlow.rotation.copy(panel.rotation);
    panel.userData.kind = "panel";
    universeGroup.add(panelGlow, panel);

    const technologies = [
      ["Vue", "V", "#42b883"],
      ["Nuxt", "N", "#00dc82"],
      ["React", "R", "#61dafb"],
      ["Tailwind CSS", "T", "#38bdf8"],
      ["Alpine.js", "A", "#77c1d2"],
      ["Laravel", "L", "#ff4d4d"],
      ["Yii2", "Y", "#f7941d"],
      ["Livewire", "W", "#fb70a9"],
      ["PHP", "P", "#8993be"],
      ["Supabase", "S", "#3ecf8e"],
      ["MySQL", "M", "#3e9ac7"],
      ["Git", "G", "#f05032"],
      ["Figma", "F", "#a259ff"],
    ] as const;
    const nodes: ThreeTypes.Sprite[] = [];
    technologies.forEach(([name, initial, color], index) => {
      const texture = makeTexture(320, 360, (context) => {
        context.shadowColor = "rgba(249,83,15,.28)";
        context.shadowBlur = 22;
        roundRect(context, 42, 18, 236, 236, 118);
        context.fillStyle = "rgba(7,20,29,.96)";
        context.fill();
        context.lineWidth = 3;
        context.strokeStyle = "rgba(244,241,236,.38)";
        context.stroke();
        context.shadowBlur = 0;
        context.textAlign = "center";
        context.fillStyle = color;
        context.font = "800 112px Manrope, sans-serif";
        context.fillText(initial, 160, 176);
        context.fillStyle = "#f4f1ec";
        context.font = "700 31px Manrope, sans-serif";
        context.fillText(name, 160, 304);
      });
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
        }),
      );
      const angle = (index / technologies.length) * Math.PI * 2 + 0.18;
      const radiusX = index % 2 ? 3.15 : 2.75;
      const radiusY = index % 3 ? 2.15 : 1.82;
      sprite.position.set(
        Math.cos(angle) * radiusX,
        Math.sin(angle) * radiusY,
        Math.sin(angle * 2.35) * 0.72 - 0.1,
      );
      sprite.scale.set(0.9, 1.01, 1);
      sprite.userData.kind = "node";
      sprite.userData.baseScale = 1;
      sprite.userData.name = name;
      nodes.push(sprite);
      universeGroup.add(sprite);
    });

    const orbitDefinitions = [
      [3.48, 2.3, 0.08, 0.08, 0.02],
      [3.2, 1.72, -0.22, 0.32, 0.2],
      [2.85, 2.48, 0.46, -0.2, -0.12],
      [3.58, 1.42, -0.45, -0.14, 0.42],
      [2.55, 2.12, 0.18, 0.52, -0.3],
    ] as const;
    orbitDefinitions.forEach(([radiusX, radiusY, x, y, z], index) => {
      const points = new THREE.EllipseCurve(0, 0, radiusX, radiusY)
        .getPoints(160)
        .map((point) => new THREE.Vector3(point.x, point.y, 0));
      const line = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: index % 2 ? 0x77808a : 0xf9530f,
          transparent: true,
          opacity: index % 2 ? 0.13 : 0.24,
        }),
      );
      line.rotation.set(x, y, z);
      universeGroup.add(line);
    });

    const pointGeometry = new THREE.SphereGeometry(0.035, 8, 8);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff6a22 });
    for (let index = 0; index < 12; index += 1) {
      const angle = (index / 12) * Math.PI * 2 + 0.3;
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.set(
        Math.cos(angle) * (2.55 + (index % 3) * 0.35),
        Math.sin(angle) * (1.65 + (index % 2) * 0.4),
        Math.sin(angle * 2) * 0.55,
      );
      universeGroup.add(point);
    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(10, 10);
    const targetRotation = new THREE.Vector2();
    const angularVelocity = new THREE.Vector2();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clock = new THREE.Clock();
    let hovered: ThreeTypes.Object3D | null = null;
    let frameId = 0;
    let dragging = false;
    let intersecting = true;
    let visible = !document.hidden;
    let lastX = 0;
    let lastY = 0;

    const resize = () => {
      const { width, height } = containerElement.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      universeGroup.scale.setScalar(
        width < 520 ? 0.66 : width < 820 ? 0.82 : 0.94,
      );
      renderer.render(scene, camera);
    };
    const updatePointer = (event: PointerEvent) => {
      const bounds = canvasElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
      );
    };
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      angularVelocity.set(0, 0);
      canvasElement.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event);
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      angularVelocity.set(dy * 0.0035, dx * 0.0048);
      targetRotation.x = THREE.MathUtils.clamp(
        targetRotation.x + angularVelocity.x,
        -0.62,
        0.62,
      );
      targetRotation.y += angularVelocity.y;
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const endDrag = (event: PointerEvent) => {
      dragging = false;
      if (canvasElement.hasPointerCapture(event.pointerId))
        canvasElement.releasePointerCapture(event.pointerId);
    };
    const onPointerLeave = () => {
      pointer.set(10, 10);
      canvasElement.style.cursor = "grab";
    };
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) clock.start();
    };
    canvasElement.addEventListener("pointerdown", onPointerDown);
    canvasElement.addEventListener("pointermove", onPointerMove);
    canvasElement.addEventListener("pointerup", endDrag);
    canvasElement.addEventListener("pointercancel", endDrag);
    canvasElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(containerElement);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry?.isIntersecting ?? false;
        if (intersecting) clock.start();
      },
      { threshold: 0.02 },
    );
    intersectionObserver.observe(containerElement);
    resize();
    canvasElement.dataset.sceneState = "running";

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!intersecting || !visible) {
        clock.stop();
        return;
      }
      const delta = Math.min(clock.getDelta(), 0.05);
      const reduced = reducedMotion.matches;
      if (!dragging) {
        angularVelocity.multiplyScalar(Math.pow(0.05, delta));
        targetRotation.x += angularVelocity.x * delta * 14;
        targetRotation.y += angularVelocity.y * delta * 14;
        if (!reduced) targetRotation.y += delta * 0.125;
      }
      universeGroup.rotation.x +=
        (targetRotation.x - universeGroup.rotation.x) * Math.min(1, delta * 7);
      universeGroup.rotation.y +=
        (targetRotation.y - universeGroup.rotation.y) * Math.min(1, delta * 7);
      panel.rotation.set(
        -universeGroup.rotation.x - 0.08,
        -universeGroup.rotation.y - 0.13,
        -0.025,
      );
      panelGlow.rotation.copy(panel.rotation);
      if (!reduced)
        panel.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.035;
      raycaster.setFromCamera(pointer, camera);
      const hit =
        raycaster.intersectObjects([panel, ...nodes], false)[0]?.object ?? null;
      hovered = hit;
      nodes.forEach((node) => {
        const desired = node === hovered ? 1.14 : 1;
        node.userData.baseScale +=
          (desired - node.userData.baseScale) * Math.min(1, delta * 10);
        node.scale.set(
          0.9 * node.userData.baseScale,
          1.01 * node.userData.baseScale,
          1,
        );
      });
      const panelHovered = hovered === panel;
      panel.position.z +=
        ((panelHovered ? 0.16 : 0) - panel.position.z) * Math.min(1, delta * 9);
      panelGlow.material.opacity +=
        ((panelHovered ? 0.28 : 0.11) - panelGlow.material.opacity) *
        Math.min(1, delta * 9);
      canvasElement.style.cursor = hovered
        ? "pointer"
        : dragging
          ? "grabbing"
          : "grab";
      renderer.render(scene, camera);
    };
    animate();

    cleanup = () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvasElement.removeEventListener("pointerdown", onPointerDown);
      canvasElement.removeEventListener("pointermove", onPointerMove);
      canvasElement.removeEventListener("pointerup", endDrag);
      canvasElement.removeEventListener("pointercancel", endDrag);
      canvasElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((object) => {
        const renderable = object as ThreeTypes.Mesh;
        renderable.geometry?.dispose();
        if (renderable.material)
          (Array.isArray(renderable.material)
            ? renderable.material
            : [renderable.material]
          ).forEach((material) => material.dispose());
      });
      textures.forEach((texture) => texture.dispose());
      renderer.renderLists.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      scene.clear();
    };
  } catch (error) {
    failed.value = true;
    canvasElement.dataset.sceneState = "failed";
    if (import.meta.dev)
      console.warn("Three.js hero scene could not initialize.", error);
  }
});

onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div
    ref="container"
    class="relative min-h-[320px] w-full overflow-hidden sm:min-h-[430px] lg:min-h-[580px]"
    aria-hidden="true"
  >
    <canvas
      v-show="!failed"
      ref="canvas"
      class="absolute inset-0 h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
      aria-hidden="true"
    ></canvas>
    <div
      v-if="failed"
      class="webgl-fallback absolute inset-0"
      aria-hidden="true"
    >
      <div
        class="absolute inset-[20%] rounded-full border border-orange/50 shadow-[0_0_90px_rgba(249,83,15,.12)]"
      ></div>
    </div>
    <div
      class="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-[9px] font-semibold tracking-[.22em] text-slate-400 sm:text-[10px]"
    >
      <span aria-hidden="true">←</span>
      <span>DRAG TO EXPLORE MY STACK</span>
      <span aria-hidden="true">→</span>
    </div>
  </div>
</template>
