export interface ArticleBOM {
  id: string
  articleId: string
  itemId: string
  consumption: number
}

export interface CreateArticleBOMDto {
  articleId: string
  itemId: string
  consumption: number
}

export interface UpdateArticleBOMDto {
  consumption?: number
  itemId?: string
}
