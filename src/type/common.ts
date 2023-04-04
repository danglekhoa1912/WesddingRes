export interface ISelectItem {
  id: number;
  label: string;
  value: number;
  disabled?: boolean;
}

export interface ISearchParam {
  page?: number;
  searchByName?: string;
}
