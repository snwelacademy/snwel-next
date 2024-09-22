import { AxiosResponse } from 'axios';
import { api } from '@/lib/api';
import { Widget } from '@/types/WidgetTypes';
import { ApiResponse, ListResponse } from '@/types/ApiResponses';

// Fetch all widgets
export const fetchAllWidgets = async (): Promise<ListResponse<Widget>> => {
  try {
    const response: AxiosResponse<ListResponse<Widget>> = await api.get('/widgets');
    return response.data;
  } catch (error) {
    console.error('Error fetching widgets:', error);
    throw error;
  }
};

// Fetch widget by ID
export const fetchWidgetById = async (id: string): Promise<Widget> => {
  try {
    const response: AxiosResponse<ApiResponse<Widget>> = await api.get(`/widgets/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching widget with ID ${id}:`, error);
    throw error;
  }
};
