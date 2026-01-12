import React from "react";

const svgs = {
  dashboard: encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><g fill='none' fill-rule='evenodd'><circle cx='120' cy='120' r='120' fill='%23BEE3B8' opacity='0.22'/><path d='M800 300c-120 60-260 60-380 0 120-60 260-60 380 0z' fill='%230D9488' opacity='0.06'/></g></svg>`
  ),
  tracker: encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><g fill='none' fill-rule='evenodd'><rect x='200' y='80' width='500' height='400' rx='40' fill='%2393C5FD' opacity='0.14'/><path d='M0 500c160-80 320-80 480 0-160 80-320 80-480 0z' fill='%231E40AF' opacity='0.05'/></g></svg>`
  ),
  goals: encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><g fill='none' fill-rule='evenodd'><ellipse cx='600' cy='100' rx='200' ry='80' fill='%23E9D5FF' opacity='0.18'/><path d='M0 350c140-70 280-70 420 0-140 70-280 70-420 0z' fill='%236B21A8' opacity='0.04'/></g></svg>`
  ),
  community: encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><g fill='none' fill-rule='evenodd'><circle cx='700' cy='80' r='90' fill='%23FFF7ED' opacity='0.24'/><path d='M0 450c140-60 280-60 420 0-140 60-280 60-420 0z' fill='%23EA580C' opacity='0.05'/></g></svg>`
  ),
  default: encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><g fill='none' fill-rule='evenodd'><rect width='800' height='600' fill='%23F8FAFC' opacity='0.02'/></g></svg>`
  ),
};

const pageStyles = {
  dashboard: { background: "linear-gradient(135deg,#f0fff4,#ecfeff)" },
  tracker: { background: "linear-gradient(135deg,#eff6ff,#eef2ff)" },
  goals: { background: "linear-gradient(135deg,#fbf2ff,#f5f3ff)" },
  community: { background: "linear-gradient(135deg,#fff7ed,#fffaf0)" },
  login: { background: "linear-gradient(135deg,#ffffff,#f8fafc)" },
  signup: { background: "linear-gradient(135deg,#ffffff,#f8fafc)" },
  default: { background: "linear-gradient(135deg,#ffffff,#f8fafc)" },
};

export default function PageWrapper({ page = "default", children }) {
  const key = page in pageStyles ? page : "default";
  const svg = svgs[page] || svgs.default;
  const style = {
    minHeight: "calc(100vh - 64px)",
    paddingTop: "1rem",
    paddingBottom: "2rem",
    backgroundImage: `url("data:image/svg+xml;utf8,${svg}"), ${pageStyles[key].background}`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundSize: "45% auto",
  };

  return <div style={style}>{children}</div>;
}
