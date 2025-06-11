"use client";

import { CadastroMae } from "@/app/presentation/pages/CadastroMae/CadastroMae";
import { withAuth } from "../../presentation/components/withAuth";

export default withAuth(CadastroMae, true);
