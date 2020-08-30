const stagesAggregate = (request) => {
  let {
    purchase,
    location,
    min_satisfaction,
    max_satisfaction,
    min_date,
    max_date,
  } = request.query;
  let array = [];
  array = [...array, { $limit: 50 }];
  array = [
    ...array,
    {
      $project: {
        date: "$saleDate",
        items: {
          $map: {
            input: "$items",
            as: "item",
            in: {
              name: "$$item.name",
              quantity: "$$item.quantity",
              unitPrice: "$$item.price",
              total: { $multiply: ["$$item.price", "$$item.quantity"] },
            },
          },
        },
        storeLocation: { $toLower: "$storeLocation" },
        customer: 1,
        couponUsed: 1,
        purchaseMethod: { $toLower: "$purchaseMethod" },
      },
    },
  ];
  if (purchase) {
    array = [...array, { $match: { purchaseMethod: purchase } }];
  }
  if (location) {
    array = [...array, { $match: { storeLocation: location } }];
  }
  if (min_satisfaction) {
    array = [
      ...array,
      {
        $match: {
          "customer.satisfaction": { $gte: parseInt(min_satisfaction) },
        },
      },
    ];
  }
  if (max_satisfaction) {
    array = [
      ...array,
      {
        $match: {
          "customer.satisfaction": { $lte: parseInt(max_satisfaction) },
        },
      },
    ];
  }
  if (min_date) {
    array = [...array, { $match: { date: { $gte: new Date(min_date) } } }];
  }
  if (max_date) {
    array = [...array, { $match: { date: { $lte: new Date(max_date) } } }];
  }

  return array;
};

export default stagesAggregate;
