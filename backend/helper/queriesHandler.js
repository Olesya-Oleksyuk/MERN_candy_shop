// filtering (? pagination / ? sorting)
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = {...this.queryString};
    console.log(queryObj);
    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach(i => delete queryObj[i]);
    let queryStr = JSON.stringify(queryObj)
    console.log('queryObj stringify:',  queryStr);
    console.log('type queryObj stringify:',  typeof queryStr);

    // gte - больше или равно (greater than or equal)
    // lte - меньше или равно (lesser than or equal)
    // lt - меньше чем (lesser than)
    // gt - боольше чем (greater than)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => {
      console.log('match',  match);
      return `$${match}`;
    });

    console.log('!!queryStr:',  queryStr);
    console.log('JSON.parse(queryStr)',  JSON.parse(queryStr));
    // console.log('query', this.query);
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  sorting() {
    if(this.queryString.sort){
      console.log('sorting!!!!');
      console.log(this.queryString.sort);
      console.log('this.queryString.sort SPLIT', this.queryString.sort.split());
      const sortby = this.queryString.sort.split(',').join(' ');
      console.log('!sortby', sortby);
      this.query = this.query.sort(sortby);
    } else {
      this.query = this.query.sort('-createdAt')
    }
    return this;
  }
}

export default APIfeatures;