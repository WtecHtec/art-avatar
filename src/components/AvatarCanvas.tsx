import { useEffect, useState, useRef } from 'react';

interface AvatarCanvasProps {
  features: {
    accessories: {
      shape: string
    },
    body: {
      shape: string
    },
    face: {
      shape: string
    },
    hair: {
      shape: string
    },
    head: {
      shape: string
    },
    eyes: {
      shape: string
    }
  }
}
const importSVG = (type: string, name: string) => import(`../assets/widgets/${type}/${name}.svg?raw`).then(module => module.default);

export default function AvatarCanvas({ features }: AvatarCanvasProps) {
  const [svgContent, setSvgContent] = useState<string>('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [paths, setPaths] = useState<string[]>([]);

  // 加载 SVG 路径
  useEffect(() => {
    (async () => {
      if (!features) return;
      const { body, head, eyes } = features;
      try {
        const bodyPath = await importSVG('body', body.shape);
        const headPath = await importSVG('head', head.shape);
        const eyesPath = await importSVG('eyes', eyes.shape);
        const mouthPath = await importSVG('mouth', eyes.shape);
        const nosePath = await importSVG('nose', eyes.shape);
        const eyebrowsPath = await importSVG('eyebrows', eyes.shape);

        setPaths([bodyPath, headPath, eyesPath, mouthPath, nosePath, eyebrowsPath]);
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    })();
  }, [features]);

  // 更新 SVG 内容
  useEffect(() => {
    if (paths.length === 0) return;

    const processedPaths = paths.map((svgRaw, index) => {
      const content = svgRaw
        .slice(svgRaw.indexOf('>', svgRaw.indexOf('<svg')) + 1)
        .replace('</svg>', '');

      if (index === 0) return `<g transform="translate(0, 550)">${content}</g>`;
      if (index === 1) return `<g transform="translate(200, 50)">${content}</g>`;

      return `<g transform="translate(320, 250)"><g>${content}</g></g>`;
    });

    const svgContent = `
      <svg
        id="avatar-svg"
        transform="translate(-30, 0)"
        width="380"
        height="380"
        class="path1"
        viewBox="0 0 700 700"
        fill="none"
        stroke="black"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          @media (prefers-reduced-motion){.path1{animation:none!important;stroke-dasharray:unset!important}}@media print{.path1{animation:none!important;stroke-dasharray:unset!important}}@keyframes grow{0%{stroke-dashoffset:1px;stroke-dasharray:0 1000px;opacity:0;fill-opacity:0}10%{opacity:1;fill-opacity:0}60%{stroke-dasharray:1000px 0;fill-opacity:1;stroke-opacity:0}to{stroke-dasharray:1000px 0;fill-opacity:1;stroke-opacity:0}}.path1 g g path{stroke-dashoffset:1px;stroke-dasharray:1000px 0;animation:grow 10s ease forwards;transform-origin:center;stroke:#a2a0a0;stroke-width:10px;animation-delay:0s}
        </style>
        <g>
          <g>
            ${processedPaths.join('')}
          </g>
        </g>
      </svg>
    `;

    setSvgContent(svgContent);
  }, [paths, mousePosition]);

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: svgContent }} 
      style={{ width: '100%', height: '100%' }}
    />
  );
}
