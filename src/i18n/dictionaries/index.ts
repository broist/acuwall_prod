import type { Locale } from "../config";
import { hu, type Dictionary } from "./hu";
import { en } from "./en";

export const dictionaries: Record<Locale, Dictionary> = { hu, en };

export type { Dictionary };
