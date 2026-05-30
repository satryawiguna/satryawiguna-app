// ── Setting data ──────────────────────────────────────────────────

export type SettingData = Record<string, string>;

// ── API response shapes ───────────────────────────────────────────

export interface SettingResponse {
  success: boolean;
  status: number;
  message: string;
  data: SettingData;
  timestamp: string;
}

// ── Request params ────────────────────────────────────────────────

export type UpdateSettingRequest = Record<string, string>;
