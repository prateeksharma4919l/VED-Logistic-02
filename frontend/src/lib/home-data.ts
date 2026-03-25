import type { IconType } from "react-icons";
import {
  FaBoxOpen,
  FaChartLine,
  FaPhoneAlt,
  FaRoute,
  FaShippingFast,
  FaSignInAlt,
  FaUserShield,
} from "react-icons/fa";

export type HomeMenuItem = {
  label: string;
  note: string;
  href: string;
  icon: IconType;
  route?: boolean;
};

export const tickerItems = [
  "Domestic Courier",
  "International Shipping",
  "Doorstep Pickup",
  "Real-Time Tracking",
  "COD and Returns",
  "Business Shipments",
  "Kota, Rajasthan",
];

export const quickStats = [
  {
    label: "Location",
    value: "Kota, Rajasthan",
    note: "Authorized DTDC partner desk for courier bookings and pickup coordination.",
  },
  {
    label: "Coverage",
    value: "Domestic + International",
    note: "Parcel and document support across India plus international shipment assistance.",
  },
  {
    label: "Network Reach",
    value: "220+ Destinations",
    note: "International courier support aligned with the DTDC-connected global network.",
  },
  {
    label: "Contact",
    value: "7300187325",
    note: "Call for bookings, pickup requests, tracking help, and business shipment support.",
  },
];

export const serviceSuites = [
  {
    eyebrow: "For Individuals",
    title: "Personal courier and document shipping",
    copy: "Send documents, parcels, office packets, and urgent courier items with branch support for booking, pickup, and delivery guidance.",
    bullets: ["Document and parcel booking", "Pickup request support", "Tracking and POD guidance"],
  },
  {
    eyebrow: "For Businesses",
    title: "Regular dispatch and bulk shipment support",
    copy: "Ved Logistics supports repeated dispatch work for offices, sellers, and growing businesses with COD handling, returns, and shipment coordination.",
    bullets: ["Bulk and repeat shipments", "COD and return support", "E-commerce shipment handling"],
  },
  {
    eyebrow: "International Shipping",
    title: "Overseas courier assistance from Kota",
    copy: "Get international document and parcel support with access to a DTDC-connected global network and branch-level shipment assistance.",
    bullets: ["International courier assistance", "220+ destination reach", "Branch support and follow-up"],
  },
];

export const serviceLanes = [
  {
    title: "Domestic Courier Services",
    copy: "Document courier, parcel booking, office packets, and shipment guidance for delivery across India.",
    accent: "from-red-500/10 via-orange-400/10 to-white",
  },
  {
    title: "International Shipping Support",
    copy: "Document and parcel assistance for overseas movement through the DTDC-connected global network.",
    accent: "from-orange-500/12 via-amber-300/12 to-white",
  },
  {
    title: "Doorstep Pickup Requests",
    copy: "Pickup scheduling, address coordination, and shipment readiness support for faster dispatch handling.",
    accent: "from-amber-400/14 via-orange-200/10 to-white",
  },
  {
    title: "Real-Time Tracking Support",
    copy: "Shipment visibility, tracking guidance, and POD help for customers who need clear delivery follow-up.",
    accent: "from-sky-400/10 via-cyan-200/10 to-white",
  },
  {
    title: "E-Commerce Logistics",
    copy: "COD orders, returns handling, and operational courier support for online sellers and repeat dispatch businesses.",
    accent: "from-rose-400/10 via-red-200/10 to-white",
  },
  {
    title: "Branch Assistance and Support",
    copy: "Get booking guidance, shipment follow-up, service information, and courier assistance directly from the Ved Logistics branch desk.",
    accent: "from-slate-200/55 via-white to-orange-50/80",
  },
];

export const visitFlow = [
  {
    step: "01",
    title: "Booking or pickup request",
    copy: "Shipment details, parcel type, destination, and pickup requirement are recorded at the branch desk or over call support.",
  },
  {
    step: "02",
    title: "Shipment processing and dispatch",
    copy: "Parcels move through booking, dispatch preparation, courier routing, and tracking updates according to the selected service.",
  },
  {
    step: "03",
    title: "Tracking and delivery follow-up",
    copy: "Customers can check shipment status, request support, and receive delivery-related follow-up including POD assistance when required.",
  },
];

export const digitalAccess = [
  { label: "SELF SERVICE", href: "https://www.dtdc.com/in/", external: true },
  { label: "CUSTOMER LOGIN", href: "https://www.dtdc.com/in/", external: true },
  { label: "CHANNEL PARTNER LOGIN", href: "https://www.dtdc.com/in/", external: true },
  { label: "EMPLOYEE LOGIN", href: "/employee/login", external: false },
  { label: "MYDTDC BAZAAR", href: "https://www.dtdc.com/in/", external: true },
];

export const homeMenuItems: HomeMenuItem[] = [
  { label: "Dashboard", note: "Start here", href: "#overview", icon: FaChartLine },
  { label: "Services", note: "Courier support", href: "#shipping-solutions", icon: FaBoxOpen },
  { label: "Shipment Details", note: "Core lanes", href: "#service-lanes", icon: FaShippingFast },
  { label: "Workflow", note: "Booking flow", href: "#booking-flow", icon: FaRoute },
  { label: "Contact Desk", note: "Call branch", href: "#contact-panel", icon: FaPhoneAlt },
  { label: "Digital Access", note: "Login panel", href: "#digital-access", icon: FaSignInAlt },
  { label: "Static Preview", note: "Preview route", href: "/preview/index.html", icon: FaChartLine, route: true },
  { label: "Team Login", note: "Admin access", href: "/admin/login", icon: FaUserShield, route: true },
];
