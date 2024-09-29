

import { constants } from "@/config/constants";
import { ListOptions } from "@/types/ListOptions";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'qs';

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

export const formatDateInReadable = (date: string | Date): string => {
  return dayjs(date).format('MMMM D, YYYY'); // e.g., "September 22, 2024"
};


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
          if(Boolean(value)){
            params.append(`${key}`, value?.toString());
          }else{
            params.delete(key)
          }
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

export function objectToQueryString(obj: any){
  return qs.stringify(obj)
}
export function queryStringToObject<T=any>(queryString: string){
  return qs.parse(queryString) as T;
}

export const prepareAddressString = (location?: {
  address: string,
  city: string,
  state: string,
  country: string
}): string => {
  if (!location) return '';

  const { address, city, state, country } = location;
  const addressParts = [address, city, state, country].filter(Boolean); // Filters out empty values
  return addressParts.join(', ');
};

export const isDatePassed = (date: string | Date): boolean => {
  const currentDate = dayjs();  // Get the current date and time
  const inputDate = dayjs(date);  // Parse the input date

  return inputDate.isBefore(currentDate);  // Returns true if the input date is before the current date (i.e., passed)
};


export function extractYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);

  return match ? match[1] : null;
}


