interface R {
  data?:any,
  meta?:object
}

export interface searchParams {
  categories?: string,
  order?: "desc" | "asc",
  q?: string,
  purity?:string,
  sorting?: string,
  apiKey?: string,
  color?: string,
  topRange?: string,
  atleast?: string,
  ratios?: string,
  page?:number
}

export function getData(params: searchParams):Promise<R>;
export function formatCategory(params: string):string;
export function formatPurity(params: string):string;

