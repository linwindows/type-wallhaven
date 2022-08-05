interface R {
  data?: any;
  meta?: object;
}

export interface searchParams {
  categories?: string;
  order?: string;
  q?: string;
  purity?: string;
  sorting?: string;
  apiKey?: string;
  color?: string;
  topRange?: string;
  atleast?: string;
  ratios?: string;
  page?: number;
  resolutions?: string;
}

export function getData(params: searchParams): Promise<R>;
export function formatCategory(params: object): string;
export function formatPurity(params: object): string;
declare namespace searchMeta {
  export let searchMeta: object;
}
