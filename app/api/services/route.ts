import { NextResponse } from "next/server";

import { serviceDetails } from "@/components/site/service-details";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

type BookingServiceRow = {
  service_name: string | null;
  starts_at: string | null;
  status: string | null;
};

type BackendService = {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  price: string;
  bookingsThisMonth: number;
  totalBookings: number;
  status: "Active" | "Draft";
  planCount: number;
  planNames: string[];
};

function normalizeServiceName(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}

function getCategory(name: string) {
  const value = name.toLowerCase();
  if (value.includes("walk")) return "Walks";
  if (value.includes("training")) return "Training";
  if (value.includes("custom")) return "Custom";
  return "Care";
}

function getDuration(planUnits: string[]) {
  const durations = Array.from(new Set(planUnits.filter((unit) => /min|hour|day|night|visit|walk|session/i.test(unit))));
  if (!durations.length) return "Custom";
  if (durations.length === 1) return durations[0];
  return durations.slice(0, 3).join(" / ");
}

function getPrice(plans: (typeof serviceDetails)[number]["plans"], fallback: string) {
  const prices = Array.from(new Set(plans.map((plan) => `${plan.pricePrefix ?? ""}${plan.price}${plan.unit ? ` ${plan.unit}` : ""}`.trim())));
  if (!prices.length) return fallback;
  if (prices.length === 1) return prices[0];
  return `${prices[0]} – ${prices[prices.length - 1]}`;
}

const serviceAliases: Record<string, string[]> = {
  "dog-walking": ["Dog Walk", "Dog Walking", "Solo Walk", "Daily Stroll", "Standard stroll", "Extended stroll", "Solo Journey"],
  "home-check-ins": ["Home check-in", "Home check-ins", "Home Visit", "Essential Home Visit", "Extended Home Visit", "Puppy Visit"],
  "dog-training": ["Dog Training", "Training", "Training Session", "Puppy Training"],
  "group-walks": ["Group Walk", "Group Walks", "Group Adventure", "2-Hour Adventure", "Half-Day Adventure", "Full-Day Adventure"],
  "daytime-care-overnight-stays": ["Daytime care", "Day Care", "Dog Sitting", "Overnight stay", "Overnight stays", "Boarding", "Half-day stay", "Full-day care", "Standard Overnight Stay"],
  "custom-care": ["Custom Care", "Custom & tailored care", "Bespoke care"],
};

function buildServices(rows: BookingServiceRow[] = []) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return serviceDetails.map((service) => {
    const planNames = service.plans.map((plan) => plan.title);
    const matchNames = new Set([service.title, service.slug, ...planNames, ...(serviceAliases[service.slug] ?? [])].map(normalizeServiceName));
    const matchingBookings = rows.filter((row) => row.service_name && matchNames.has(normalizeServiceName(row.service_name)) && row.status !== "cancelled" && row.status !== "no_show");
    const bookingsThisMonth = matchingBookings.filter((row) => {
      if (!row.starts_at) return false;
      const startsAt = new Date(row.starts_at);
      return startsAt >= monthStart && startsAt < nextMonthStart;
    }).length;

    return {
      id: service.slug,
      name: service.title,
      description: service.intro,
      category: getCategory(service.title),
      duration: getDuration(service.plans.map((plan) => plan.unit)),
      price: getPrice(service.plans, `${service.priceFrom}${service.priceUnit}`),
      bookingsThisMonth,
      totalBookings: matchingBookings.length,
      status: "Active",
      planCount: service.plans.length,
      planNames,
    } satisfies BackendService;
  });
}

export async function GET() {
  try {
    const { data: rows, error } = await supabaseAdmin
      .from("portal_bookings")
      .select("service_name,starts_at,status")
      .order("starts_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ services: buildServices((rows ?? []) as BookingServiceRow[]), isFallback: false });
  } catch (error) {
    console.error("Service data fallback", { route: "/api/services", error });
    return NextResponse.json({ services: buildServices(), isFallback: true });
  }
}