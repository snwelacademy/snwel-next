import { useQuery } from "@tanstack/react-query";
import { UseSettingsOptions } from "./useSettings";
import { getSetting } from "@/services/admin/setting-service";

export function useSetting({ code }: UseSettingsOptions) {
   
    const { data, isLoading, error } = useQuery({queryKey: ['settings', code], queryFn: () => getSetting(code)});

    return { data, isLoading, error };
}