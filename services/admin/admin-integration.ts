import { protectedApi } from '@/lib/api';
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions, DEFAULT_LIST_OPTIONS } from '@/types/ListOptions';
import { AxiosResponse } from 'axios';
import { listOptionsToUrlSearchParams } from '@/lib/utils';
import { CreateIntegration, IntegrationType, UpdateIntegration } from '@/types/IntegrationTypes';

export async function getAllIntegrations(options?: ListOptions) {
  try {
    options = { ...DEFAULT_LIST_OPTIONS, ...options };
    const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<IntegrationType>>>>(`/integrations?${listOptionsToUrlSearchParams(options)}`);
    const data = res.data.data;
    return data;
  } catch (error) {
    console.log('Error: getAllIntegrations: ', error);
    throw new Error('Error in fetching integrations list. Please try again.');
  }
}

export async function createIntegration(mutateIntegration: CreateIntegration) {
  try {
    const res = await protectedApi.post<any, AxiosResponse<ApiResponse<IntegrationType>>>('/integrations', mutateIntegration);
    const data = res.data.data;
    return data;
  } catch (error) {
    console.log('Error: createIntegration: ', error);
    throw new Error('Error in creating integration. Please try again.');
  }
}

export async function updateIntegration(integrationId: string, mutateIntegration: Partial<UpdateIntegration>) {
  try {
    const res = await protectedApi.put<any, AxiosResponse<ApiResponse<IntegrationType>>>(`/integrations/${integrationId}`, mutateIntegration);
    const data = res.data.data;
    return data;
  } catch (error) {
    console.log('Error: updateIntegration: ', error);
    throw new Error('Error in updating integration. Please try again.');
  }
}

export async function getIntegration(integrationId: string) {
  try {
    const res = await protectedApi.get<any, AxiosResponse<ApiResponse<IntegrationType>>>(`/integrations/${integrationId}`);
    const data = res.data.data;
    return data;
  } catch (error) {
    console.log('Error: getIntegration: ', error);
    throw new Error('Error in fetching integration. Please try again.');
  }
}

export async function deleteIntegration(integrationId: string) {
  try {
    const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<IntegrationType>>>(`/integrations/${integrationId}`);
    const data = res.data.data;
    return data;
  } catch (error) {
    console.log('Error: deleteIntegration: ', error);
    throw new Error('Error in deleting integration. Please try again.');
  }
}
