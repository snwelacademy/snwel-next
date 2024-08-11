

import { constants } from "@/config/constants";
import { ListOptions } from "@/types/ListOptions";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrencySymbol(currencyCode: string){
  const currencySymbolMap = {
    'INR': '₹',
    'USD': '$'
  };

  return currencySymbolMap[currencyCode.toLocaleUpperCase() as keyof typeof currencySymbolMap] || ''
}


export function getPublicImage(path: string){
  return constants.imagePath+path
}

export function getListOptionsFromSearchParams(searchParams: URLSearchParams): ListOptions{
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 10;
  const search = searchParams.get('search') || '';
  const filter: any = {};
  searchParams.forEach((value, key) => {
    if(!['page', 'limit', 'search'].includes(key)){
      filter[key] = value;
    }
  })
  console.log({filter})
  return {page, limit, search, filter}
}

function isCompleteUrl(urlString: string): boolean {
  try {
    // Try creating a URL object from the string
    new URL(urlString);
    return true;
  } catch (error) {
    // If there's an error, the URL is not complete
    return false;
  }
}

export function fileUrl(path: string){
  if(isCompleteUrl(path)){
    return path;
  }
  if(path.startsWith('/')) {
    path = path.substring(1);
  }
  return constants.apiBaseUrl+path
}


export const getTotalPages = (totalCount: number, limit: number): number => {
  return Math.ceil(totalCount / limit);
};

import dayjs from 'dayjs';

export function formatDate(date: Date | string |number, formatString: string = 'YYYY-MM-DD'): string {
  return dayjs(date).format(formatString);
}


export function getAvatarLetters(name: string): string {
  if (name.length >= 2) {
    return name.substring(0, 2);
  } else {
    return name;
  }
}

export const listOptionsToUrlSearchParams = (options: ListOptions<Record<string, string>>): string => {
  const params = new URLSearchParams();

  if (options.page) {
      params.append('page', options.page.toString());
  }
  if (options.limit) {
      params.append('limit', options.limit.toString());
  }
  if (options.search) {
      params.append('search', options.search);
  }
  if (options.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
          params.append(`${key}`, value?.toString());
      });
  }

  return params.toString();
};

export function formatToLocalCurrency(value: number | string, locale: string = 'en-US', currency: string = 'inr'): string {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
      throw new Error('Invalid number value');
  }

  return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
  }).format(numericValue);
}