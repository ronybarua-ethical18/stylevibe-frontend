export const getBreadcrumbItems = (
    role: string,
    page: string,
    id?: string,
  ) => {
    const breadcrumbItems = [];
  
    // Construct URL based on role, page, and id
    const url = `/${role}/${page}/${id}`;
  
    // Check if there's an ID in the URL
    if (id) {
      breadcrumbItems.push({
        label: role,
        link: `/${role}`,
      });
      breadcrumbItems.push({
        label: page,
        link: `/${role}/${page}`,
      });
      breadcrumbItems.push({
        label: id,
        link: `/${role}/${page}/${id}`,
      });
    } else {
      // If no ID provided, construct breadcrumbs without ID
      breadcrumbItems.push({
        label: role,
        link: `/${role}`,
      });
      breadcrumbItems.push({
        label: page,
        link: `/${role}/${page}`,
      });
    }
  
    return breadcrumbItems;
  };
  