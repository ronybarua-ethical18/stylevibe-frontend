export const getQueryParams = (
  pageNumber: number = 1,
  limit: number = 10,
  debouncedSearchTerm: string = '',
  activeTab: any = '1',
) => {
  const query: Record<string, any> = {}
  query['page'] = pageNumber
  query['limit'] = limit
  query['searchTerm'] = debouncedSearchTerm
  query['status'] =
    activeTab === '2'
      ? 'APPROVED'
      : activeTab === '3'
        ? 'PENDING'
        : activeTab === '4'
          ? 'REJECTED'
          : undefined

  return { query }
}
