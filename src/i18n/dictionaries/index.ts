import type { Locale } from "../config";
import { hu, type Dictionary } from "./hu";
import { en } from "./en";
import { de } from "./de";
import { pl } from "./pl";
import { hr } from "./hr";

export const dictionaries: Record<Locale, Dictionary> = { hu, en, de, pl, hr };

export type { Dictionary };
