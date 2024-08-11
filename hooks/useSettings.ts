
import { getSetting, getAllSettings } from '@/services/admin/setting-service';
import { SETTINGS } from '@/types/Setting';
import { getListOptionsFromSearchParams } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export interface UseSettingsOptions {
    code: SETTINGS;
}

export function useSettings({ code }: UseSettingsOptions) {
    const searchParams = useSearchParams();
    const { data, isLoading, error } = useQuery({queryKey: ['settings', code], queryFn: () =>  getAllSettings(getListOptionsFromSearchParams(searchParams))});

    return { data, isLoading, error };
}
