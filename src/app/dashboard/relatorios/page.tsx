"use client";

import { ExportarRelatorio } from "@/app/presentation/pages/exportarRelatorio/ExportarRelatorio";
import { withAuth } from "../../presentation/components/withAuth";

export default withAuth(ExportarRelatorio, true);
