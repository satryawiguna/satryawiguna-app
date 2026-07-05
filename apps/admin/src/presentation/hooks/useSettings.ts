'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingRepository } from '../../data/repositories';
import type { SettingResponse, UpdateSettingRequest } from 'shared-types';

// ── Query keys ────────────────────────────────────────────────────

export const SETTING_QUERY_KEYS = {
  all: ['setting'] as const,
};

// ── useSetting ────────────────────────────────────────────────────

export function useSetting() {
  return useQuery<SettingResponse>({
    queryKey: SETTING_QUERY_KEYS.all,
    queryFn: () => settingRepository.getSetting(),
  });
}

// ── useUpdateSetting ──────────────────────────────────────────────

export function useUpdateSetting(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSettingRequest) => settingRepository.updateSetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTING_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}
