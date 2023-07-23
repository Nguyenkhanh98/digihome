export interface ITemplateAPI {
  id: string;
  name: string;
  thumbnail: string;
  metadata: string;
  status: string;
}

export interface CreateTemplateAPI {
  name: string;
  thumbnail: string;
  metadata: string;
}
