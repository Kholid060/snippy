export interface GitHubGistFile {
  type: string;
  size: number;
  raw_url: string;
  content?: string;
  language: string;
  filename: string;
}

export interface GitHubGistListItem {
  id: string;
  url: string;
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string | null;
  files: Record<string, GitHubGistFile>;
}

export type GitHubLinkHeaderRel = 'next' | 'first' | 'last' | 'prev';

export type GitHubApiPagination = Partial<Record<GitHubLinkHeaderRel, string>>;

export interface GitHubCreateGistPayload {
  public?: boolean;
  description?: string;
  files?: Record<string, { content: string }>;
}

export interface GitHubUpdateGistPayload {
  description?: string;
  files?: Record<string, { content?: string; filename?: string | null } | null>;
}
