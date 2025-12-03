import { Orbit, type SVGProps } from "lucide-react";

export const GalacticaIcon = (props: SVGProps<SVGSVGElement>) => (
  <Orbit {...props} />
);


export const BronzeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 8.2c0-1.4-1-2.2-2.2-2.2H5.2C4 6 3 6.8 3 8.2" />
    <path d="M3 15.8c0 1.4 1 2.2 2.2 2.2h13.6c1.2 0 2.2-.8 2.2-2.2" />
    <path d="m14.2 6.5 3.8 3.8-3.3 3.3-3.8-3.8 3.3-3.3" />
    <path d="M3.2 10.3 7 14.1l-3.3 3.3" />
    <path d="m11 17.4-3.8-3.8" />
  </svg>
);

export const SilverIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22.1V12" />
  </svg>
);

export const GoldIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15.8 2.3-1.1 2.3-2.3.4 1.7 1.7-.4 2.3 2.1-1.1 2.1 1.1-.4-2.3 1.7-1.7-2.3-.4-1.1-2.3Z" />
    <path d="M6.2 2.3 5.1 4.6 2.8 5l1.7 1.7-.4 2.3 2.1-1.1 2.1 1.1-.4-2.3 1.7-1.7-2.3-.4-1.1-2.3Z" />
    <path d="M10 13 2 22h20L14 13" />
    <path d="M10 13v-2.5a1.5 1.5 0 0 1 3 0V13" />
  </svg>
);
