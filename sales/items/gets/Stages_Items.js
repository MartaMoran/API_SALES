export const itemsStages = () => {
  let array = [];
  array = [...array, { $limit: 100 }];

  array = [...array, { $unwind: "$items" }];

  array = [
    ...array,
    {
      $group: {
        _id: "$items.name",
        Items: {
          $addToSet: {
            name: "$items.name",
            tags: "$items.tags",
            revenue: { $multiply: ["$items.price", "$items.quantity"] },
            quantity: "$items.quantity",
            price: "$items.price",
          },
        },
      },
    },
  ];
  array = [
    ...array,
    {
      $addFields: {
        totalPrice: {
          $sum: "$Items.revenue",
        },
        totalQuantity: { $sum: "$Items.quantity" },
        avgPrice: { $avg: "$Items.price" },
      },
    },
  ];

  return array;
};
