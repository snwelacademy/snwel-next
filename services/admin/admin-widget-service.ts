
import { AxiosResponse } from 'axios';
import { protectedApi } from '@/lib/api';
import { CreateWidget, UpdateWidget, Widget, WidgetType } from '@/types/WidgetTypes';
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { DEFAULT_LIST_OPTIONS, ListOptions } from '@/types/ListOptions';
import { listOptionsToUrlSearchParams } from '@/lib/utils';

// Fetch all widgets
export const fetchAllWidgets = async (options?: ListOptions): Promise<ListResponse<Widget>> => {
  try {
    options = {...DEFAULT_LIST_OPTIONS, ...options}
    const response = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<Widget>>>>(`/widgets?${listOptionsToUrlSearchParams(options)}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching widgets:', error);
    throw error;
  }
};

// Fetch widget types
export const fetchWidgetTypes = async (): Promise<ListResponse<WidgetType>> => {
  try {
    const response: AxiosResponse<ListResponse<WidgetType>> = await protectedApi.get('/widgets/types');
    return response.data;
  } catch (error) {
    console.error('Error fetching widget types:', error);
    throw error;
  }
};

// Fetch widget by ID
export const fetchWidgetById = async (id: string): Promise<Widget> => {
  try {
    const response = await protectedApi.get<AxiosResponse<Widget>>(`/widgets/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching widget with ID ${id}:`, error);
    throw error;
  }
};

// Create a new widget
export const createWidget = async (widgetData: CreateWidget): Promise<Widget> => {
  try {
    const response: AxiosResponse<Widget> = await protectedApi.post('/widgets', widgetData);
    return response.data;
  } catch (error) {
    console.error('Error creating widget:', error);
    throw error;
  }
};

// Update a widget by ID
export const updateWidgetById = async (id: string, widgetData: UpdateWidget): Promise<Widget> => {
  try {
    const response: AxiosResponse<Widget> = await protectedApi.put(`/widgets/${id}`, widgetData);
    return response.data;
  } catch (error) {
    console.error(`Error updating widget with ID ${id}:`, error);
    throw error;
  }
};

// Delete a widget by ID
export const deleteWidgetById = async (id: string): Promise<void> => {
  try {
    await protectedApi.delete(`/widgets/${id}`);
  } catch (error) {
    console.error(`Error deleting widget with ID ${id}:`, error);
    throw error;
  }
};
