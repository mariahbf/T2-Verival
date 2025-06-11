"use client";

import { DashboardScreen } from "@/app/presentation/pages/dashboard/Dashboard";
import { withAuth } from "../presentation/components/withAuth";

export default withAuth(DashboardScreen, true);
