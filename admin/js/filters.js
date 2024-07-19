angular.module("POPAfilters", []).filter("searchFilter", () => {
  return (data, searchType, searchText) => {
    if (!searchText) {
      return data;
    }

    let keyword = RegExp(searchText, "i");
    return data.filter((item) => {
      switch (searchType) {
        case "title":
          return keyword.test(item.title);
        case "published":
          return keyword.test(item.published);
        case "category":
          return keyword.test(item.category);
      }
    });
  };
});
