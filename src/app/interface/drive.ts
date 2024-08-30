export interface FileSystemItem {
  id: string;
  name: string;
  mimeType: string;
  iconLink: string;
  size: string;
  parents: string[];
  permissions: {
    id: string;
    emailAddress: string;
    role: string;
  }[];
}
