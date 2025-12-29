interface IconProps {
  raw: string;
  size?: number;
  stroke?: string;
  fill?: string;
}

const renderIcon = ({ raw, size, stroke, fill }: IconProps) => {
  const template = document.createElement('template');
  template.innerHTML = raw.trim();
  const svg = template.content.firstElementChild;

  if (!(svg instanceof SVGSVGElement)) {
    throw new Error('Invalid SVG');
  }

  if (size) {
    svg.setAttribute('width', size.toString());
    svg.setAttribute('height', size.toString());
  }

  if (stroke) {
    svg.setAttribute('stroke', stroke);
  }

  if (fill) {
    svg.setAttribute('fill', fill);
  }

  return svg;
};

export default renderIcon;
