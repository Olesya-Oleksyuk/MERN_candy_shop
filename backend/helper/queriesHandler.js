// filtering (? pagination / ? sorting)
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach((i) => delete queryObj[i]);
    let queryStr = JSON.stringify(queryObj);

    // gte - больше или равно (greater than or equal)
    // lte - меньше или равно (lesser than or equal)
    // lt - меньше чем (lesser than)
    // gt - боольше чем (greater than)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => {
      return `$${match}`;
    });
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortby = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortby);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
}

export default APIfeatures;
