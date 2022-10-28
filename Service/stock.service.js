const { ObjectId } = require("mongodb");
const Stock = require("../models/Stock");

exports.gettingAllStock = async (filters, queries) => {
  // const stocks = await Stock.find(filters)
  //   .skip(queries.skip)
  //   .limit(queries.limit)
  //   .select(queries.fieldBy)
  //   .sort(queries.sortBy);
  const stocks = await Stock.aggregate([
    { $match: {} },
    {
      $project: {
        store: 1,
        price: { $convert: { input: "$price", to: "int" } },
        quantity: 1,
      },
    },
    {
      $group: {
        _id: "$store.name",
        totalProductPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
      },
    },
  ]);
  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, stocks };
};
exports.gettingSingleStock = async (id) => {
  // const stock = await Stock.findOne({ _id: id })
  // .populate("store.id")
  // .populate("suppliedBy.id")
  // .populate("brand.id");
  const stock = await Stock.aggregate([
    //stage,
    { $match: { _id: ObjectId(id) } },
    {
      $project: {
        category: 1,
        quantity: 1,
        price: 1,
        productId: 1,
        name: 1,
        "brand.name": { $toLower: `$brand.name` },
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand.name",
        foreignField: "name",
        as: "brandDetails",
      },
    },
  ]);

  return stock;
};
exports.createStock = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};
exports.updateStockById = async (stockId, data) => {
  const stock = await updateOne(
    { _id: stockId },
    { $set: data },
    { runValidators: true }
  );
  return stock;
};
exports.bulkUpdate = async (data) => {
  // const stock = await Stock.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  const stocks = [];
  console.log(data);
  data.ids.forEach((stock) =>
    stocks.push(Stock.updateOne({ _id: stock.id }, stock.data))
  );
  const result = await Promise.all(stocks);
  console.log(result);
  return stocks;
};
exports.deleteStock = async (data) => {
  const stock = await Stock.deleteOne({ _id: data });
  return stock;
};
exports.bulkDelete = async (ids) => {
  const stock = await Stock.deleteMany({ _id: ids });
  return stock;
};
